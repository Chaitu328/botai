import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';

const FeedbackModal = ({ open, onSave }) => {
    const [feedback, setFeedback] = useState('');

    return (
        <Modal open={open} onClose={onSave}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 10, width: 300 }}>
                <Typography variant="h6" gutterBottom>
                    Feedback
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={onSave}>
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default FeedbackModal;
