import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/layout/header';

const CreativePrototypingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Creative Prototyping</h2>
        <p>This is the Creative Prototyping page. More content will be added here later.</p>
      </main>
    </>
  );
};

export default CreativePrototypingPage;