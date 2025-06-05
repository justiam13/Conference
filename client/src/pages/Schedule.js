import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ScheduleContainer = styled.div`
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

const DaySelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DayButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#00ff00' : '#f5f5f5'};
  color: ${props => props.active ? '#000' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00cc00' : '#e0e0e0'};
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #ddd;
  }
`;

const Event = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  padding: ${props => props.align === 'left' ? '0 2rem 0 0' : '0 0 0 2rem'};
`;

const EventContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.align === 'left' ? 'right: -10px' : 'left: -10px'};
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: #00ff00;
    border-radius: 50%;
  }
`;

const EventTime = styled.div`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff0000;
`;

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('day1');
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/schedule/${selectedDay}`);
        setSchedule(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule. Please try again later.');
        console.error('Error fetching schedule:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDay]);

  // Sample data for demonstration
  const sampleSchedule = [
    {
      time: '09:00 AM',
      title: 'Opening Ceremony',
      description: 'Welcome address and keynote speeches',
      align: 'left'
    },
    {
      time: '10:30 AM',
      title: 'Technical Session 1',
      description: 'Presentations on emerging technologies',
      align: 'right'
    },
    {
      time: '12:00 PM',
      title: 'Lunch Break',
      description: 'Networking lunch with speakers and attendees',
      align: 'left'
    },
    {
      time: '02:00 PM',
      title: 'Panel Discussion',
      description: 'Future of technology and innovation',
      align: 'right'
    }
  ];

  return (
    <ScheduleContainer>
      <Title>Conference Schedule</Title>

      <DaySelector>
        <DayButton
          active={selectedDay === 'day1'}
          onClick={() => setSelectedDay('day1')}
        >
          Day 1
        </DayButton>
        <DayButton
          active={selectedDay === 'day2'}
          onClick={() => setSelectedDay('day2')}
        >
          Day 2
        </DayButton>
        <DayButton
          active={selectedDay === 'day3'}
          onClick={() => setSelectedDay('day3')}
        >
          Day 3
        </DayButton>
      </DaySelector>

      {loading ? (
        <LoadingMessage>Loading schedule...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Timeline>
          {sampleSchedule.map((event, index) => (
            <Event key={index} align={event.align}>
              <EventContent align={event.align}>
                <EventTime>{event.time}</EventTime>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
              </EventContent>
            </Event>
          ))}
        </Timeline>
      )}
    </ScheduleContainer>
  );
};

export default Schedule; 