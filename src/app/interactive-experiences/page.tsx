import React from 'react';
import Header from '@/components/layout/header';

const InteractiveExperiencesPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Interactive Experiences</h2>
        <p>Details about our Interactive Experiences service.</p>
      </main>
    </>
  );
};

export default InteractiveExperiencesPage;