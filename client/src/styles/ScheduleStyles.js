import styled, { keyframes } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ScheduleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 400px;

  input {
    border: none;
    outline: none;
    padding: 0.5rem;
    width: 100%;
    font-size: 1rem;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active::after {
    width: 200%;
    height: 200%;
  }

  &:hover {
    background: #e0e0e0;
  }
`;

export const FavoritesFilter = styled(FilterButton)`
  background: ${props => props.active ? '#ff6b6b' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : 'inherit'};
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const DayButton = styled.button`
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

export const Timeline = styled.div`
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

export const Event = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  padding: ${props => props.align === 'left' ? '0 2rem 0 0' : '0 0 0 2rem'};
`;

export const EventContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

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

export const EventTime = styled.div`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const EventTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EventDescription = styled.p`
  color: #666;
  line-height: 1.6;
  display: ${props => props.expanded ? 'block' : 'none'};
`;

export const EventDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: ${props => props.expanded ? 'block' : 'none'};
`;

export const EventActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${scaleIn} 0.3s ease-out;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

export const FilterModal = styled(Modal)`
  display: ${props => props.show ? 'flex' : 'none'};
`;

export const FilterContent = styled(ModalContent)`
  max-width: 400px;
`;

export const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const FilterCheckbox = styled.input`
  margin-right: 0.5rem;
`;

export const EventStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

export const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#ffd700' : '#ccc'};
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ffd700;
  }
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#ff6b6b' : '#ccc'};
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

export const NotesSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-family: inherit;
  resize: vertical;
`;

export const PopularityBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #ff6b6b;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

export const ShareModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7);
`;

export const ShareContent = styled(ModalContent)`
  max-width: 400px;
  text-align: center;
`;

export const ShareOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const ShareButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }
`;

export const QRCodeModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7);
`;

export const QRCodeContent = styled(ModalContent)`
  max-width: 300px;
  text-align: center;
  padding: 2rem;
`;

export const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 1rem auto;
  border: 1px solid #eee;
  border-radius: 5px;
`;

export const CommentsSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #666;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

export const CommentItem = styled.div`
  background: #f9f9f9;
  padding: 0.8rem;
  border-radius: 5px;
  position: relative;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.3rem;
`;

export const CommentText = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

export const CommentTime = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.3rem;
  text-align: right;
`;

export const CommentInput = styled.div`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #00ff00;
    }
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background: #00ff00;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #00cc00;
    }
  }
`;

export const ReminderButton = styled(ActionButton)`
  background: ${props => props.active ? '#ffd700' : '#f5f5f5'};
  color: ${props => props.active ? '#000' : 'inherit'};

  &:hover {
    background: ${props => props.active ? '#ffed4a' : '#e0e0e0'};
  }
`;

export const ReactionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    color: #00ff00;
    transform: scale(1.1);
  }
`;

export const ReactionCount = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

export const FeedbackModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7);
`;

export const FeedbackContent = styled(ModalContent)`
  max-width: 400px;
  text-align: center;
`;

export const FeedbackOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const FeedbackButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    background: #e0e0e0;
  }
`;

export const ReplySection = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #eee;
`;

export const ReplyInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #00ff00;
    }
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background: #00ff00;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #00cc00;
    }
  }
`;

export const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ReplyItem = styled.div`
  background: #f5f5f5;
  padding: 0.8rem;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

export const NotificationButton = styled(ActionButton)`
  background: ${props => props.active ? '#ffd700' : '#f5f5f5'};
  color: ${props => props.active ? '#000' : 'inherit'};

  &:hover {
    background: ${props => props.active ? '#ffed4a' : '#e0e0e0'};
  }
`;

export const AttendanceButton = styled(ActionButton)`
  background: ${props => props.active ? '#4CAF50' : '#f5f5f5'};
  color: ${props => props.active ? '#fff' : 'inherit'};

  &:hover {
    background: ${props => props.active ? '#45a049' : '#e0e0e0'};
  }
`;

export const RatingModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7);
`;

export const RatingContent = styled(ModalContent)`
  max-width: 500px;
  text-align: center;
`;

export const RatingInput = styled.div`
  margin: 1.5rem 0;
  text-align: left;
`;

export const RatingLabel = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const RatingSubmit = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  background: #00ff00;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #00cc00;
    transform: translateY(-2px);
  }
`;

export const NotificationSettings = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;

  h3 {
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

export const NotificationOption = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
  }

  input[type="email"],
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #00ff00;
    }
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

export const DashboardModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.7);
`;

export const DashboardContent = styled(ModalContent)`
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ff00;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

export const NotesEditor = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 5px;
`;

export const ToolbarButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  border-radius: 3px;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }

  &:active {
    background: #d0d0d0;
  }
`;

export const RichTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #00ff00;
  }
`;

export const NotesPreview = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;

  h4 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  a {
    color: #00ff00;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`; 