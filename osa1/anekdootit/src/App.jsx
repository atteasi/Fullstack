import { useState } from 'react'

const MostVoted = (props) => {

  let max = props.pointTable[0]
  let maxIndex = 0
  let i = 1;

  for(i = 1; i < props.pointTable.length; i++){
      if(props.pointTable[i] > max){
        maxIndex = i
        max = props.pointTable[i]
      }
  }
  return(
    <>
      <h2>Anecdote with the most votes</h2>
      <p>{props.anecdotes[maxIndex]}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  let [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const [selected, setSelected] = useState(0)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
      }}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <p>This anecdote has {points[selected]} votes</p>
      <MostVoted pointTable = {points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App