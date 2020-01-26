import React, { useState } from 'react';
import styles from './Metronome.module.css';

const initialBeats = {
  bpm: 120,
  playing: false,
  count: 0,
  beatsPerMeasure: 4,

}


const Metronome = () => {

  const [beat, setBeat] = useState(initialBeats)

  return (
    <div className={styles.metronome}>
      <div className={styles.bpmslider}>
        <span className={styles.bpmslider_display}>Bpm {beat.bpm}</span>
        <input type='range' min='60' max='180' value={beat.bpm} className={styles.bpmslider_range}/>
      </div>
      <button className={styles.metronome_btn}>{beat.playing ? 'Stop' : 'Play'}</button>
    </div>
  );
}

export default Metronome;
