import React from 'react'
import Hero from '../components/Hero'
import CTA from '../components/CTA'
import ConceptOverview from '../components/ConceptOverview'
import Footer from '../components/Footer'
import AppShowcase from '../components/AppShowcase'

function Home() {
    return (
        <main className="container mx-auto px-4 pt-24">
            <Hero />
            <AppShowcase />
            <ConceptOverview />
            <CTA />
            <Footer />
        </main>
    )
}

export default Home