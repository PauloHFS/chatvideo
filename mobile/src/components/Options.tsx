import {View, Text, TextInput, Button} from 'react-native';
import React, {useContext, useState} from 'react';
import {SocketContext} from '../contexts/SocketContext';

export const Options = () => {
  const {me, name, setName, callAccepted, callEnded, leaveCall, callUser} =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <View>
      <View>
        <Text>ID:</Text>
        <Text>{me}</Text>
      </View>
      <View>
        <Text>Name:</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{borderColor: 'black', borderWidth: 2, margin: 4}}
        />
      </View>
      <View>
        <Text>ID to Call:</Text>
        <TextInput
          value={idToCall}
          onChangeText={text => setIdToCall(text)}
          style={{borderColor: 'black', borderWidth: 2, margin: 4}}
        />
      </View>
      {callAccepted && !callEnded ? (
        <Button onPress={leaveCall} title="Hang Up" />
      ) : (
        <Button onPress={() => callUser(idToCall)} title="Call" />
      )}
    </View>
  );
};
