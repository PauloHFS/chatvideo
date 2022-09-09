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
        {myVideo && (
          <View>
            <Text>{name || 'Você'}</Text>
            <RTCView
              /* ref={myVideo}
               */
              style={{
                width: 400,
                height: 400,
              }}
              mirror
              objectFit={'cover'}
              streamURL={myVideo.id}
              zOrder={0}
            />
          </View>
        )}
        {userVideo && callAccepted && !callEnded && (
          <View>
            <Text>{call.name || 'Remote Stream'}</Text>
            <RTCView
              style={{
                width: 400,
                height: 400,
              }}
              mirror
              objectFit={'cover'}
              streamURL={userVideo.id}
              zOrder={0}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
