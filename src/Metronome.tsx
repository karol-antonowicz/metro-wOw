import React from 'react';
import styles from './Metronome.module.css';

const Metronome = () => {
  let bpm = 120;
  let playing = false;

  return (
    <div className={styles.metronome}>
      <div className={styles.bpmslider}>
        <span className={styles.bpmslider_display}>Bpm {bpm}</span>
        <input type='range' min='60' max='180' value={bpm} className={styles.bpmslider_range}/>
      </div>
      <button className={styles.metronome_btn}>{playing ? 'Stop' : 'Play'}</button>
    </div>
  );
}

export default Metronome;
