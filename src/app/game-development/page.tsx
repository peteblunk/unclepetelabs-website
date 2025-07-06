import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/layout/header';

const GameDevelopmentPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Our Games</h2>
        <p>Here you can find information and links to the games we have developed. Explore our creations across various platforms and genres.</p>
        <Link href="https://tiger-run.unclepetelaboratories.net/" passHref>
          <Image src="/images/games/tiger-run-preview.png" alt="Tiger Run Game Preview" width={500} height={300} />
        </Link>
      </main>
    </>
  );
};

export default GameDevelopmentPage;
