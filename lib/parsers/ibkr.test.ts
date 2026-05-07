import { describe, it, expect } from "vitest";
import { parseIbkr } from "./ibkr";

// Synthetic IBKR Activity Statement fragments — schema cribbed from
// https://www.ibkrguides.com/reportingreference/reportguide/activitystatement.htm
// Dates and prices are made up.
function fixture(parts: string[]) {
  const buffer = new TextEncoder().encode(parts.join("\n")).buffer as ArrayBuffer;
  return { buffer, filename: "fixture.csv", taxYear: 2024 };
}

const TRADES_HEADER =
  '"Trades","Header","DataDiscriminator","Asset Category","Currency","Symbol","ISIN","Date/Time","Quantity","T. Price","Proceeds","Comm/Fee","Basis","Realized P/L","Code"';
const DIV_HEADER = '"Dividends","Header","Currency","Date","Description","Amount"';
const WHT_HEADER = '"Withholding Tax","Header","Currency","Date","Description","Amount","Code"';

describe("IBKR Flex CSV parser", () => {
  it("parses BUY trades with positive quantity", async () => {
    const r = await parseIbkr(
      fixture([
        TRADES_HEADER,
        '"Trades","Data","Order","Stocks","USD","AAPL","US0378331005","2024-03-15, 10:30:00","10","150.00","-1500.00","-1.00","1501.00","0","O"',
      ]),
    );
    expect(r.transactions).toHaveLength(1);
    expect(r.transactions[0].type).toBe("BUY");
    expect(r.transactions[0].quantity).toBe("10");
    expect(r.transactions[0].pricePerUnit).toBe("150");
    expect(r.transactions[0].isin).toBe("US0378331005");
    expect(r.transactions[0].currency).toBe("USD");
  });

  it("encodes SELL via negative quantity in IBKR → type=SELL with positive qty", async () => {
    const r = await parseIbkr(
      fixture([
        TRADES_HEADER,
        '"Trades","Data","Order","Stocks","USD","AAPL","US0378331005","2024-06-15","-5","180.00","900.00","-1.00","-750.00","150","C"',
      ]),
    );
    expect(r.transactions[0].type).toBe("SELL");
    expect(r.transactions[0].quantity).toBe("5"); // positive in our contract
  });

  it("skips SubTotal/Total/Notes rows", async () => {
    const r = await parseIbkr(
      fixture([
        TRADES_HEADER,
        '"Trades","Data","Order","Stocks","USD","AAPL","US0378331005","2024-03-15","10","150.00","-1500.00","-1.00","1501.00","0","O"',
        '"Trades","SubTotal","","Stocks","USD","","","","","","","","","",""',
        '"Trades","Total","","","Base Currency Summary","","","","","","","","","",""',
        '"Trades","Notes","","","","","","","","","","","","",""',
      ]),
    );
    expect(r.transactions).toHaveLength(1);
  });

  it("parses dividends and extracts ISIN from description", async () => {
    const r = await parseIbkr(
      fixture([
        DIV_HEADER,
        '"Dividends","Data","USD","2024-04-15","AAPL(US0378331005) Cash Dividend USD 0.24 per Share","2.40"',
      ]),
    );
    expect(r.transactions).toHaveLength(1);
    const d = r.transactions[0];
    expect(d.type).toBe("DIVIDEND");
    expect(d.isin).toBe("US0378331005");
    expect(d.grossAmount).toBe("2.4");
    expect(d.currency).toBe("USD");
  });

  it("matches withholding tax to the parent dividend by symbol+date", async () => {
    const r = await parseIbkr(
      fixture([
        DIV_HEADER,
        '"Dividends","Data","USD","2024-04-15","AAPL(US0378331005) Cash Dividend USD 0.24 per Share","100.00"',
        WHT_HEADER,
        '"Withholding Tax","Data","USD","2024-04-15","AAPL(US0378331005) Cash Dividend USD 0.24 per Share - US Tax","-15.00",""',
      ]),
    );
    const div = r.transactions.find((t) => t.type === "DIVIDEND");
    expect(div).toBeDefined();
    expect(div!.withholdingTax).toBe("15");
  });

  it("backfills ISIN into trades from dividend descriptions when ISIN col missing", async () => {
    // Older Activity Statement format — Trades section without ISIN column.
    const TRADES_NO_ISIN =
      '"Trades","Header","DataDiscriminator","Asset Category","Currency","Symbol","Date/Time","Quantity","T. Price","Proceeds","Comm/Fee","Basis","Realized P/L","Code"';
    const r = await parseIbkr(
      fixture([
        DIV_HEADER,
        '"Dividends","Data","USD","2024-04-15","AAPL(US0378331005) Cash Dividend","2.40"',
        TRADES_NO_ISIN,
        '"Trades","Data","Order","Stocks","USD","AAPL","2024-03-15","10","150.00","-1500.00","-1.00","1501.00","0","O"',
      ]),
    );
    const trade = r.transactions.find((t) => t.type === "BUY");
    expect(trade?.isin).toBe("US0378331005");
  });

  it("warns when trade has no ISIN and no Symbol→ISIN match", async () => {
    const TRADES_NO_ISIN =
      '"Trades","Header","DataDiscriminator","Asset Category","Currency","Symbol","Date/Time","Quantity","T. Price","Proceeds","Comm/Fee","Basis","Realized P/L","Code"';
    const r = await parseIbkr(
      fixture([
        TRADES_NO_ISIN,
        '"Trades","Data","Order","Stocks","USD","AAPL","2024-03-15","10","150.00","-1500.00","-1.00","1501.00","0","O"',
      ]),
    );
    expect(r.warnings.some((w) => w.code === "MISSING_ISIN")).toBe(true);
  });

  it("skips non-equity asset categories (forex, options)", async () => {
    const r = await parseIbkr(
      fixture([
        TRADES_HEADER,
        '"Trades","Data","Order","Forex","USD","EUR.USD","","2024-03-15","1000","1.10","-1100.00","-1.00","1101.00","0","O"',
        '"Trades","Data","Order","Stocks","USD","AAPL","US0378331005","2024-03-15","10","150.00","-1500.00","-1.00","1501.00","0","O"',
      ]),
    );
    expect(r.transactions).toHaveLength(1);
    expect(r.transactions[0].isin).toBe("US0378331005");
  });

  it("rejects files with no Trades and no Dividends sections", async () => {
    await expect(parseIbkr(fixture(['"Statement","Header","Field Name","Field Value"']))).rejects.toThrow(
      /Trades or Dividends/,
    );
  });

  it("parses thousand-separated US numbers", async () => {
    const r = await parseIbkr(
      fixture([
        TRADES_HEADER,
        '"Trades","Data","Order","Stocks","USD","TSLA","US88160R1014","2024-03-15","100","1,234.56","-123456.00","-1.00","123457.00","0","O"',
      ]),
    );
    expect(r.transactions[0].pricePerUnit).toBe("1234.56");
  });
});
