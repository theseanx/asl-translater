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
      const textData = document.getElementById("Text").textContent;
      const text_from_transcript = transcript; // to solve issue related to circular structure (which cannot be converted to json)
      await axios.post('http://localhost:3001/translate', { textData });
      console.log('Transcript sent to server');
    } catch (error) {
      console.error('Error sending transcript to server:', error);
    }
  };

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Function to generate a series of images for each character in the transcript
  const generateImages = () => {
    const characters = transcript.toLowerCase().split(''); // Convert transcript to lowercase and split into characters
    return characters.map((char, index) => {
      if (char >= 'a' && char <= 'z') { // Only process alphabetic characters
        return <img key={index} src={`http://localhost:3001/data/${char}.png`} alt={char} />;
      }
      return null; // Skip non-alphabetic characters
    });
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p id="Text">{transcript}</p>
      <div>
        {generateImages()} {/* Dynamically generate and render the images */}
      </div>
    </div>
  );
};

export default Dictaphone;
