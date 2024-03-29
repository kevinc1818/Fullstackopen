const Course = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <p><b>total of {course.parts.reduce((s, p) =>  s + p.exercises, 0)} exercises</b></p>
        </>
    )
}

export default Course