const RenderCountries = ({ nearest, setInput }) => {

    return (
        <div>
            {nearest?.name?.common} <button onClick={() => setInput(nearest?.name?.common)}>Show</button>
        </div>
    )
}

export default RenderCountries