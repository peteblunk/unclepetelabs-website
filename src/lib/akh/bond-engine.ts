
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
