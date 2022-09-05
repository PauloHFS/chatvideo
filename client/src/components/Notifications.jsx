import React from 'react';
import {
  Button
} from '@material-ui/core';

import { SocketContext } from '../SocketContext';
import { useContext } from 'react';

export default function Notifications() {
  const {
    answerCall, call, callAccepted
  }  = useContext(SocketContext); 
  
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <h1>{call.name} is calling...</h1>
          <Button variant='contained' color='primary' onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};