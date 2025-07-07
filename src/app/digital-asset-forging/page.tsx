import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/layout/header';

const DigitalAssetForgingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Digital Asset Forging</h2>
        <p>This is the page for Digital Asset Forging services. More content coming soon!</p>
        {/* You can add images or other content here */}
      </main>
    </>
  );
};

export default DigitalAssetForgingPage;