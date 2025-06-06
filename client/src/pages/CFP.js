import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [form, setForm] = useState({
    title: '',
    abstract: '',
    keywords: '',
    category: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('paper', file);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5001/api/submissions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error submitting paper');
      }
      setSuccess('Paper submitted successfully!');
    } catch (err) {
      setError(err.message);
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
              value={form.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="abstract">Abstract</Label>
            <TextArea
              id="abstract"
              name="abstract"
              value={form.abstract}
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
              value={form.keywords}
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
              value={form.category}
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
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Submit Paper</SubmitButton>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </Form>
      </FormSection>
    </CFPContainer>
  );
};

export default CFP; 