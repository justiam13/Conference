import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const PageContent = styled.div`
  line-height: 1.6;
  font-size: 1.1rem;

  h2 {
    margin: 2rem 0 1rem;
    color: #444;
  }

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const DynamicPage = () => {
  const { pageSlug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        // Fetch from the backend API running on port 5001
        const response = await axios.get(`http://localhost:5001/api/pages/${pageSlug}`);
        setPageData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load page content. Please try again later.');
        console.error('Error fetching page content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pageSlug]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );
  }

  if (!pageData) {
    return (
      <PageContainer>
        <ErrorMessage>Page not found</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>{pageData.title}</PageTitle>
      <PageContent dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </PageContainer>
  );
};

export default DynamicPage; 