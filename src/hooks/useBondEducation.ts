'use client';

import { useState } from 'react';

/**
 * Hook to manage educational terms and their definitions.
 * Follows the Rule of Ptah (Part VI) by keeping logic separate from the Body (.tsx).
 */
export function useBondEducation() {
  const [terms] = useState({
    'Stop-Out Yield': 'The highest yield accepted by the Treasury in a single-price auction. All bidders whose bids are accepted receive this same yield.',
    'Spread / Tail': 'The difference (in basis points) between the highest yield accepted in the auction (Stop-Out) and the pre-auction "When-Issued" yield. A large "tail" suggests weak demand.',
    'Bid-to-Cover': 'The ratio of the total amount of bids received to the amount of securities actually sold. A higher ratio indicates stronger demand.',
    'Primary Dealer Takedown': 'The percentage of the auction amount allotted to Primary Dealers. Monitoring this helps identify structural demand vs. dealer inventory buildup.',
    'Indirect Allotment': 'The percentage of the auction amount allotted to Indirect Bidders, which are primarily foreign central banks and international monetary authorities. Strong indirect bidding often signals healthy global demand.',
    'T-Bill': 'Short-term US government debt with maturities of one year or less (4, 8, 13, 17, 26, and 52 weeks). They are sold at a discount to par value and do not pay regular interest.',
    'Note': 'Medium-term US government debt with maturities ranging from 2 to 10 years (2, 3, 5, 7, and 10 years). They pay interest semi-annually.',
    'Bond': 'Long-term US government debt with maturities of more than 10 years (typically 20 and 30 years). They pay interest semi-annually.',
    'Primary Dealer': 'Financial institutions that are authorized to trade directly with the Federal Reserve and are required to participate in all Treasury auctions. They act as market makers for US government securities.',
    'Treasury Auction': 'The process by which the US government sells debt securities to finance its operations. Most auctions use a "single-price" format where all successful bidders receive the same Stop-Out Yield.',
  });

  const getDefinition = (term: string): string => {
    return terms[term as keyof typeof terms] || 'Definition not found.';
  };

  const getAllTerms = () => {
    return Object.entries(terms).map(([name, definition]) => ({ name, definition }));
  };

  return {
    getDefinition,
    getAllTerms,
    availableTerms: Object.keys(terms),
  };
}
