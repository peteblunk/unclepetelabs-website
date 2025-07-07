import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/layout/header';

const EducationalPlatformsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Educational Platforms</h2>
        <p>This is the page for Educational Platforms. Content about our work in this area will go here.</p>
        {/* You can add images or other content related to Educational Platforms here */}
        {/* <Link href="/some-specific-educational-project" passHref>
          <Image src="/images/educational-platform-preview.png" alt="Educational Platform Preview" width={500} height={300} />
        </Link> */}
      </main>
    </>
  );
};

export default EducationalPlatformsPage;