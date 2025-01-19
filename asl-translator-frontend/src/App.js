import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Recorder from './components/Recorder';
import Dictaphone from './components/SpeechToText';

function App() {
  return (
    <div>
      <h1>ASL Translator</h1>
      <Dictaphone />
    </div>
  );
}

export default App;