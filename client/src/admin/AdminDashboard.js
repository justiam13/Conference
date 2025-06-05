import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 2rem 0;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  &.active {
    background: #00ff00;
    color: #000;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
`;

const ContentHeader = styled.header`
  margin-bottom: 2rem;
`;

const ContentTitle = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const ContentSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('pages');

  const renderContent = () => {
    switch (activeSection) {
      case 'pages':
        return (
          <ContentSection>
            <h2>Manage Pages</h2>
            {/* Add page management content here */}
          </ContentSection>
        );
      case 'users':
        return (
          <ContentSection>
            <h2>Manage Users</h2>
            {/* Add user management content here */}
          </ContentSection>
        );
      case 'submissions':
        return (
          <ContentSection>
            <h2>Manage Submissions</h2>
            {/* Add submission management content here */}
          </ContentSection>
        );
      case 'settings':
        return (
          <ContentSection>
            <h2>Settings</h2>
            {/* Add settings content here */}
          </ContentSection>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarMenu>
          <MenuItem
            className={activeSection === 'pages' ? 'active' : ''}
            onClick={() => setActiveSection('pages')}
          >
            <FaFileAlt /> Pages
          </MenuItem>
          <MenuItem
            className={activeSection === 'users' ? 'active' : ''}
            onClick={() => setActiveSection('users')}
          >
            <FaUsers /> Users
          </MenuItem>
          <MenuItem
            className={activeSection === 'submissions' ? 'active' : ''}
            onClick={() => setActiveSection('submissions')}
          >
            <FaFileAlt /> Submissions
          </MenuItem>
          <MenuItem
            className={activeSection === 'settings' ? 'active' : ''}
            onClick={() => setActiveSection('settings')}
          >
            <FaCog /> Settings
          </MenuItem>
          <MenuItem>
            <FaSignOutAlt /> Logout
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <ContentTitle>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </ContentTitle>
        </ContentHeader>
        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 