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

  const [beat, setBeat] = useState(initialBeats)

  const tick = new Audio(click1)
  const tock = new Audio(click2)

  const handleBpmChange = (e: any) => {
    let bpms = e.target.value;
    setBeat({ ...beat, bpm: bpms })
  }




  return (
    <div className={styles.metronome}>
      <div className={styles.bpmslider}>
        <span className={styles.bpmslider_display}>Bpm {beat.bpm}</span>
        <input type='range' min='60' max='180' value={beat.bpm} onChange={handleBpmChange} className={styles.bpmslider_range} />
      </div>
      <button onClick={()=>{tick.play()}} className={styles.metronome_btn}>{beat.isPlaying ? 'Stop' : 'Play'}</button>
    </div>
  );
}

export default Metronome;
