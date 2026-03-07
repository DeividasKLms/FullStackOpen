import Content from "./content/Content.jsx"
import Header from "./content/Header.jsx"
import Total from "./content/Total.jsx"

const Course = ({ content }) => {
    return (
        <div>
            <Header header={content.name} />
            <Content parts={content.parts} />
            <Total total={content.parts} />
        </div>
    )
}

export default Course