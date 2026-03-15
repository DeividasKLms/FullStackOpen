const Total = ({ total }) => {
    const sum = total.reduce((total_sum, total) => total_sum + total.exercises, 0)
    return (
        <b>Total of {sum} exercises</b>
    )
}

export default Total