import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";

const Dictaphone = () => {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  const handleStop = async (transcript) => {
      SpeechRecognition.stopListening();
      try {
          console.log("transcript: " + transcript);
          console.log("finalTranscript: " + document.getElementById("Text").textContent);
          const textData = document.getElementById("Text").textContent
          const text_from_transcript = transcript; // to solve issue related to circular structure (which cannot be converted to json)
          await axios.post('http://localhost:3000/translate', {textData});
          console.log('Transcript sent to server');
      } catch (error) {
          console.error('Error sending transcript to server:', error);
      }
  }

  const handleStart = () => {
      SpeechRecognition.startListening({continuous: true});
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p id={"Text"}>{transcript}</p>
    </div>
  );
};
export default Dictaphone;