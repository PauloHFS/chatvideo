import RNSimplePeer from 'react-native-simple-peer';
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

export const getLocalStream = (): Promise<MediaStream> =>
  new Promise((resolve, reject) => {
    mediaDevices
      .enumerateDevices()
      .then((sourceInfos: any) => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind === 'videoinput' &&
            sourceInfo.facing === 'front'
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        mediaDevices
          .getUserMedia({
            audio: true,
            video: {
              width: 640,
              height: 480,
              frameRate: 30,
              facingMode: 'user',
              deviceId: videoSourceId,
            },
          })
          .then(stream => {
            resolve(stream as MediaStream);
          })
          .catch(error => {
            reject({message: 'Local Stream fetch error', error});
          });
      })
      .catch(error => {
        reject({message: 'Device List fetch error', error});
      });
  });

//   TODO tipar corretamente a stream
export const createPeer = ({
  stream,
  initiator,
}: {
  stream: any;
  initiator: boolean;
}) => {
  return new RNSimplePeer({
    initiator: initiator,
    stream: stream,
    trickle: true,
    config: {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    } as any,
    webRTC: {
      RTCPeerConnection,
      RTCIceCandidate,
      RTCSessionDescription,
    },
  });
};
