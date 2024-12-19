import React, { useEffect, useState } from 'react'

export default function Pomodoro() {
    const [workDuration,setWorkDuration] = useState(25)
    const [breakDuration, setBreakDuration] = useState(5)
    const [workSecond, setWorkSecond] = useState(1500)
    const [breakSecond, setBreakSecond] = useState(300)
    const [time, setTime] = useState("Work")
    const [flag, setFlag] = useState(false)
    const [resetFlag, setResetFlag] = useState(true)

    useEffect(() => {
      if(flag && time === "Work"){
        if(workSecond>0){
          setTimeout(() => setWorkSecond(workSecond-1),1000)
        }
        if(workSecond===0){
          alert("Work Time Has Ended")
          setTime("Break")
          setWorkSecond(1500)
        }
      }
      if(flag && time === "Break"){
          if(breakSecond > 0){
          setTimeout(() => setBreakSecond(breakSecond-1),1000)
          }
          if(breakSecond===0){
            alert("Break Time Ended")
            setTime("Work")
            setBreakSecond(300)
          }
      }
    },[workSecond,breakSecond,flag,time])

    const formatedTime = (seconds) =>{
        let minute = parseInt(seconds/60).toString();
        let second = parseInt(seconds%60).toString();
        if(minute.length === 1) minute = "0" + minute
        if(second.length === 1) second = "0" + second
        return minute+":"+second
    }
    function handleReset(){
      setWorkDuration(25)
      setBreakDuration(5)
      setTime("Work")
      setFlag(false)
      setWorkSecond(1500)
      setBreakSecond(300)
      setResetFlag(true)
    }
    function handleSubmit(e){
      e.preventDefault()
      setWorkSecond(workDuration*60)
      setBreakSecond(breakDuration*60)
    }
  return (
    <div>
      <div>
        <h1>{time === "Work" ? formatedTime(workSecond) : formatedTime(breakSecond)}</h1>
        <h1>{time === "Work" ? "Work" : "Break"} - Time</h1>
      </div>
      <div>
        <button onClick={() => {
           setFlag(true)
           setResetFlag(false)
        }} disabled={flag}>Start</button>
        <button disabled={!flag} onClick={() => {
          setFlag(false)
          setResetFlag(false)
        }}>Stop</button>
        <button disabled={resetFlag} onClick={handleReset}>Reset</button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
            <input type='number' placeholder='Enter Work Time' value={workDuration} onChange = {(e) => setWorkDuration(e.target.value)}/>
            <input type='number' placeholder='Enter Break Time' value={breakDuration} onChange = {(e) => setBreakDuration(e.target.value)}/>
            <input type='submit' value="set" />
        </form>
      </div>
    </div>
  )
}
