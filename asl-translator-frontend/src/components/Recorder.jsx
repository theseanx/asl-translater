import React, { useRef, useState } from 'react';

export default function Recorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedURL, setRecordedURL] = useState('')
    const [seconds, setSeconds] = useState(0)

    const mediaStream = useRef(null)
    const mediaRecorder = useRef(null)
    const chunks = useRef([])

    const startRecording = async () => {
        setIsRecording(true);
        try{
            setSeconds(0)
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true});
            mediaStream.current = stream
            mediaRecorder.current = new MediaRecorder(stream)
            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0){
                    chunks.current.push(e.data)
                }
            }
            const timer = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current,{type: 'video/webm'})
                const url = URL.createObjectURL(recordedBlob)
                setRecordedURL(url)

                chunks.current = []
                clearTimeout(timer)
            }

            mediaRecorder.current.start()
        } catch(error){
            console.log(error);
        }
    };

    const stopRecording = () => {
        setIsRecording(false)
        if(mediaRecorder.current){
            mediaRecorder.current.stop()
            mediaStream.current.getTracks().forEach(track => track.stop())
        }
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600)/60)
        const secs = totalSeconds % 60

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    }

    return (
        <div>
            <h1>Recorder</h1>
            <p>{isRecording ? formatTime(seconds) : '00:00:00'}</p>
            <button onClick={isRecording ? stopRecording : startRecording}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
            {recordedURL && <video src={recordedURL} controls autoPlay />}
        </div>
    )
}