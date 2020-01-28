import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Metronome.module.css';
const click1 = require('./sounds/click1.wav');  // importing audio files with typescript must be done via REQUIRE (...)
const click2 = require('./sounds/click2.wav');  // importing audio files with typescript must be done via REQUIRE (...)

const Metronome = () => {
  const [playing, setPlaying] = useState(false);  // initially the metronome is not playing
  const [count, setCount] = useState(0);          // initially the count is 0. This is for the first beat to be different sound
  const [bpm, setBpm] = useState(100);            // beats per minute, the frequency of metronome
  const timer: React.MutableRefObject<any> = useRef();                         // to store current timer id, this way it can be cleared in the useEffect hook
  const beatsPerMeasure = 4;

  const tick = new Audio(click1);                 // wav file
  const tock = new Audio(click2);                 // wav file

  const playClickCallback = useCallback(() => {
    if (count % beatsPerMeasure === 0) {
      tock.play()
    } else {
      tick.play()
    }
    setCount(prevCount => (prevCount + 1) % beatsPerMeasure)  // update count after playing ticktock
  }, [count, tick, tock]);

  useEffect(() => {
    if (playing) {
      clearInterval(timer.current)
      timer.current = setInterval(playClickCallback, (60 / bpm) * 1000)
    } else {
      clearInterval(timer.current)
    }
  }, [bpm, playing, playClickCallback])                 // watch out for bpm, playing, or playClickCallback function changes

  // if not using callback, have to add dependent state and props that function used to the dependency array
  // in playClick method, we should cover count, click1, and click2
  // useEffect(() => {
  //   if (playing) {  
  //     clearInterval(timer.current)
  //     timer.current = setInterval(playClick, (60/bpm)*1000)
  //   } else {
  //     clearInterval(timer.current)
  //   }
  // }, [bpm, playing, playClick, count, click1, click2])  

  const startStop = () => {                           // this is for starting/stopping the metronome
    if (playing) {
      setPlaying(false)
    } else {
      setCount(0)
      setPlaying(true)
    }
  }

  const handleBpmChange = (e: any) => {            // handler for changing bpm value via slider
    setBpm(e.target.value)

    if (playing) {
      setCount(0)
    }
  }



  return (
    <div className={styles.wrapper}>
      <div className={styles.metronome}>
        <div className={styles.bpmslider}>
          <span className={styles.bpmslider_display}>Bpm {bpm}</span>
          <input type='range' min='60' max='180' value={bpm} onChange={handleBpmChange} className={styles.bpmslider_range} />
        </div>
        <button onClick={() => { startStop() }} className={styles.metronome_btn}>{playing ? 'Stop' : 'Play'}</button>
      </div>
      <p className={styles.info}>Flipped <a href='https://daveceddia.com/'>Dave Ceddia's</a> Metronome<br/>
      <a href='https://github.com/karol-antonowicz'>my github</a></p>
    </div>
  );
}

export default Metronome;
