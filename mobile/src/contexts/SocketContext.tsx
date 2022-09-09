import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import RNSimplePeer from 'react-native-simple-peer';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {createPeer} from '../services/WebRTC';

const SocketContext = createContext();

const socket = io('https://node-video-api.herokuapp.com');

let myVideo = null;
let userVideo = null;
let connectionRef = null;

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(currentStream => {
        setStream(currentStream);
        myVideo = currentStream;
      })
      .catch(error => console.log(error));

    socket.on('me', id => {
      console.log(id);
      setMe(id);
    });

    socket.on('calluser', ({from, name: callerName, signal}) => {
      setCall({isReceivedCall: true, from, name: callerName, signal});
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = createPeer({stream, initiator: false});

    peer.on('signal', data => {
      socket.emit('answercall', {signal: data, to: call.from});
    });

    peer.on('stream', stream => {
      userVideo = stream;
      if (stream.currentTarget && stream.currentTarget._remoteStreams) {
        userVideo = stream.currentTarget._remoteStreams[0];
      }
    });

    peer.signal(call.signal);

    connectionRef = peer;
  };

  const callUser = id => {
    try {
      const peer = createPeer({stream, initiator: true});

      peer.on('signal', data => {
        socket.emit('calluser', {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });

      peer.on('stream', currentStream => {
        userVideo = currentStream;
      });

      socket.on('callaccepted', signal => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef = peer;
    } catch (error) {
      console.log(error);
    }
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef) connectionRef.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext};
