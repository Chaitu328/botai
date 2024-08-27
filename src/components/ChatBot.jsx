import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import humanImg from "./assets/human.png";
import robotImg from "./assets/robot.png";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { format } from 'date-fns';

const ChatBot = ({ data, view, onViewChange }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackType, setFeedbackType] = useState('');

    useEffect(() => {
        if (view === 'past') {
            const savedHistory = localStorage.getItem('chatHistory');
            if (savedHistory) {
                setChatHistory(JSON.parse(savedHistory));
            }
        } else if (view === 'chat') {
            setChatHistory([]);
            setInput('');
            setShowIntro(true);
            localStorage.removeItem('chatHistory');
        }
    }, [view]);

    const handleSend = (question) => {
        const userInput = question || input;
        if (userInput.trim()) {
            const lowercasedInput = userInput.trim().toLowerCase();
            console.log("User Input:", lowercasedInput); // Debugging

            // Find the matched response
            const matchedResponse = data.find(item =>
                item.question.toLowerCase().trim() === lowercasedInput
            );

            console.log("Matched Response:", matchedResponse); // Debugging

            // Determine bot response
            const botResponse = matchedResponse ? matchedResponse.response : "Sorry, I don't have an answer for that.";
            const timestamp = format(new Date(), 'hh:mm a'); // Current time

            const updatedChatHistory = [
                ...chatHistory,
                { type: 'user', text: userInput, time: timestamp },
                { type: 'bot', text: botResponse, time: timestamp }
            ];

            setChatHistory(updatedChatHistory);
            setInput('');
            setShowIntro(false);

            // Save chat history
            localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
        }
    };

    const handleSaveFeedback = () => {
        console.log('Chat History:', chatHistory);
        // Save chat history to local storage or backend
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    };

    const handleOpenFeedbackDialog = (index, type) => {
        setCurrentFeedbackIndex(index);
        setFeedbackType(type);
        setFeedbackDialogOpen(true);
    };

    const handleCloseFeedbackDialog = () => {
        setFeedbackDialogOpen(false);
        setCurrentFeedbackIndex(null);
        setFeedbackText('');
    };

    const handleFeedbackSubmit = () => {
        if (currentFeedbackIndex !== null && feedbackText.trim()) {
            const updatedChatHistory = [...chatHistory];
            updatedChatHistory[currentFeedbackIndex].feedback = {
                type: feedbackType,
                text: feedbackText.trim()
            };
            setChatHistory(updatedChatHistory);
            localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
        }
        handleCloseFeedbackDialog();
    };

    const quickQuestions = [
        "Hi, what is the weather",
        "Hi, what is my location",
        "Hi, what is the temperature",
        "Hi, how are you"
    ];

    return (
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#FAF4FF' }}>
            {view === 'chat' && (
                <>
                    {!showIntro ? (
                        <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto', p: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#FFFFFF' }}>
                            {chatHistory.map((msg, index) => (
                                <Box key={index} sx={{ my: 1, display: 'flex', alignItems: 'flex-start', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                                    <img src={msg.type === 'user' ? humanImg : robotImg} alt={msg.type} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 1 }} />
                                    <Box>
                                        <Typography sx={{
                                            maxWidth: '75%',
                                            bgcolor: msg.type === 'user' ? '#DCF8C6' : '#ECECEC',
                                            display: 'inline-block',
                                            p: 2,
                                            borderRadius: 2,
                                            wordWrap: 'break-word',
                                            mb: 1,
                                        }}>
                                            {msg.text}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {msg.time}
                                        </Typography>
                                        {msg.type === 'bot' && msg.feedback && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                Feedback: {msg.feedback.text}
                                            </Typography>
                                        )}
                                        {msg.type === 'bot' && !msg.feedback && (
                                            <Box sx={{ display: 'flex', mt: 1 }}>
                                                <IconButton onClick={() => handleOpenFeedbackDialog(index, 'like')} sx={{ mr: 1 }}>
                                                    <ThumbUpIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleOpenFeedbackDialog(index, 'dislike')}>
                                                    <ThumbDownIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom>
                                How Can I Help You Today?
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <img src={robotImg} alt="logo" style={{ width: 100, height: 100 }} />
                            </Box>
                            <Grid container spacing={2} justifyContent="center">
                                {quickQuestions.map((question, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card sx={{
                                            p: 2,
                                            bgcolor: '#FFFFFF',
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            boxShadow: 1,
                                        }}
                                            onClick={() => handleSend(question)}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {question}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Get immediate AI generated response
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, width: '100%' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            sx={{ flex: 1, mr: 2 }}
                        />
                        <Button variant="contained" onClick={() => handleSend()} sx={{ mr: 2 }}>
                            Ask
                        </Button>
                        <Button variant="outlined" onClick={handleSaveFeedback}>
                            Save
                        </Button>
                    </Box>
                </>
            )}

            {view === 'past' && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Past Conversations
                    </Typography>
                    <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto', p: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#FFFFFF' }}>
                        {chatHistory.map((msg, index) => (
                            <Box key={index} sx={{ my: 1, display: 'flex', alignItems: 'flex-start', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                                <img src={msg.type === 'user' ? humanImg : robotImg} alt={msg.type} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 1 }} />
                                <Box>
                                    <Typography sx={{
                                        maxWidth: '75%',
                                        bgcolor: msg.type === 'user' ? '#DCF8C6' : '#ECECEC',
                                        display: 'inline-block',
                                        p: 2,
                                        borderRadius: 2,
                                        wordWrap: 'break-word',
                                        mb: 1,
                                    }}>
                                        {msg.text}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {msg.time}
                                    </Typography>
                                    {msg.type === 'bot' && msg.feedback && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Feedback: {msg.feedback.text}
                                        </Typography>
                                    )}
                                    {msg.type === 'bot' && !msg.feedback && (
                                        <Box sx={{ display: 'flex', mt: 1 }}>
                                            <IconButton onClick={() => handleOpenFeedbackDialog(index, 'like')} sx={{ mr: 1 }}>
                                                <ThumbUpIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenFeedbackDialog(index, 'dislike')}>
                                                <ThumbDownIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mt: 2, cursor: 'pointer', textAlign: 'center' }} onClick={() => onViewChange('chat')}>
                        <Typography variant="h6">
                            Back to Current Chat
                        </Typography>
                    </Box>
                </>
            )}

            <Dialog open={feedbackDialogOpen} onClose={handleCloseFeedbackDialog}>
                <DialogTitle>Provide Additional Feedback</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LightbulbIcon sx={{ fontSize: 40, mr: 2 }} />
                        <TextField
                            autoFocus
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            placeholder="Type your feedback here..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFeedbackSubmit} color="primary">
                        Submit
                    </Button>
                    <Button onClick={handleCloseFeedbackDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChatBot;
