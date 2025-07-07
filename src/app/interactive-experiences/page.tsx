import React from 'react';
import Header from '@/components/layout/header';

const InteractiveExperiencesPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <h2 className="text-4xl font-bold mb-8">Interactive Experiences</h2>
        <p className="text-lg text-center mb-12">
          Designing unique digital installations and web-based generative art that respond to user input.
          Explore our Keyboard Sketchbook project below:
        </p>
        <div className="w-full max-w-4xl">
          <iframe
            src="https://keyboard-sketchbook.unclepetelaboratories.net/"
            title="Keyboard Sketchbook"
            style={{ width: '100%', height: '600px', border: 'none' }}
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default InteractiveExperiencesPage;