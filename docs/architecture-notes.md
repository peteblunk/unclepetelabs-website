# The Vercel + Treasury API Architecture (Zero-DB)

Since the Treasury API is public and free, we can treat *their* servers as our database. 

1. **Next.js Server Components**: When a user visits `/akh/bond-project`, the Vercel server makes a lightning-fast server-side request to the US Treasury Fiscal Data API.
2. **Next.js Caching (ISR)**: We tell Next.js to cache the result for 1 hour. So if 10,000 people visit the site, Vercel only hits the Treasury API once per hour. The other 9,999 people get a cached, instantly-loading static page.
3. **Client-Side Filtering**: We pass the 102 JSON records to the React component. Because it's just text, it's incredibly tiny (kilobytes). We can filter and sort all 102 records instantly in the browser using standard React state—no backend calls required when the user clicks "BILLS" or "NOTES".

This means **Zero Storage Costs, Zero Power Bill, and perfect compatibility with Vercel.**