import React from 'react';
// import Navbar from '../landing/Navbar';
import HeroSection from '../landing/HeroSection.jsx';
import FeatureSection from '../landing/FeatureSection.jsx';
import Workflow from '../landing/Workflow.jsx';
import Pricing from '../landing/Pricing.jsx';
import Testimonials from '../landing/Testimonials.jsx';
import Footer from '../landing/Footer.jsx';

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
