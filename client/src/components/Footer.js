import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: #fff;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff00;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Conference</h3>
          <p>Join us for an exciting conference featuring the latest developments in technology and innovation.</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li>Schedule</li>
            <li>Speakers</li>
            <li>Venue</li>
            <li>Contact</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Connect With Us</h3>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Conference. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 