import { ExchangeRate } from "./types";

/**
 * Transforms raw Treasury API exchange rate data into a format suitable for Recharts.
 * Resulting format: Array of { date: string, [currency_description]: rate_value }
 * 
 * Logic separated from UI components following the Rule of Ptah (Part VI).
 */
export function formatExchangeRatesForChart(data: ExchangeRate[]) {
  if (!data || data.length === 0) return [];

  // Sort unique dates ascending
  const dates = Array.from(new Set(data.map(d => d.record_date))).sort();

  return dates.map(date => {
    const point: Record<string, any> = { 
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) 
    };

    data.filter(d => d.record_date === date).forEach(d => {
      point[d.country_currency_desc] = parseFloat(d.exchange_rate);
    });

    return point;
  });
}

/**
 * Extracts unique currency descriptions from the dataset.
 */
export function getUniqueCurrencies(data: ExchangeRate[]): string[] {
  if (!data) return [];
  return Array.from(new Set(data.map(d => d.country_currency_desc)));
}
