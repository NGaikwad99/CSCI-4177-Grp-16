import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import "../styles/MeetingScheduler.css";

function MeetingScheduler() {
    const location = useLocation();
    const userType = location.state?.userType || "Therapist";
    console.log('Location state:', location.state); 
    console.log('User Type:', userType); 

    const [meetingType, setMeetingType] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [rescheduleIndex, setRescheduleIndex] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const [patients, setPatients] = useState([]);
    const [therapists, setTherapists] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            const users = response.data.users;

            const filteredUsers = users.filter(user => user.role);

            if (userType === 'Therapist') {
                setPatients(filteredUsers.filter(user => user.role === 'patient'));
            } else {
                setTherapists(filteredUsers.filter(user => user.role === 'therapist'));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [userType]);

    const fetchUpcomingMeetings = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/meetings/user/${userType.toLowerCase()}`);
            setUpcomingMeetings(response.data);
        } catch (error) {
            console.error('Error fetching upcoming meetings:', error);
        }
    }, [userType]);

    useEffect(() => {
        fetchUsers();
        fetchUpcomingMeetings();
    }, [fetchUsers, fetchUpcomingMeetings]);

    const handleScheduleMeeting = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!meetingType) {
            setAlertMessage('Please select a meeting type.');
            return;
        }
        if (!selectedPerson) {
            setAlertMessage(`Please select a ${userType === 'Therapist' ? 'patient' : 'therapist'}.`);
            return;
        }
        if (selectedDate < today) {
            setAlertMessage('Please select a valid date.');
            return;
        }

        const newMeetingDate = selectedDate.toLocaleDateString();
        const isDuplicate = upcomingMeetings.some(
            (meeting, index) => 
                meeting.date === newMeetingDate && 
                meeting.person === selectedPerson &&
                index !== rescheduleIndex
        );

        if (isDuplicate) {
            setAlertMessage('The same person cannot book an appointment on the same day twice.');
            return;
        }

        const newMeeting = {
            date: newMeetingDate,
            person: selectedPerson,
            type: meetingType,
            userType
        };

        try {
            if (isRescheduling) {
                const response = await axios.put(`http://localhost:3001/meetings/reschedule/${upcomingMeetings[rescheduleIndex]._id}`, newMeeting);
                const updatedMeetings = [...upcomingMeetings];
                updatedMeetings[rescheduleIndex] = response.data;
                setUpcomingMeetings(updatedMeetings);
                setIsRescheduling(false);
                setRescheduleIndex(null);
            } else {
                const response = await axios.post('http://localhost:3001/meetings/schedule', newMeeting);
                setUpcomingMeetings([...upcomingMeetings, response.data]);
            }
            setShowPrompt(false);
            setAlertMessage('Meeting successfully booked.');
        } catch (error) {
            console.error('Error scheduling meeting:', error);
            setAlertMessage('Error scheduling meeting.');
        }
    };

    const handleReschedule = (index) => {
        const meeting = upcomingMeetings[index];
        setSelectedDate(new Date(meeting.date));
        setMeetingType(meeting.type);
        setSelectedPerson(meeting.person);
        setIsRescheduling(true);
        setRescheduleIndex(index);
        setShowPrompt(true);
    };

    const handleCancel = async (index) => {
        try {
            await axios.delete(`http://localhost:3001/meetings/cancel/${upcomingMeetings[index]._id}`);
            const updatedMeetings = upcomingMeetings.filter((_, i) => i !== index);
            setUpcomingMeetings(updatedMeetings);
        } catch (error) {
            console.error('Error canceling meeting:', error);
            setAlertMessage('Error canceling meeting.');
        }
    };

    const visibleMeetings = showMore ? upcomingMeetings : upcomingMeetings.slice(0, 2);

    return (
        <div className="main-cont">
            <div className="left-section">
                <div className="meeting-scheduler">
                    <div className="flex-con">
                        <h2>Meeting Scheduler</h2>
                        <p>Schedule and manage your meetings</p>
                    </div>
                </div>
                <div className="calendar">
                    <Calendar
                        className="custom-calendar-main"
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileContent={({ date, view }) => {
                            const formattedDate = date.toLocaleDateString();
                            const hasMeeting = upcomingMeetings.some(meeting => meeting.date === formattedDate);
                            return hasMeeting ? <div className="dot"></div> : null;
                        }}
                    />
                </div>
            </div>
            <div className="upcoming">
                <div className="upcomingMeetingsGrid">
                    <div className='headerTextUpcoming'>
                        <h2 className='headerUpcoming'>Upcoming meetings</h2>
                    </div>
                    {visibleMeetings.map((meeting, index) => (
                        <div className="meeting" key={index}>
                            <h3>{meeting.date}</h3>
                            <p>{meeting.person}</p>
                            <p>{meeting.type}</p>
                            <div className="meeting-buttons">
                                <button className="reschedule-btn" onClick={() => handleReschedule(index)}>Reschedule</button>
                                <button className="cancel-btn" onClick={() => handleCancel(index)}>Cancel</button>
                            </div>
                        </div>
                    ))}
                    {upcomingMeetings.length > 2 && (
                        <button className="load-more-btn" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show Less' : 'Load More'}
                        </button>
                    )}
                    <button className="schedule-btn" onClick={() => setShowPrompt(true)}>Schedule a Meeting</button>
                </div>
            </div>
            {showPrompt && (
                <div className="prompt">
                    <div className="prompt-content">
                        <h3>Meeting Type</h3>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="impromptu"
                                name="meetingType"
                                value="Impromptu"
                                onChange={(e) => setMeetingType(e.target.value)}
                                checked={meetingType === 'Impromptu'}
                            />
                            <label htmlFor="impromptu">Impromptu</label>
                            <input
                                type="radio"
                                id="oneOnOne"
                                name="meetingType"
                                value="One-on-One"
                                onChange={(e) => setMeetingType(e.target.value)}
                                checked={meetingType === 'One-on-One'}
                            />
                            <label htmlFor="oneOnOne">One-on-One</label>
                        </div>
                        <h3>Select {userType === 'Therapist' ? 'Patient' : 'Therapist'}</h3>
                        <select onChange={(e) => setSelectedPerson(e.target.value)} value={selectedPerson}>
                            <option value="">Select</option>
                            {(userType === 'Therapist' ? patients : therapists).map((person, index) => (
                                <option key={index} value={person.name}>{person.name}</option>
                            ))}
                        </select>
                        <div className="calendar-prompt">
                            <Calendar
                                className="custom-calendar-prompt"
                                onChange={setSelectedDate}
                                value={selectedDate}
                                tileContent={({ date, view }) => {
                                    const formattedDate = date.toLocaleDateString();
                                    const hasMeeting = upcomingMeetings.some(meeting => meeting.date === formattedDate);
                                    return hasMeeting ? <div className="dot"></div> : null;
                                }}
                            />
                        </div>
                        <button className="schedule-btn" onClick={handleScheduleMeeting}>Schedule</button>
                    </div>
                </div>
            )}
            {alertMessage && (
                <div className="alert">
                    <p>{alertMessage}</p>
                    <button onClick={() => setAlertMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
}

export default MeetingScheduler;