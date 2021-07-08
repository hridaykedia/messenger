import React, { useState, useEffect } from 'react';
import { FormControl, Input, IconButton } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('please enter a username'));
  }, []);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessages = (e) => {
    e.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <>
      <div className='App'>
        <h1>Messenger</h1>
        <form className='app__form'>
          <FormControl className='app__formControl'>
            <Input
              className='app__input'
              placeholder='Enter a message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              className='app__iconButton'
              disabled={!input}
              variant='contained'
              color='primary'
              type='submit'
              onClick={sendMessages}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>
    </>
  );
}

export default App;
