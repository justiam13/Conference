import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CFPContainer = styled.div`
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

const GuidelinesSection = styled.section`
  margin-bottom: 3rem;
`;

const GuidelinesTitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1rem;
`;

const GuidelinesList = styled.ul`
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const FormSection = styled.section`
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
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

const CFP = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    abstract: '',
    keywords: '',
    category: '',
    file: null
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Replace with your actual API endpoint
      await axios.post('/api/submissions', formDataToSend);
      setSubmitStatus('success');
      setFormData({
        title: '',
        authors: '',
        abstract: '',
        keywords: '',
        category: '',
        file: null
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting paper:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CFPContainer>
      <Title>Call for Papers</Title>

      <GuidelinesSection>
        <GuidelinesTitle>Submission Guidelines</GuidelinesTitle>
        <GuidelinesList>
          <li>Papers should be original and not previously published or under review elsewhere.</li>
          <li>Submissions must be in PDF format and follow the provided template.</li>
          <li>Papers should be between 6-8 pages in length, including references.</li>
          <li>All submissions will be peer-reviewed by the program committee.</li>
          <li>Authors of accepted papers will be required to register and present at the conference.</li>
        </GuidelinesList>
      </GuidelinesSection>

      <FormSection>
        <GuidelinesTitle>Submit Your Paper</GuidelinesTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Paper Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="authors">Authors</Label>
            <Input
              type="text"
              id="authors"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="abstract">Abstract</Label>
            <TextArea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="file">Upload Paper (PDF)</Label>
            <Input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Paper'}
          </SubmitButton>

          {submitStatus === 'success' && (
            <p style={{ color: 'green' }}>Paper submitted successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p style={{ color: 'red' }}>Error submitting paper. Please try again.</p>
          )}
        </Form>
      </FormSection>
    </CFPContainer>
  );
};

export default CFP; 