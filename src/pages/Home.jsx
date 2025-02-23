import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import CTA from '../components/CTA'

function Home() {
  return (
    <main className="container mx-auto px-4 pt-24">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}

export default Home