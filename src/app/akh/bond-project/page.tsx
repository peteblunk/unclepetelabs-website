import BondTerminalClient from './BondTerminalClient';
import Header from '@/components/layout/header';

async function getAuctions() {
  // Fetch YTD auctions and cache for 1 hour (3600 seconds)
  const url = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/auctions_query?filter=auction_date:gte:2026-01-01&page[size]=1000&sort=-auction_date';
  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch Treasury data');
  }
  
  return res.json();
}

export default async function BondProjectPage() {
  const payload = await getAuctions();
  return (
    <>
      <Header />
      <BondTerminalClient initialData={payload.data} />
    </>
  );
}
