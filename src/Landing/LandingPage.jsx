import React from 'react';
import Navbar from '../landing/Navbar';
import HeroSection from '../landing/HeroSection';
import FeatureSection from '../landing/FeatureSection';
import Workflow from '../landing/Workflow';
import Pricing from '../landing/Pricing';
import Testimonials from '../landing/Testimonials';
import Footer from '../landing/Footer';

const LandingPage = () => {
    return (
        <>
            {/*<Navbar />*/}
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Pricing />
                <Testimonials />
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
