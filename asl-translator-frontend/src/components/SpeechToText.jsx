import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  const handleStop = async (transcript) => {
      SpeechRecognition.stopListening();
      try {
          await axios.post('http://localhost:3000/translate', {transcript});
          console.log('Transcript sent to server');
      } catch (error) {
          console.error('Error sending transcript to server:', error);
      }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;