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

export default async function InternationalPage() {
  const payload = await getExchangeRates();
  return (
    <>
      <Header />
      <InternationalBondsClient initialData={payload.data} />
      <Footer />
    </>
  );
}
