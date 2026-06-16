import { useStatisticControls } from './store'

const Buttons = () => {
  const { add_good, add_neutral, add_bad } = useStatisticControls()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={add_good}>good</button>
      <button onClick={add_neutral}>neutral</button>
      <button onClick={add_bad}>bad</button>
    </div>
  )
}

export default Buttons
