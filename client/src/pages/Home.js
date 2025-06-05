import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 800px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  background: #00ff00;
  color: #000;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc00;
    transform: translateY(-2px);
  }
`;

const FeaturedSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Welcome to Our Conference</HeroTitle>
        <HeroSubtitle>
          Join us for an exciting event featuring the latest developments in technology and innovation.
          Network with industry leaders and learn from expert speakers.
        </HeroSubtitle>
        <CTAButton to="/cfp">Submit Your Paper</CTAButton>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Why Attend?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Expert Speakers</h3>
            <p>Learn from industry leaders and renowned experts in their fields.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Networking</h3>
            <p>Connect with professionals and expand your professional network.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Latest Trends</h3>
            <p>Stay updated with the latest developments and innovations in technology.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturedSection>
    </HomeContainer>
  );
};

export default Home; 