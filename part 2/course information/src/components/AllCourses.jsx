import Course from "./Course.jsx"

const AllCourses = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <Course key={course.id} content={course} />
            )}
        </div>
    )
}

export default AllCourses