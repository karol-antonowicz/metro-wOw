import React, { useState } from 'react';
import styles from './Metronome.module.css';
const click1 = require('./sounds/click1.wav')
const click2 = require('./sounds/click2.wav')

const initialBeats = {
  bpm: 120,
  isPlaying: false,
  count: 0,
  beatsPerMeasure: 4,
}

const Metronome = () => {

  const [beat, setBeat] = useState(initialBeats);
  const [timer, setTimer] = useState();

  const tick = new Audio(click1)
  const tock = new Audio(click2)

  const handleBpmChange = (e: any) => {
    let bpms = e.target.value;
    setBeat({ ...beat, bpm: bpms })
  }

  const playClick = () => {
    console.log('click')
  }

  const startStop = function() {
    // if not playing - start playing in intervals acc. to BPM...;)
    if (!beat.isPlaying) {
      setTimer(setInterval(playClick, (60 / beat.bpm) * 1000))
      setBeat({
        ...beat,
        count: 0,
        isPlaying: true
      })
    } else {
      clearInterval(timer);
      setBeat({
        ...beat,
        isPlaying: false
      })
    }
  }


  return (
    <div className={styles.metronome}>
      <div className={styles.bpmslider}>
        <span className={styles.bpmslider_display}>Bpm {beat.bpm}</span>
        <input type='range' min='60' max='180' value={beat.bpm} onChange={handleBpmChange} className={styles.bpmslider_range} />
      </div>
      <button onClick={() => { startStop()}} className={styles.metronome_btn}>{beat.isPlaying ? 'Stop' : 'Play'}</button>
    </div>
  );
}

export default Metronome;
