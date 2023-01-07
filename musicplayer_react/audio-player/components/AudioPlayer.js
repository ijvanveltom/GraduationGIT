import React, { useState, useRef, useEffect } from 'react'
import styles from "../styles/AudioPlayer.module.css";
import { BsFillArrowLeftCircleFill, BsFillPlayCircleFill, BsPauseCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

const AudioPlayer = () => {
    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // references
    const audioPlayer = useRef(); // audio component
    const progressBar = useRef(); // progress bar
    const animationRef = useRef();  // animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    // toggle pause play    
    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value - 30);
        changeRange();
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value + 30);
        changeRange();
    }

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer} src="https://cdn.simplecast.com/audio/03ddcb/03ddcb52-812a-4aab-acdc-45b6d4c855d4/0a8aeee4-2338-4b64-8a42-d51ed45e6dbe/rna-352-final-final-x-of-bones_tc.mp3?fbclid=IwAR1losw8ACL4WjlSZQI-_PAzpFJE1oo6qCqUk-MLSJgwEug2lKUSGc8m4I4" preload="metadata"></audio>
            <button className={styles.forwardBackward} onClick={backThirty}><BsFillArrowLeftCircleFill /> 30</button>
            <button onClick={togglePlayPause} className={styles.playPause}>
                {isPlaying ? <BsPauseCircleFill /> : <BsFillPlayCircleFill className={styles.play} />}
            </button>
            <button className={styles.forwardBackward} onClick={forwardThirty}><BsFillArrowRightCircleFill /> 30</button>

            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

            <div>
                <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div>

            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div >
    )
}

export { AudioPlayer }