import React, { useState } from 'react';
import axios from 'axios';

const MessageSender = () => {
  const [messageType, setMessageType] = useState('');  // 'email' or 'sms'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMessageTypeChange = (e) => {
    setMessageType(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!messageType || !message) {
      setError('Please select a message type and write a message.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = messageType === 'email' ? '/send-email' : '/send-sms';

      const response = await axios.post(`http://127.0.0.1:5000/admin/${apiUrl}`, { message });

      if (response.data.success) {
        alert(`${messageType.charAt(0).toUpperCase() + messageType.slice(1)} sent successfully to all students!`);
      } else {
        setError('Something went wrong while sending the message.');
      }
    } catch (err) {
      setError('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Send Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="email"
              checked={messageType === 'email'}
              onChange={handleMessageTypeChange}
            />
            Send Email
          </label>
          <label>
            <input
              type="radio"
              value="sms"
              checked={messageType === 'sms'}
              onChange={handleMessageTypeChange}
            />
            Send SMS
          </label>
        </div>

        {messageType && (
          <div>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder={`Enter your ${messageType === 'email' ? 'email' : 'SMS'} message`}
              rows="4"
              cols="50"
            />
          </div>
        )}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : `Send ${messageType.charAt(0).toUpperCase() + messageType.slice(1)}`}
          </button>
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </main>
  );
};

export default MessageSender;
