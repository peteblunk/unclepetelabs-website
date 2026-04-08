'use client';

import { 
  getAllTerms as fetchAllTerms, 
  getDefinition as fetchDefinition,
  getAvailableTermNames,
  filterTerms
} from '@/lib/akh/education-engine';

/**
 * Hook to manage educational terms and their definitions.
 * Delegates core logic to the education-engine (Part VI).
 */
export function useBondEducation() {
  return {
    getDefinition: fetchDefinition,
    getAllTerms: fetchAllTerms,
    filterTerms,
    availableTerms: getAvailableTermNames(),
  };
}
