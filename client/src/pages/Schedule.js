import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaCalendarPlus, FaFilter, FaTimes, FaStar, FaRegStar, FaBookmark, FaRegBookmark, FaEdit, FaUsers, FaHeart, FaShare, FaComments, FaQrcode, FaBell, FaRegBell, FaThumbsUp, FaRegThumbsUp, FaSmile, FaMeh, FaFrown, FaReply, FaRegReply, FaEnvelope, FaRegEnvelope, FaCheckCircle, FaRegCheckCircle, FaChartBar, FaChartLine, FaChartPie, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink } from 'react-icons/fa';
import {
  ScheduleContainer,
  Title,
  Controls,
  SearchBar,
  FilterSection,
  FilterButton,
  FavoritesFilter,
  DaySelector,
  DayButton,
  Timeline,
  Event,
  EventContent,
  EventTime,
  EventTitle,
  EventDescription,
  EventDetails,
  EventActions,
  ActionButton,
  Modal,
  ModalContent,
  CloseButton,
  FilterModal,
  FilterContent,
  FilterGroup,
  FilterLabel,
  FilterCheckbox,
  EventStats,
  RatingStars,
  StarButton,
  BookmarkButton,
  NotesSection,
  NotesTextarea,
  PopularityBadge,
  ShareModal,
  ShareContent,
  ShareOptions,
  ShareButton,
  QRCodeModal,
  QRCodeContent,
  QRCodeImage,
  CommentsSection,
  CommentInput,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentText,
  CommentTime,
  ReminderButton,
  ReactionButton,
  ReactionCount,
  FeedbackModal,
  FeedbackContent,
  FeedbackOptions,
  FeedbackButton,
  ReplySection,
  ReplyInput,
  ReplyList,
  ReplyItem,
  NotificationButton,
  RatingModal,
  RatingContent,
  RatingInput,
  RatingLabel,
  RatingSubmit,
  AttendanceButton,
  NotificationSettings,
  NotificationOption,
  DashboardModal,
  DashboardContent,
  StatCard,
  StatValue,
  StatLabel,
  ChartContainer,
  NotesEditor,
  Toolbar,
  ToolbarButton,
  RichTextArea,
  NotesPreview
} from '../styles/ScheduleStyles';
import { marked } from 'marked';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [editingNotes, setEditingNotes] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedEventForShare, setSelectedEventForShare] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [reminders, setReminders] = useState({});
  const [reactions, setReactions] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [replies, setReplies] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [detailedRating, setDetailedRating] = useState({});
  const [attendance, setAttendance] = useState({});
  const [notificationSettings, setNotificationSettings] = useState({
    email: '',
    reminderTime: '15', // minutes before session
    sendEmail: false
  });
  const [showDashboard, setShowDashboard] = useState(false);
  const [sessionNotes, setSessionNotes] = useState({});

  // Sample data for demonstration
  const sampleSchedule = [
    {
      id: 1,
      time: '09:00 AM',
      title: 'Opening Ceremony',
      description: 'Welcome address and keynote speeches',
      track: 'Main',
      room: 'Grand Hall',
      speaker: 'Dr. John Smith',
      align: 'left',
      details: 'Join us for the official opening of the conference. Dr. John Smith will deliver the keynote address on "The Future of Technology in Education".',
      popularity: 95
    },
    {
      id: 2,
      time: '10:30 AM',
      title: 'Technical Session 1',
      description: 'Presentations on emerging technologies',
      track: 'Technical',
      room: 'Room A',
      speaker: 'Prof. Jane Doe',
      align: 'right',
      details: 'Deep dive into the latest technical innovations in AI and Machine Learning. Prof. Jane Doe will present her research on neural networks.',
      popularity: 85
    },
    {
      id: 3,
      time: '11:45 AM',
      title: 'Workshop: Web Development',
      description: 'Hands-on workshop on modern web development',
      track: 'Workshop',
      room: 'Room B',
      speaker: 'Sarah Johnson',
      align: 'left',
      details: 'Learn the latest web development techniques in this interactive workshop. Bring your laptop for hands-on coding experience.',
      popularity: 75
    },
    {
      id: 4,
      time: '12:30 PM',
      title: 'Lunch Break',
      description: 'Networking lunch with speakers and attendees',
      track: 'Main',
      room: 'Dining Hall',
      speaker: 'N/A',
      align: 'right',
      details: 'Enjoy a networking lunch with fellow attendees and speakers. Vegetarian and vegan options available.',
      popularity: 60
    },
    {
      id: 5,
      time: '02:00 PM',
      title: 'Panel Discussion: Future of AI',
      description: 'Expert panel discussion on AI trends',
      track: 'Technical',
      room: 'Grand Hall',
      speaker: 'Multiple Speakers',
      align: 'left',
      details: 'Join our panel of AI experts as they discuss the future of artificial intelligence and its impact on various industries.',
      popularity: 90
    },
    {
      id: 6,
      time: '03:30 PM',
      title: 'Research Paper Presentations',
      description: 'Selected research paper presentations',
      track: 'Research',
      room: 'Room C',
      speaker: 'Dr. Michael Brown',
      align: 'right',
      details: 'Presentation of selected research papers from the conference proceedings. Q&A session included.',
      popularity: 70
    },
    {
      id: 7,
      time: '04:45 PM',
      title: 'Networking Session',
      description: 'Structured networking opportunity',
      track: 'Networking',
      room: 'Lobby',
      speaker: 'N/A',
      align: 'left',
      details: 'Structured networking session with industry professionals. Bring your business cards!',
      popularity: 65
    }
  ];

  // Derived state
  const tracks = [...new Set(sampleSchedule.map(event => event.track))];
  const rooms = [...new Set(sampleSchedule.map(event => event.room))];

  // Get conference dates (example: 3 days starting from today)
  const conferenceDates = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date for API
  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('scheduleFavorites');
    const savedRatings = localStorage.getItem('scheduleRatings');
    const savedNotes = localStorage.getItem('scheduleNotes');
    const savedReminders = localStorage.getItem('scheduleReminders');
    const savedReactions = localStorage.getItem('scheduleReactions');
    const savedFeedback = localStorage.getItem('scheduleFeedback');
    const savedReplies = localStorage.getItem('scheduleReplies');
    const savedDetailedRating = localStorage.getItem('scheduleDetailedRating');
    const savedAttendance = localStorage.getItem('scheduleAttendance');
    const savedNotificationSettings = localStorage.getItem('scheduleNotificationSettings');
    const savedSessionNotes = localStorage.getItem('scheduleSessionNotes');

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedReactions) setReactions(JSON.parse(savedReactions));
    if (savedFeedback) setFeedback(JSON.parse(savedFeedback));
    if (savedReplies) setReplies(JSON.parse(savedReplies));
    if (savedDetailedRating) setDetailedRating(JSON.parse(savedDetailedRating));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
    if (savedNotificationSettings) setNotificationSettings(JSON.parse(savedNotificationSettings));
    if (savedSessionNotes) setSessionNotes(JSON.parse(savedSessionNotes));

    // Fetch schedule for the initially selected day
    fetchSchedule(conferenceDates[selectedDay]);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scheduleFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('scheduleRatings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('scheduleNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('scheduleReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('scheduleReactions', JSON.stringify(reactions));
  }, [reactions]);

  useEffect(() => {
    localStorage.setItem('scheduleFeedback', JSON.stringify(feedback));
  }, [feedback]);

  useEffect(() => {
    localStorage.setItem('scheduleReplies', JSON.stringify(replies));
  }, [replies]);

  useEffect(() => {
    localStorage.setItem('scheduleDetailedRating', JSON.stringify(detailedRating));
  }, [detailedRating]);

  useEffect(() => {
    localStorage.setItem('scheduleAttendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('scheduleNotificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem('scheduleSessionNotes', JSON.stringify(sessionNotes));
  }, [sessionNotes]);

  // Fetch schedule data from the backend based on the selected day
  const fetchSchedule = async (date) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint and date format
      const formattedDate = formatDateForAPI(date);
      const response = await axios.get(`http://localhost:5001/api/schedule/${formattedDate}`);
      setScheduleData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load schedule. Please try again later.');
      setLoading(false);
      console.error('Error fetching schedule:', err);
    }
  };

  // Fetch schedule whenever the selected day changes
  useEffect(() => {
    fetchSchedule(conferenceDates[selectedDay]);
  }, [selectedDay]);

  // Event handlers
  const handleFavorite = (eventId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];
      return newFavorites;
    });
  };

  const handleRating = (eventId, rating) => {
    setRatings(prev => {
      const newRatings = { ...prev, [eventId]: rating };
      return newRatings;
    });
  };

  const handleNotesChange = (eventId, noteContent) => {
    setNotes(prev => {
      const updatedNotes = { ...prev, [eventId]: noteContent };
      return updatedNotes;
    });
  };

  const handleAddToCalendar = (event) => {
    const startTime = new Date(`${selectedDay} ${event.time}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const calendarEvent = {
      title: event.title,
      description: `${event.description}\n\nSpeaker: ${event.speaker}\nRoom: ${event.room}\nTrack: ${event.track}`,
      location: event.room,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${startTime.toISOString().replace(/-|:|\.\d+/g, '')}/${endTime.toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const renderStars = (eventId) => {
    const currentRating = ratings[eventId] || 0;
    return (
      <RatingStars>
        {[1, 2, 3, 4, 5].map(star => (
          <StarButton
            key={star}
            active={star <= currentRating}
            onClick={(e) => {
              e.stopPropagation();
              handleRating(eventId, star);
            }}
          >
            {star <= currentRating ? <FaStar /> : <FaRegStar />}
          </StarButton>
        ))}
      </RatingStars>
    );
  };

  // Handle sharing
  const handleShare = (event) => {
    setSelectedEventForShare(event);
    setShowShareModal(true);
  };

  const handleShareOption = (platform) => {
    const event = selectedEventForShare;
    const shareText = `Check out "${event.title}" at the conference! ${event.time} - ${event.room}`;
    const shareUrl = window.location.href;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  // Handle QR Code
  const handleShowQRCode = (event) => {
    setSelectedEventForShare(event);
    setShowQRCode(true);
  };

  // Handle comments
  const handleAddComment = (eventId) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'You', // In a real app, this would be the logged-in user
      timestamp: new Date().toISOString()
    };

    setComments(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), comment]
    }));
    setNewComment('');
  };

  // Handle reminders
  const handleReminder = (eventId) => {
    setReminders(prev => {
      const newReminders = { ...prev };
      if (newReminders[eventId]) {
        delete newReminders[eventId];
      } else {
        newReminders[eventId] = {
          time: new Date().toISOString(),
          event: sampleSchedule.find(e => e.id === eventId)
        };
      }
      return newReminders;
    });
  };

  // Handle reactions
  const handleReaction = (eventId, type) => {
    setReactions(prev => {
      const newReactions = { ...prev };
      if (!newReactions[eventId]) {
        newReactions[eventId] = { likes: 0, replies: 0 };
      }
      if (type === 'like') {
        newReactions[eventId].likes = (newReactions[eventId].likes || 0) + 1;
      }
      return newReactions;
    });
  };

  // Handle feedback
  const handleFeedback = (eventId, rating) => {
    setFeedback(prev => ({
      ...prev,
      [eventId]: {
        rating,
        timestamp: new Date().toISOString()
      }
    }));
    setShowFeedback(false);
  };

  // Handle replies
  const handleAddReply = (commentId, eventId) => {
    if (!newReply.trim()) return;

    const reply = {
      id: Date.now(),
      text: newReply,
      author: 'You',
      timestamp: new Date().toISOString(),
      parentCommentId: commentId
    };

    setReplies(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), reply]
    }));
    setNewReply('');
    setReplyingTo(null);
  };

  // Handle detailed rating
  const handleDetailedRating = (eventId, category, value) => {
    setDetailedRating(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [category]: value,
        timestamp: new Date().toISOString()
      }
    }));
  };

  // Handle attendance
  const handleAttendance = (eventId) => {
    setAttendance(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // Handle notification settings
  const handleNotificationSettings = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Handle email notification
  const handleEmailNotification = async (eventId) => {
    try {
      const response = await fetch('/api/notifications/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          email: notificationSettings.email,
          reminderTime: notificationSettings.reminderTime,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to schedule notification');
      }
      
      alert('Email notification scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
      alert('Failed to schedule notification. Please try again.');
    }
  };

  // Filtered schedule based on search term, tracks, rooms, and favorites
  const filteredSchedule = scheduleData.filter(event => {
    const matchesSearch = searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = selectedTracks.length === 0 ||
      selectedTracks.includes(event.track);

    const matchesRoom = selectedRooms.length === 0 ||
      selectedRooms.includes(event.room);

    const isFavorite = favorites.includes(event.id);

    const matchesFavoritesFilter = !showFavoritesOnly || isFavorite;

    return matchesSearch && matchesTrack && matchesRoom && matchesFavoritesFilter;
  });

  // Calculate session statistics
  const calculateStats = () => {
    const stats = {
      totalSessions: scheduleData.length,
      totalAttendance: Object.values(attendance).filter(Boolean).length,
      averageRating: 0,
      popularSessions: [],
      topRatedSessions: [],
      upcomingSessions: []
    };

    // Calculate average ratings
    const ratings = Object.values(detailedRating);
    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => {
        return sum + (
          (rating.contentQuality || 0) +
          (rating.speakerPerformance || 0) +
          (rating.overallExperience || 0)
        ) / 3;
      }, 0);
      stats.averageRating = (totalRating / ratings.length).toFixed(1);
    }

    // Get popular sessions (based on attendance and ratings)
    stats.popularSessions = scheduleData
      .filter(session => attendance[session.id] || detailedRating[session.id])
      .sort((a, b) => {
        const aScore = (attendance[a.id] ? 1 : 0) + (detailedRating[a.id]?.overallExperience || 0);
        const bScore = (attendance[b.id] ? 1 : 0) + (detailedRating[b.id]?.overallExperience || 0);
        return bScore - aScore;
      })
      .slice(0, 3);

    // Get top rated sessions
    stats.topRatedSessions = scheduleData
      .filter(session => detailedRating[session.id])
      .sort((a, b) => {
        const aRating = detailedRating[a.id]?.overallExperience || 0;
        const bRating = detailedRating[b.id]?.overallExperience || 0;
        return bRating - aRating;
      })
      .slice(0, 3);

    // Get upcoming sessions
    const now = new Date();
    stats.upcomingSessions = scheduleData
      .filter(session => new Date(session.time) > now)
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .slice(0, 3);

    return stats;
  };

  // Handle rich text formatting
  const handleFormat = (format) => {
    const textarea = document.getElementById('richTextArea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${text.substring(start, end)}**`;
        break;
      case 'italic':
        formattedText = `*${text.substring(start, end)}*`;
        break;
      case 'underline':
        formattedText = `__${text.substring(start, end)}__`;
        break;
      case 'bullet':
        formattedText = `\n- ${text.substring(start, end)}`;
        break;
      case 'number':
        formattedText = `\n1. ${text.substring(start, end)}`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `[${text.substring(start, end)}](${url})`;
        }
        break;
      default:
        formattedText = text.substring(start, end);
    }

    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setSessionNotes(prev => ({
      ...prev,
      [selectedEventForShare.id]: newText
    }));
  };

  return (
    <ScheduleContainer>
      <Title>Conference Schedule</Title>

      <Controls>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterSection>
          <FavoritesFilter
            active={showFavoritesOnly}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <FaHeart /> {showFavoritesOnly ? 'All Sessions' : 'Favorites'}
          </FavoritesFilter>
          <FilterButton onClick={() => setShowFilters(true)}>
            <FaFilter /> Filters
          </FilterButton>
          <ActionButton onClick={() => setShowDashboard(true)}>
            <FaChartBar /> Statistics
          </ActionButton>
        </FilterSection>
      </Controls>

      <DaySelector>
        {conferenceDates.map((date, index) => (
          <DayButton
            key={index}
            onClick={() => setSelectedDay(index)}
            active={selectedDay === index}
          >
            {formatDate(date)}
          </DayButton>
        ))}
      </DaySelector>

      {loading ? (
        <div>Loading schedule...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Timeline>
          {filteredSchedule.map((event) => (
            <Event key={event.id} align={event.align}>
              <EventContent
                align={event.align}
                onClick={() => setSelectedEvent(event)}
              >
                {event.popularity > 80 && (
                  <PopularityBadge>
                    <FaUsers /> Popular
                  </PopularityBadge>
                )}
                <EventTime>{event.time}</EventTime>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription expanded={expandedEvent === event.id}>
                  {event.description}
                </EventDescription>
                <EventDetails expanded={expandedEvent === event.id}>
                  <p><strong>Track:</strong> {event.track}</p>
                  <p><strong>Room:</strong> {event.room}</p>
                  <p><strong>Speaker:</strong> {event.speaker}</p>
                  <EventStats>
                    {renderStars(event.id)}
                    <BookmarkButton
                      active={favorites.includes(event.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(event.id);
                      }}
                    >
                      {favorites.includes(event.id) ? <FaBookmark /> : <FaRegBookmark />}
                    </BookmarkButton>
                  </EventStats>
                  <NotesSection>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>My Notes</strong>
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNotes(editingNotes === event.id ? null : event.id);
                        }}
                      >
                        <FaEdit /> {editingNotes === event.id ? 'Save' : 'Edit'}
                      </ActionButton>
                    </div>
                    {editingNotes === event.id ? (
                      <NotesTextarea
                        value={notes[event.id] || ''}
                        onChange={(e) => handleNotesChange(event.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Add your notes here..."
                      />
                    ) : (
                      <p>{notes[event.id] || 'No notes yet'}</p>
                    )}
                  </NotesSection>
                  <EventActions>
                    <ActionButton onClick={(e) => {
                      e.stopPropagation();
                      setExpandedEvent(expandedEvent === event.id ? null : event.id);
                    }}>
                      {expandedEvent === event.id ? 'Show Less' : 'Show More'}
                    </ActionButton>
                    <ActionButton onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCalendar(event);
                    }}>
                      <FaCalendarPlus /> Add to Calendar
                    </ActionButton>
                    <ActionButton onClick={(e) => {
                      e.stopPropagation();
                      handleShare(event);
                    }}>
                      <FaShare /> Share
                    </ActionButton>
                    <ActionButton onClick={(e) => {
                      e.stopPropagation();
                      handleShowQRCode(event);
                    }}>
                      <FaQrcode /> QR Code
                    </ActionButton>
                    <NotificationButton
                      active={reminders[event.id]}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReminder(event.id);
                        if (notificationSettings.sendEmail) {
                          handleEmailNotification(event.id);
                        }
                      }}
                    >
                      {reminders[event.id] ? <FaBell /> : <FaRegBell />}
                      {reminders[event.id] ? 'Reminder Set' : 'Set Reminder'}
                    </NotificationButton>
                    <AttendanceButton
                      active={attendance[event.id]}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAttendance(event.id);
                      }}
                    >
                      {attendance[event.id] ? <FaCheckCircle /> : <FaRegCheckCircle />}
                      {attendance[event.id] ? 'Attending' : 'Mark Attendance'}
                    </AttendanceButton>
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRating(true);
                        setSelectedEventForShare(event);
                      }}
                    >
                      <FaStar /> Rate Session
                    </ActionButton>
                  </EventActions>
                  <CommentsSection>
                    <h4><FaComments /> Comments</h4>
                    <CommentList>
                      {(comments[event.id] || []).map(comment => (
                        <CommentItem key={comment.id}>
                          <CommentAuthor>{comment.author}</CommentAuthor>
                          <CommentText>{comment.text}</CommentText>
                          <CommentTime>
                            {new Date(comment.timestamp).toLocaleTimeString()}
                          </CommentTime>
                          <ReactionButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReaction(event.id, 'like');
                            }}
                          >
                            <FaThumbsUp />
                            <ReactionCount>
                              {(reactions[event.id]?.likes || 0)}
                            </ReactionCount>
                          </ReactionButton>
                          <ActionButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setReplyingTo(comment.id);
                            }}
                          >
                            <FaReply /> Reply
                          </ActionButton>
                          <ReplySection>
                            {(replies[event.id] || [])
                              .filter(reply => reply.parentCommentId === comment.id)
                              .map(reply => (
                                <ReplyItem key={reply.id}>
                                  <CommentAuthor>{reply.author}</CommentAuthor>
                                  <CommentText>{reply.text}</CommentText>
                                  <CommentTime>
                                    {new Date(reply.timestamp).toLocaleTimeString()}
                                  </CommentTime>
                                </ReplyItem>
                              ))}
                            {replyingTo === comment.id && (
                              <ReplyInput>
                                <input
                                  type="text"
                                  placeholder="Write a reply..."
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddReply(comment.id, event.id);
                                  }}
                                >
                                  Reply
                                </button>
                              </ReplyInput>
                            )}
                          </ReplySection>
                        </CommentItem>
                      ))}
                    </CommentList>
                    <CommentInput>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddComment(event.id);
                        }}
                      >
                        Post
                      </button>
                    </CommentInput>
                  </CommentsSection>
                </EventDetails>
              </EventContent>
            </Event>
          ))}
        </Timeline>
      )}

      {selectedEvent && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedEvent(null)}>
              <FaTimes />
            </CloseButton>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Track:</strong> {selectedEvent.track}</p>
            <p><strong>Room:</strong> {selectedEvent.room}</p>
            <p><strong>Speaker:</strong> {selectedEvent.speaker}</p>
            <p>{selectedEvent.details}</p>
            <EventStats>
              {renderStars(selectedEvent.id)}
              <BookmarkButton
                active={favorites.includes(selectedEvent.id)}
                onClick={() => handleFavorite(selectedEvent.id)}
              >
                {favorites.includes(selectedEvent.id) ? <FaBookmark /> : <FaRegBookmark />}
              </BookmarkButton>
            </EventStats>
            <NotesSection>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>My Notes</strong>
                <ActionButton
                  onClick={() => setEditingNotes(editingNotes === selectedEvent.id ? null : selectedEvent.id)}
                >
                  <FaEdit /> {editingNotes === selectedEvent.id ? 'Save' : 'Edit'}
                </ActionButton>
              </div>
              {editingNotes === selectedEvent.id ? (
                <NotesTextarea
                  value={notes[selectedEvent.id] || ''}
                  onChange={(e) => handleNotesChange(selectedEvent.id, e.target.value)}
                  placeholder="Add your notes here..."
                />
              ) : (
                <p>{notes[selectedEvent.id] || 'No notes yet'}</p>
              )}
            </NotesSection>
            <EventActions>
              <ActionButton onClick={() => handleAddToCalendar(selectedEvent)}>
                <FaCalendarPlus /> Add to Calendar
              </ActionButton>
            </EventActions>
            <NotesEditor>
              <h3>Session Notes</h3>
              <Toolbar>
                <ToolbarButton onClick={() => handleFormat('bold')}>
                  <FaBold />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleFormat('italic')}>
                  <FaItalic />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleFormat('underline')}>
                  <FaUnderline />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleFormat('bullet')}>
                  <FaListUl />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleFormat('number')}>
                  <FaListOl />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleFormat('link')}>
                  <FaLink />
                </ToolbarButton>
              </Toolbar>
              <RichTextArea
                id="richTextArea"
                value={sessionNotes[selectedEvent.id] || ''}
                onChange={(e) => setSessionNotes(prev => ({
                  ...prev,
                  [selectedEvent.id]: e.target.value
                }))}
                placeholder="Add your notes here..."
              />
              <NotesPreview>
                <h4>Preview</h4>
                <div dangerouslySetInnerHTML={{
                  __html: marked(sessionNotes[selectedEvent.id] || '')
                }} />
              </NotesPreview>
            </NotesEditor>
          </ModalContent>
        </Modal>
      )}

      {showShareModal && selectedEventForShare && (
        <ShareModal>
          <ShareContent>
            <CloseButton onClick={() => setShowShareModal(false)}>
              <FaTimes />
            </CloseButton>
            <h3>Share "{selectedEventForShare.title}"</h3>
            <ShareOptions>
              <ShareButton onClick={() => handleShareOption('twitter')}>
                Twitter
              </ShareButton>
              <ShareButton onClick={() => handleShareOption('linkedin')}>
                LinkedIn
              </ShareButton>
              <ShareButton onClick={() => handleShareOption('facebook')}>
                Facebook
              </ShareButton>
            </ShareOptions>
          </ShareContent>
        </ShareModal>
      )}

      {showQRCode && selectedEventForShare && (
        <QRCodeModal>
          <QRCodeContent>
            <CloseButton onClick={() => setShowQRCode(false)}>
              <FaTimes />
            </CloseButton>
            <h3>Scan to view session details</h3>
            <QRCodeImage
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                `${window.location.origin}/schedule/${selectedEventForShare.id}`
              )}`}
              alt="Session QR Code"
            />
            <p>{selectedEventForShare.title}</p>
          </QRCodeContent>
        </QRCodeModal>
      )}

      {showFeedback && selectedEventForShare && (
        <FeedbackModal>
          <FeedbackContent>
            <CloseButton onClick={() => setShowFeedback(false)}>
              <FaTimes />
            </CloseButton>
            <h3>How was the session?</h3>
            <FeedbackOptions>
              <FeedbackButton onClick={() => handleFeedback(selectedEventForShare.id, 'good')}>
                <FaSmile /> Good
              </FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback(selectedEventForShare.id, 'neutral')}>
                <FaMeh /> Neutral
              </FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback(selectedEventForShare.id, 'bad')}>
                <FaFrown /> Bad
              </FeedbackButton>
            </FeedbackOptions>
          </FeedbackContent>
        </FeedbackModal>
      )}

      {showRating && selectedEventForShare && (
        <RatingModal>
          <RatingContent>
            <CloseButton onClick={() => setShowRating(false)}>
              <FaTimes />
            </CloseButton>
            <h3>Rate "{selectedEventForShare.title}"</h3>
            <RatingInput>
              <RatingLabel>Content Quality</RatingLabel>
              <RatingStars>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarButton
                    key={star}
                    active={star <= (detailedRating[selectedEventForShare.id]?.contentQuality || 0)}
                    onClick={() => handleDetailedRating(selectedEventForShare.id, 'contentQuality', star)}
                  >
                    {star <= (detailedRating[selectedEventForShare.id]?.contentQuality || 0) ? <FaStar /> : <FaRegStar />}
                  </StarButton>
                ))}
              </RatingStars>
            </RatingInput>
            <RatingInput>
              <RatingLabel>Speaker Performance</RatingLabel>
              <RatingStars>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarButton
                    key={star}
                    active={star <= (detailedRating[selectedEventForShare.id]?.speakerPerformance || 0)}
                    onClick={() => handleDetailedRating(selectedEventForShare.id, 'speakerPerformance', star)}
                  >
                    {star <= (detailedRating[selectedEventForShare.id]?.speakerPerformance || 0) ? <FaStar /> : <FaRegStar />}
                  </StarButton>
                ))}
              </RatingStars>
            </RatingInput>
            <RatingInput>
              <RatingLabel>Overall Experience</RatingLabel>
              <RatingStars>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarButton
                    key={star}
                    active={star <= (detailedRating[selectedEventForShare.id]?.overallExperience || 0)}
                    onClick={() => handleDetailedRating(selectedEventForShare.id, 'overallExperience', star)}
                  >
                    {star <= (detailedRating[selectedEventForShare.id]?.overallExperience || 0) ? <FaStar /> : <FaRegStar />}
                  </StarButton>
                ))}
              </RatingStars>
            </RatingInput>
            <RatingSubmit onClick={() => setShowRating(false)}>
              Submit Rating
            </RatingSubmit>
          </RatingContent>
        </RatingModal>
      )}

      {showDashboard && (
        <DashboardModal>
          <DashboardContent>
            <CloseButton onClick={() => setShowDashboard(false)}>
              <FaTimes />
            </CloseButton>
            <h2>Session Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <StatCard>
                <StatValue>{calculateStats().totalSessions}</StatValue>
                <StatLabel>Total Sessions</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{calculateStats().totalAttendance}</StatValue>
                <StatLabel>Total Attendance</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{calculateStats().averageRating}</StatValue>
                <StatLabel>Average Rating</StatLabel>
              </StatCard>
            </div>

            <h3>Popular Sessions</h3>
            <ChartContainer>
              {calculateStats().popularSessions.map(session => (
                <div key={session.id} style={{ marginBottom: '1rem' }}>
                  <strong>{session.title}</strong>
                  <p>Attendance: {attendance[session.id] ? 'Yes' : 'No'}</p>
                  <p>Rating: {detailedRating[session.id]?.overallExperience || 'Not rated'}</p>
                </div>
              ))}
            </ChartContainer>

            <h3>Top Rated Sessions</h3>
            <ChartContainer>
              {calculateStats().topRatedSessions.map(session => (
                <div key={session.id} style={{ marginBottom: '1rem' }}>
                  <strong>{session.title}</strong>
                  <p>Rating: {detailedRating[session.id]?.overallExperience}/5</p>
                </div>
              ))}
            </ChartContainer>

            <h3>Upcoming Sessions</h3>
            <ChartContainer>
              {calculateStats().upcomingSessions.map(session => (
                <div key={session.id} style={{ marginBottom: '1rem' }}>
                  <strong>{session.title}</strong>
                  <p>Time: {session.time}</p>
                </div>
              ))}
            </ChartContainer>
          </DashboardContent>
        </DashboardModal>
      )}

      <NotificationSettings>
        <h3>Notification Settings</h3>
        <NotificationOption>
          <label>Email Address:</label>
          <input
            type="email"
            value={notificationSettings.email}
            onChange={(e) => handleNotificationSettings('email', e.target.value)}
            placeholder="Enter your email"
          />
        </NotificationOption>
        <NotificationOption>
          <label>Reminder Time:</label>
          <select
            value={notificationSettings.reminderTime}
            onChange={(e) => handleNotificationSettings('reminderTime', e.target.value)}
          >
            <option value="5">5 minutes before</option>
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
          </select>
        </NotificationOption>
        <NotificationOption>
          <label>
            <input
              type="checkbox"
              checked={notificationSettings.sendEmail}
              onChange={(e) => handleNotificationSettings('sendEmail', e.target.checked)}
            />
            Send email notifications
          </label>
        </NotificationOption>
      </NotificationSettings>

      <FilterModal show={showFilters}>
        <FilterContent>
          <CloseButton onClick={() => setShowFilters(false)}>
            <FaTimes />
          </CloseButton>
          <h2>Filter Sessions</h2>
          
          <FilterGroup>
            <FilterLabel>Tracks</FilterLabel>
            {tracks.map(track => (
              <div key={track}>
                <FilterCheckbox
                  type="checkbox"
                  id={`track-${track}`}
                  checked={selectedTracks.includes(track)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTracks([...selectedTracks, track]);
                    } else {
                      setSelectedTracks(selectedTracks.filter(t => t !== track));
                    }
                  }}
                />
                <label htmlFor={`track-${track}`}>{track}</label>
              </div>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Rooms</FilterLabel>
            {rooms.map(room => (
              <div key={room}>
                <FilterCheckbox
                  type="checkbox"
                  id={`room-${room}`}
                  checked={selectedRooms.includes(room)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRooms([...selectedRooms, room]);
                    } else {
                      setSelectedRooms(selectedRooms.filter(r => r !== room));
                    }
                  }}
                />
                <label htmlFor={`room-${room}`}>{room}</label>
              </div>
            ))}
          </FilterGroup>
        </FilterContent>
      </FilterModal>
    </ScheduleContainer>
  );
};

export default Schedule; 