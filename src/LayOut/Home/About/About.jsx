import React from 'react';

const About = () => {
    return (
        <div className="min-h-[80vh] sm:p-4 max-w-7xl mx-auto mt-10">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="mt-4 text-lg">
                We are a team dedicated to helping you monitor your credit and take control of your financial future. Our easy-to-use platform allows you to view your credit reports and scores, set goals, get alerts, and more.
            </p>

            <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
            <p className="mt-4 text-lg">
                Our mission is to empower consumers by providing transparency and insight into credit reports and scores. We aim to help you make informed financial decisions and achieve your goals.
            </p>

            <h2 className="text-2xl font-bold mt-8">Our Values</h2>
            <ul className="list-disc list-inside mt-4 text-lg">
                <li>Transparency - We believe consumers have a right to their financial data.</li>
                <li>Education - We want to help demystify credit and finances.</li>
                <li>Security - We take privacy and security of your data very seriously.</li>
                <li>Integrity - We adhere to the highest ethical standards in everything we do.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Our Team</h2>
            <p className="mt-4 text-lg">
                We are financial experts, engineers, designers and customer support specialists dedicated to building tools that help consumers take control of their financial lives.
            </p>

            <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
            <p className="mt-4 text-lg">
                Email: support@ecreditmonitoring.com
                Phone: 1-800-123-4567
            </p>
        </div>
    );
}

export default About;
