import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  Phone,
  Video,
  VideoOff,
  PhoneOff,
  Copy,
  Check,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Settings,
  MoreVertical,
  Hand,
  Grid3x3,
  User,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Shield,
  Wifi,
  WifiOff,
  Clock,
  Download,
  Upload,
  Activity,
} from 'lucide-react';

const VideoCall = () => {
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
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

  // State management
  const [pc, setPc] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState('');
  const [callStatus, setCallStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or speaker
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [callDuration, setCallDuration] = useState(0);
  const [handRaised, setHandRaised] = useState(false);
  const [remoteMuted, setRemoteMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const containerRef = useRef(null);
  const callTimerRef = useRef(null);

  // Call duration timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [callStatus]);

  // Format call duration
  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (pc) {
        pc.close();
      }
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Monitor connection quality
  useEffect(() => {
    if (pc) {
      const interval = setInterval(async () => {
        const stats = await pc.getStats();
        stats.forEach(report => {
          if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
            const packetsLost = report.packetsLost || 0;
            const packetsReceived = report.packetsReceived || 1;
            const lossRate = packetsLost / packetsReceived;
            
            if (lossRate > 0.1) setConnectionQuality('poor');
            else if (lossRate > 0.05) setConnectionQuality('fair');
            else setConnectionQuality('excellent');
          }
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [pc]);

  const startWebcam = async () => {
    try {
      setError('');
      const peerConnection = new RTCPeerConnection(servers);
      setPc(peerConnection);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      setLocalStream(stream);
      
      const remote = new MediaStream();
      setRemoteStream(remote);

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remote.addTrack(track);
        });
      };

      setCallStatus('ready');
      setShowJoinModal(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setError("Could not access camera and microphone. Please check permissions.");
    }
  };

  const createCall = async () => {
    try {
      setError('');
      setCallStatus('connecting');
      
      const callDoc = firestore.collection('calls').doc();
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');

      setCallId(callDoc.id);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          offerCandidates.add(event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
          setCallStatus('connected');
        }
      });

      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
      
      setShowJoinModal(false);
    } catch (error) {
      console.error("Error creating offer:", error);
      setError("Failed to create call. Please try again.");
      setCallStatus('idle');
    }
  };

  const answerCall = async () => {
    try {
      setError('');
      if (!callId) {
        setError("Please enter a call ID");
        return;
      }
      
      setCallStatus('connecting');
      
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
        setError("Call not found. Please check the call ID.");
        setCallStatus('idle');
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
      
      setCallStatus('connected');
      setShowJoinModal(false);
    } catch (error) {
      console.error("Error answering call:", error);
      setError("Failed to answer call. Please try again.");
      setCallStatus('idle');
    }
  };

  const endCall = () => {
    if (pc) {
      pc.close();
      setPc(null);
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    setRemoteStream(null);
    setCallStatus('idle');
    setCallId('');
    setIsScreenSharing(false);
    setShowChat(false);
    setShowParticipants(false);
    setChatMessages([]);
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true 
        });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        const sender = pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(screenTrack);
        }
        
        screenTrack.onended = () => {
          toggleScreenShare();
        };
        
        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error sharing screen:", error);
      }
    } else {
      const videoTrack = localStream.getVideoTracks()[0];
      const sender = pc.getSenders().find(s => s.track?.kind === 'video');
      if (sender) {
        sender.replaceTrack(videoTrack);
      }
      setIsScreenSharing(false);
    }
  };

  const copyCallId = () => {
    navigator.clipboard.writeText(callId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: userName || 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const getConnectionIcon = () => {
    if (connectionQuality === 'excellent') return <Wifi className="w-4 h-4 text-green-500" />;
    if (connectionQuality === 'fair') return <Activity className="w-4 h-4 text-yellow-500" />;
    return <WifiOff className="w-4 h-4 text-red-500" />;
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      {/* Modern Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                  PlaceMate Video
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Professional Video Conferencing
                </p>
              </div>
            </div>

            {/* Call Info */}
            {callStatus === 'connected' && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {getConnectionIcon()}
                  <span className={`text-sm font-medium capitalize ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {connectionQuality}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-mono font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatDuration(callDuration)}
                  </span>
                </div>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
            <button onClick={() => setError('')} className="ml-auto hover:bg-red-600 p-1 rounded-lg">
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="pt-24 pb-28 px-4 max-w-7xl mx-auto">
        {/* Video Grid */}
        <div className={`relative ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
            : 'flex flex-col gap-4'
        }`}>
          {/* Remote Video (Main) */}
          <div className={`relative group ${
            viewMode === 'speaker' ? 'order-1' : ''
          } ${
            callStatus === 'connected' && viewMode === 'speaker' 
              ? 'lg:col-span-2 aspect-video' 
              : 'aspect-video'
          }`}>
            <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 transition-all ${
              callStatus === 'connected'
                ? 'border-green-500 ring-4 ring-green-500/30'
                : isDarkMode
                ? 'border-gray-800'
                : 'border-gray-200'
            }`}>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover ${
                  !remoteStream || callStatus !== 'connected' ? 'hidden' : ''
                }`}
              />
              
              {/* Remote Video Placeholder */}
              {(!remoteStream || callStatus !== 'connected') && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white'
                    } shadow-xl`}>
                      <User className={`w-16 h-16 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    </div>
                    {callStatus === 'connecting' && (
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                  <p className={`mt-6 text-xl font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {callStatus === 'connecting' ? 'Connecting...' : 'Waiting for participant'}
                  </p>
                  {callStatus === 'connecting' && (
                    <div className="flex gap-2 mt-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  )}
                </div>
              )}

              {/* Remote User Info Overlay */}
              {callStatus === 'connected' && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3 backdrop-blur-xl bg-black/50 px-4 py-3 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Remote User</p>
                      <div className="flex items-center gap-2">
                        {remoteMuted ? (
                          <MicOff className="w-3 h-3 text-red-400" />
                        ) : (
                          <Mic className="w-3 h-3 text-green-400" />
                        )}
                        <span className="text-xs text-gray-300">
                          {remoteMuted ? 'Muted' : 'Speaking'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {handRaised && (
                    <div className="backdrop-blur-xl bg-yellow-500/90 px-4 py-3 rounded-xl flex items-center gap-2 animate-bounce">
                      <Hand className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">Hand Raised</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className={`relative group ${
            viewMode === 'speaker' 
              ? 'order-2 w-64 aspect-video' 
              : 'aspect-video'
          }`}>
            <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 transition-all ${
              localStream
                ? isDarkMode
                  ? 'border-purple-600 ring-4 ring-purple-600/30'
                  : 'border-blue-500 ring-4 ring-blue-500/30'
                : isDarkMode
                ? 'border-gray-800'
                : 'border-gray-200'
            }`}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  !localStream || !isVideoEnabled ? 'hidden' : ''
                } ${isScreenSharing ? 'scale-75' : ''}`}
              />

              {/* Local Video Placeholder / Camera Off */}
              {(!localStream || !isVideoEnabled) && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } shadow-xl`}>
                    {!isVideoEnabled ? (
                      <VideoOff className={`w-12 h-12 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    ) : (
                      <User className={`w-12 h-12 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  <p className={`mt-4 text-lg font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {!isVideoEnabled ? 'Camera Off' : 'You'}
                  </p>
                </div>
              )}

              {/* Local User Info */}
              {localStream && (
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="backdrop-blur-xl bg-black/50 px-3 py-2 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Y</span>
                      </div>
                      <span className="text-white font-medium text-sm">You</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {!isAudioEnabled && (
                        <MicOff className="w-4 h-4 text-red-400" />
                      )}
                      {!isVideoEnabled && (
                        <VideoOff className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Screen Sharing Indicator */}
              {isScreenSharing && (
                <div className="absolute top-3 right-3">
                  <div className="backdrop-blur-xl bg-green-500/90 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-xs">Sharing</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call ID Display */}
        {callId && (callStatus === 'connecting' || callStatus === 'connected') && (
          <div className="mt-6 flex justify-center">
            <div className={`backdrop-blur-xl border-2 rounded-2xl px-6 py-4 shadow-2xl ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <div>
                  <p className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Meeting ID
                  </p>
                  <p className={`font-mono text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {callId}
                  </p>
                </div>
                <button
                  onClick={copyCallId}
                  className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Copy Meeting ID"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Control Bar */}
      <div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        onMouseEnter={() => setIsHoveringControls(true)}
        onMouseLeave={() => setIsHoveringControls(false)}
      >
        <div className={`backdrop-blur-2xl border-2 rounded-3xl shadow-2xl transition-all transform ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-800' 
            : 'bg-white/95 border-gray-200'
        } ${isHoveringControls ? 'scale-105' : 'scale-100'}`}>
          <div className="px-6 py-4">
            {/* Pre-Call Controls */}
            {callStatus === 'idle' && (
              <div className="flex items-center gap-4">
                <button
                  onClick={startWebcam}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3"
                >
                  <Video className="w-6 h-6" />
                  <span>Join or Start Meeting</span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            )}

            {/* Ready to Call Controls */}
            {callStatus === 'ready' && !showJoinModal && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Start New Call</span>
                </button>
                
                <div className={`h-12 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                
                <button
                  onClick={() => setShowJoinModal(true)}
                  className={`px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 ${
                    isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Join with ID</span>
                </button>
              </div>
            )}

            {/* Active Call Controls */}
            {(callStatus === 'connecting' || callStatus === 'connected') && (
              <div className="flex items-center gap-3">
                {/* Microphone */}
                <button
                  onClick={toggleAudio}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    isAudioEnabled
                      ? isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  title={isAudioEnabled ? 'Mute' : 'Unmute'}
                >
                  {isAudioEnabled ? (
                    <Mic className="w-6 h-6" />
                  ) : (
                    <MicOff className="w-6 h-6" />
                  )}
                </button>

                {/* Camera */}
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    isVideoEnabled
                      ? isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoEnabled ? (
                    <Video className="w-6 h-6" />
                  ) : (
                    <VideoOff className="w-6 h-6" />
                  )}
                </button>

                {/* Screen Share */}
                <button
                  onClick={toggleScreenShare}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    isScreenSharing
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
                >
                  {isScreenSharing ? (
                    <MonitorOff className="w-6 h-6" />
                  ) : (
                    <Monitor className="w-6 h-6" />
                  )}
                </button>

                <div className={`h-12 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                {/* Hand Raise */}
                <button
                  onClick={() => setHandRaised(!handRaised)}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    handRaised
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600 animate-bounce'
                      : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Raise hand"
                >
                  <Hand className="w-6 h-6" />
                </button>

                {/* Chat */}
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 relative ${
                    showChat
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Chat"
                >
                  <MessageSquare className="w-6 h-6" />
                  {chatMessages.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {chatMessages.length}
                    </div>
                  )}
                </button>

                {/* Participants */}
                <button
                  onClick={() => setShowParticipants(!showParticipants)}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    showParticipants
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Participants"
                >
                  <Users className="w-6 h-6" />
                </button>

                {/* View Mode */}
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'speaker' : 'grid')}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Change layout"
                >
                  <Grid3x3 className="w-6 h-6" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-6 h-6" />
                  ) : (
                    <Maximize2 className="w-6 h-6" />
                  )}
                </button>

                {/* More Options */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 ${
                    showSettings
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  title="More options"
                >
                  <MoreVertical className="w-6 h-6" />
                </button>

                <div className={`h-12 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                {/* End Call */}
                <button
                  onClick={endCall}
                  className="p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all transform hover:scale-110 shadow-xl hover:shadow-2xl"
                  title="Leave call"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl shadow-2xl p-8 ${
            isDarkMode ? 'bg-gray-900 border-2 border-gray-800' : 'bg-white'
          }`}>
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Join Meeting
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Start a new call or join an existing one
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />

              <div className="relative">
                <input
                  type="text"
                  placeholder="Meeting ID (to join existing call)"
                  value={callId}
                  onChange={(e) => setCallId(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={createCall}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Start New Call
                </button>
                <button
                  onClick={answerCall}
                  disabled={!callId}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Call
                </button>
              </div>

              <button
                onClick={() => setShowJoinModal(false)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {showChat && (
        <div className={`fixed right-6 bottom-28 w-96 h-[500px] rounded-3xl shadow-2xl border-2 overflow-hidden animate-slideInRight ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-800' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-xl`}>
          <div className={`p-4 border-b-2 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Chat
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100%-130px)] p-4 overflow-y-auto space-y-3">
            {chatMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <MessageSquare className={`w-16 h-16 mb-3 ${
                  isDarkMode ? 'text-gray-700' : 'text-gray-300'
                }`} />
                <p className={`text-center ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  No messages yet.<br />Start the conversation!
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="animate-slideIn">
                  <div className={`p-3 rounded-2xl ${
                    msg.sender === (userName || 'You')
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto max-w-[80%]'
                      : isDarkMode
                      ? 'bg-gray-800 text-white max-w-[80%]'
                      : 'bg-gray-100 text-gray-900 max-w-[80%]'
                  }`}>
                    <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === (userName || 'You')
                        ? 'text-blue-100'
                        : isDarkMode
                        ? 'text-gray-500'
                        : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={`p-4 border-t-2 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className={`flex-1 px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Participants Panel */}
      {showParticipants && (
        <div className={`fixed right-6 bottom-28 w-80 rounded-3xl shadow-2xl border-2 overflow-hidden animate-slideInRight ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-800' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-xl`}>
          <div className={`p-4 border-b-2 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Participants (2)
              </h3>
              <button
                onClick={() => setShowParticipants(false)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {/* You */}
            <div className={`p-4 rounded-2xl transition-all ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">Y</span>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {userName || 'You'} (Host)
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {isAudioEnabled ? (
                      <Mic className="w-3 h-3 text-green-500" />
                    ) : (
                      <MicOff className="w-3 h-3 text-red-500" />
                    )}
                    {isVideoEnabled ? (
                      <Video className="w-3 h-3 text-green-500" />
                    ) : (
                      <VideoOff className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Remote User */}
            {callStatus === 'connected' && (
              <div className={`p-4 rounded-2xl transition-all ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">R</span>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Remote User
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {!remoteMuted ? (
                        <Mic className="w-3 h-3 text-green-500" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-500" />
                      )}
                      <Video className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  {handRaised && (
                    <Hand className="w-5 h-5 text-yellow-500 animate-bounce" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        video {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
};

export default VideoCall;
