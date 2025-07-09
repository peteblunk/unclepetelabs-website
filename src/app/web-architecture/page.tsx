import React from 'react';
import Link from 'next/link'; // Although not used yet, keeping for potential future use
import Image from 'next/image'; // Although not used yet, keeping for potential future use

import Header from '@/components/layout/header';

const WebArchitecturePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Web Architecture</h2>
 <p>This page is dedicated to our Web Architecture services. Enjoy the following examples of our work. Addiional projects will be added soon.</p>
        <div style={{ backgroundColor: 'white', width: '100%', height: '600px' }}>
 <iframe
 src="https://usgs-stream-monitoring-4e84.vercel.app/"
 width="100%"
 height="600px"
 style={{ border: 'none' }}
 title="USGS Stream Monitoring Project"
 />
        </div>
 <Link href="/usgs" passHref target="_blank" rel="noopener noreferrer">
          See deployment here: https://unclepetelaboratories.net/usgs
 </Link>
      </main>
    </>
  );
};

export default WebArchitecturePage;