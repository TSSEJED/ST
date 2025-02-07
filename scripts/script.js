const socket = io.connect('http://localhost:3000');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const joinButton = document.getElementById('joinButton');
const meetingIdInput = document.getElementById('meetingId');

let localStream;
let peerConnection;

const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startButton.onclick = startMeeting;
joinButton.onclick = joinMeeting;

async function startMeeting() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
  peerConnection = new RTCPeerConnection(config);
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('signal', { candidate: event.candidate });
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('signal', { sdp: peerConnection.localDescription });
}

function joinMeeting() {
  const meetingId = meetingIdInput.value;
  socket.emit('join', { meetingId });
}

socket.on('signal', async (data) => {
  if (data.sdp) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
    if (data.sdp.type === 'offer') {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('signal', { sdp: peerConnection.localDescription });
    }
  }
  
  if (data.candidate) {
    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
});
