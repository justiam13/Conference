import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  color: #00ff00;
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ff00;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00ff00;
  }
`;

const SubmitButton = styled.button`
  background: #00ff00;
  color: #000;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc00;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual API endpoint
      await axios.post('/api/contact', formData);
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      console.error('Error sending message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>

      <ContactGrid>
        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          
          <InfoItem>
            <InfoIcon>
              <FaEnvelope />
            </InfoIcon>
            <InfoText>
              <h3>Email</h3>
              <p>conference@example.com</p>
            </InfoText>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaPhone />
            </InfoIcon>
            <InfoText>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </InfoText>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaMapMarkerAlt />
            </InfoIcon>
            <InfoText>
              <h3>Address</h3>
              <p>123 Conference Center<br />Tech City, TC 12345<br />United States</p>
            </InfoText>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {submitStatus && (
            <StatusMessage type={submitStatus.type}>
              {submitStatus.message}
            </StatusMessage>
          )}
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact; 