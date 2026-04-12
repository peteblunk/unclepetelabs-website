
export interface TreasuryAuctionRecord {
  cusip: string;
  security_type: string;
  security_term: string;
  offering_amt: string;
  high_yield: string;
  low_yield: string;
  high_investment_rate: string;
  low_investment_rate: string;
  high_discnt_rate: string;
  low_discnt_rate: string;
  bid_to_cover_ratio: string;
  primary_dealer_accepted: string;
  direct_bidder_accepted: string;
  indirect_bidder_accepted: string;
  total_accepted: string;
  auction_date: string;
}

export interface ParsedAuction {
  id: string;
  type: string;
  size: string;
  yield: string;
  tail: string;
  btc: string;
  primary: string;
  direct: string;
  indirect: string;
  rawDate: Date;
}

export const formatMoney = (amount: string) => {
  if (!amount || amount === 'null') return 'N/A';
  const num = parseFloat(amount);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
};

export const calculateAllotment = (accepted: string, total: string) => {
  if (!accepted || !total || accepted === 'null' || total === 'null') return 'N/A';
  return ((parseFloat(accepted) / parseFloat(total)) * 100).toFixed(1) + '%';
};

export const calculateTail = (high: string, low: string) => {
  if (!high || !low || high === 'null' || low === 'null') return 'N/A';
  const diff = (parseFloat(high) - parseFloat(low)) * 100; // basis points
  if (diff === 0) return '0.0bps';
  return diff > 0 ? `+${diff.toFixed(1)}bps` : `${diff.toFixed(1)}bps`;
};

export const parseTreasuryData = (data: TreasuryAuctionRecord[]): ParsedAuction[] => {
  return data.map((raw, index) => {
    let finalYield = 'N/A';
    if (raw.high_yield !== 'null') {
      finalYield = `${parseFloat(raw.high_yield).toFixed(3)}%`;
    } else if (raw.high_investment_rate !== 'null') {
      finalYield = `${parseFloat(raw.high_investment_rate).toFixed(3)}%`;
    } else if (raw.high_discnt_rate !== 'null') {
      finalYield = `${parseFloat(raw.high_discnt_rate).toFixed(3)}%`;
    }

    let finalTail = 'N/A';
    if (raw.high_yield !== 'null' && raw.low_yield !== 'null') {
      finalTail = calculateTail(raw.high_yield, raw.low_yield);
    } else if (raw.high_investment_rate !== 'null' && raw.low_investment_rate !== 'null') {
      finalTail = calculateTail(raw.high_investment_rate, raw.low_investment_rate);
    } else if (raw.high_discnt_rate !== 'null' && raw.low_discnt_rate !== 'null') {
      finalTail = calculateTail(raw.high_discnt_rate, raw.low_discnt_rate);
    }

    return {
      id: `${raw.cusip || 'unknown'}-${index}`,
      type: raw.security_type === 'Bill' ? `${raw.security_term} T-Bill` : `${raw.security_term} ${raw.security_type}`,
      size: formatMoney(raw.offering_amt),
      yield: finalYield,
      tail: finalTail,
      btc: raw.bid_to_cover_ratio !== 'null' ? parseFloat(raw.bid_to_cover_ratio).toFixed(2) : 'N/A',
      primary: calculateAllotment(raw.primary_dealer_accepted, raw.total_accepted),
      direct: calculateAllotment(raw.direct_bidder_accepted, raw.total_accepted),
      indirect: calculateAllotment(raw.indirect_bidder_accepted, raw.total_accepted),
      rawDate: new Date(raw.auction_date),
    };
  });
};

/**
 * Ptah Protocol (Part VI): Logic for preparing graph data
 */
export const prepareGraphData = (data: ParsedAuction[]) => {
  const completed = data.filter(a => a.yield !== 'N/A');
  
  // Group by date to handle multiple auctions on the same day
  const groupedByDate = completed.reduce((acc: any, curr) => {
    const dateStr = curr.rawDate.toISOString().split('T')[0];
    if (!acc[dateStr]) acc[dateStr] = { date: dateStr };
    
    // We'll use a simplified key for the graph (e.g., '4-Wk', '10-Yr')
    const key = curr.type.split(' ')[0]; 
    acc[dateStr][key] = parseFloat(curr.yield);
    return acc;
  }, {});

  return Object.values(groupedByDate).sort((a: any, b: any) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

/**
 * Ptah Protocol (Part VI): Extract unique security types for graph legends
 */
export const getUniqueSecurityTypes = (data: ParsedAuction[]) => {
  return Array.from(
    new Set(
      data.filter(a => a.yield !== 'N/A').map(a => a.type.split(' ')[0])
    )
  );
};

/**
 * Ptah Protocol (Part VI): Logic for filtering Treasury data
 */
export const filterAuctions = (data: ParsedAuction[], filter: string) => {
  if (filter === 'ALL') return data;
  const lowerFilter = filter.toLowerCase();
  return data.filter((item: any) => {
    const typeStr = item.type.toLowerCase();
    if (lowerFilter === 'bills') return typeStr.includes('bill') || typeStr.includes('cmb');
    if (lowerFilter === 'notes') return typeStr.includes('note');
    if (lowerFilter === 'bonds') return typeStr.includes('bond') || typeStr.includes('tips');
    return true;
  });
};

/**
 * Ptah Protocol (Part VI): Logic for identifying historical completed auctions
 */
export const getHistoricalTape = (data: ParsedAuction[]) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return data.filter((a: any) => a.yield !== 'N/A' && a.rawDate < now);
};

/**
 * Ptah Protocol (Part VI): Logic for identifying upcoming auctions
 */
export const getUpcomingAuctions = (data: ParsedAuction[]) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return data
    .filter((a: any) => a.yield === 'N/A' && a.rawDate >= now)
    .sort((a: any, b: any) => a.rawDate.getTime() - b.rawDate.getTime());
};

/**
 * Ptah Protocol (Part VI): Logic for getting the latest completed auction with filtering
 */
export const getLatestCompleted = (data: ParsedAuction[], filter: string) => {
  const completed = data.filter((a: any) => a.yield !== 'N/A');
  const filtered = filterAuctions(completed, filter);
  return filtered[0] || null;
};

/**
 * Ptah Protocol (Part VI): Logic for preparing exchange rate chart data
 * Separates formatting/grouping logic from the UI Body.
 */
export const prepareExchangeRateChartData = (data: any[]) => {
  const dates = Array.from(new Set(data.map(d => d.record_date))).sort();
  return dates.map(date => {
    const point: any = { 
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) 
    };
    data.filter(d => d.record_date === date).forEach(d => {
      point[d.country_currency_desc] = parseFloat(d.exchange_rate);
    });
    return point;
  });
};

/**
 * Ptah Protocol (Part VI): Extract unique currencies for legend identification
 */
export const getUniqueCurrencies = (data: any[]) => {
  return Array.from(new Set(data.map(d => d.country_currency_desc)));
};

/**
 * Ptah Protocol (Part VI): Logic for filtering Wiki terms
 * Separates searching/filtering logic from the Per-Ankh Body.
 */
export const filterWikiTerms = (terms: any[], search: string) => {
  if (!search) return terms;
  const lowerSearch = search.toLowerCase();
  return terms.filter(t => 
    t.name.toLowerCase().includes(lowerSearch) || 
    t.definition.toLowerCase().includes(lowerSearch)
  );
};
