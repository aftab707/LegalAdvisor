import React from 'react';
import { Gavel, Lock,Scale, Languages, FileSliders } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Scale size={24} color="white" />,
    title: "Pakistani Statutory Law Coverage",
    description: "Constitutional Law, Family Law, Property Law, Criminal Law, Contract Law, Labour Law, Tax Law, and more.",
    color: "#06b6d4"
  },
  {
    icon: <Gavel size={24} color="white" />,
    title: "Islamic Law (Sharia) Expert",
    description: "Complete guidance on Nikah, Talaq, Khula, Inheritance (Meerath), Waqf, and other Islamic legal matters based on authentic sources.",
    color: "#a855f7"
  },
  {
    icon: <Languages size={24} color="white" />,
    title: "Bilingual Support (Urdu & English)",
    description: "Ask in Urdu or English - get responses in your preferred language with legal terminology explained simply.",
    color: "#ec4899"
  },
  
  {
    icon: <FileSliders size={24} color="white" />,
    title: "Cite Legal Sources",
    description: "Every answer includes references to Relevant sections of Pakistani Constitution and Quran & Hadith citations (for Islamic matters)",
    color: "#486eecff"
  },
  {
    icon: <Lock size={24} color="white" />,
    title: "100% Confidential",
    description: "Your legal queries are encrypted and never shared. Complete privacy guaranteed.",
    color: "#adec48fd"
  }
];

export const Features = () => {
  return (
    <section id="features" className="section container">
      {/* Section Header */}
      <div className="features-header" >
        <h2>
          Intelligence Grounded in <span className="text-gradient">Pakistani & Islamic Law</span>
        </h2>
        <p>
          Your 24/7 legal companion for navigating complex legal matters with confidence        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div 
              className="feature-card__icon-container" 
              style={{ backgroundColor: feature.color }}
            >
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};