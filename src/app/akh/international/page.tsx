import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import InternationalBondsClient from './InternationalBondsClient';

async function getExchangeRates() {
  const currencies = ['Euro Zone-Euro', 'United Kingdom-Pound', 'Japan-Yen', 'Canada-Dollar', 'Switzerland-Franc'];
  const filter = `country_currency_desc:in:(${currencies.join(',')})`;
  const url = `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?fields=country_currency_desc,exchange_rate,record_date&filter=${filter}&sort=-record_date&page[size]=60`;
  
  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch Treasury Exchange Rate data');
  }
  
  return res.json();
}

/**
 * Ptah Protocol (Part VI): Data fetching logic
 * Future: Use FRED API or similar for real-time bond yields.
 */
async function getBondYields() {
  // Mock data for initial implementation
  // UK, Germany, Japan, France 10Y yields from scraping
  return [
    { country: 'UK', value: 4.7240, date: '2026-04-14' },
    { country: 'Germany', value: 3.0297, date: '2026-04-14' },
    { country: 'Japan', value: 2.4050, date: '2026-04-14' },
    { country: 'France', value: 3.6570, date: '2026-04-14' },
    { country: 'US', value: 4.2550, date: '2026-04-14' },
    { country: 'UK', value: 4.82, date: '2026-04-13' },
    { country: 'Germany', value: 2.95, date: '2026-04-13' },
    { country: 'Japan', value: 2.38, date: '2026-04-13' },
    { country: 'France', value: 3.58, date: '2026-04-13' },
    { country: 'US', value: 4.28, date: '2026-04-13' },
  ];
}

export default async function InternationalPage() {
  const payload = await getExchangeRates();
  const bondYields = await getBondYields();
  
  return (
    <>
      <Header />
      <InternationalBondsClient 
        initialData={payload.data} 
        yieldData={bondYields}
      />
      <Footer />
    </>
  );
}
