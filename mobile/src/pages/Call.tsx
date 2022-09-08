import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {SocketContext} from '../contexts/SocketContext';
import {RTCView} from 'react-native-webrtc';
import {Options} from '../components/Options';

export const Call = () => {
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} =
    useContext(SocketContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <Options />
        <Text>Call</Text>
        {stream && (
          <View>
            <Text>{name || 'Você'}</Text>
            <RTCView
              /* ref={myVideo}
               */
              style={{
                width: 200,
                height: 200,
              }}
              mirror
              objectFit={'cover'}
              streamURL={stream.id}
              zOrder={0}
            />
          </View>
        )}
        {/* {callAccepted && !callEnded && (
          <View>
            <Text>{call.name || 'Remote Stream'}</Text>
            <RTCView
              mirror
              objectFit={'cover'}
              streamURL={userVideo.current.srcObject.toURL()}
              zOrder={0}
            />
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};
