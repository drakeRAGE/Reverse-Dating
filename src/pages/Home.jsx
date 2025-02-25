import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import CTA from '../components/CTA'
import ConceptOverview from '../components/ConceptOverview'
import Footer from '../components/Footer'
import AppShowcase from '../components/AppShowcase'
import DisclaimerModal from '../components/DisclaimerModal'

function Home() {
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('disclaimerShown')) {
            setShowDisclaimer(true);
        }
    }, []);

    const handleDismiss = () => {
        setShowDisclaimer(false);
        localStorage.setItem('disclaimerShown', 'true');
    };

    return (
        <>
            {showDisclaimer && <DisclaimerModal onDismiss={handleDismiss} />}
            <main className="container mx-auto px-4 pt-24">
                <Hero />
                <AppShowcase />
                <ConceptOverview />
                <CTA />
                <Footer />
            </main>
        </>
    )
}

export default Home