import React from 'react';
import { Header } from './Header.js';
import { NavCards } from './NavCards.js';
import { Footer } from './Footer.js';

export function Home() {
  return (
    <div>
      <Header />
      <NavCards />
      <Footer />
    </div>
  )
}
