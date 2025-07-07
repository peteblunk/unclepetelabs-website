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
        <p>This page is dedicated to our Web Architecture services. Details about our capabilities and projects in web architecture will be added here soon.</p>
      </main>
    </>
  );
};

export default WebArchitecturePage;