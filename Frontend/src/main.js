import './style.css';

// Import Firebase directly - works better with Vite
import firebase from 'firebase/app';
import 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaLQCupszzOUHgSguCTjYxsB4fHwsRiWk",
  authDomain: "placemate-47370.firebaseapp.com",
  projectId: "placemate-47370",
  storageBucket: "placemate-47370.firebasestorage.app",
  messagingSenderId: "966999756332",
  appId: "1:966999756332:web:3290cbea1fb1d3dd394b89",
  measurementId: "G-041LPFK8FS"
};

// Initialize Firebase
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that one
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

// Global State
let pc = null;
let localStream = null;
let remoteStream = null;

// HTML elements
const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');

// 1. Setup media sources
webcamButton.onclick = async () => {
  try {
    // Create new peer connection
    pc = new RTCPeerConnection(servers);
    
    // Get user media
    localStream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;

    callButton.disabled = false;
    answerButton.disabled = false;
    webcamButton.disabled = true;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    alert("Could not access camera and microphone. Please check permissions.");
  }
};

// 2. Create an offer
callButton.onclick = async () => {
  try {
    // Reference Firestore collections for signaling
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    callInput.value = callDoc.id;

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        offerCandidates.add(event.candidate.toJSON());
      }
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    hangupButton.disabled = false;
  } catch (error) {
    console.error("Error creating offer:", error);
    alert("Failed to create call. Please try again.");
  }
};

// 3. Answer the call with the unique ID
answerButton.onclick = async () => {
  try {
    const callId = callInput.value;
    if (!callId) {
      alert("Please enter a call ID");
      return;
    }
    
    const callDoc = firestore.collection('calls').doc(callId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        answerCandidates.add(event.candidate.toJSON());
      }
    };

    const callData = (await callDoc.get()).data();
    if (!callData) {
      alert("Call not found. Please check the call ID.");
      return;
    }

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    
    hangupButton.disabled = false;
  } catch (error) {
    console.error("Error answering call:", error);
    alert("Failed to answer call. Please try again.");
  }
};

// 4. Hangup call
hangupButton.onclick = () => {
  // Close connections and reset
  if (pc) {
    pc.close();
    pc = null;
  }
  
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  
  // Reset video elements
  webcamVideo.srcObject = null;
  remoteVideo.srcObject = null;
  
  // Reset UI
  webcamButton.disabled = false;
  callButton.disabled = true;
  answerButton.disabled = true;
  hangupButton.disabled = true;
  callInput.value = '';
};