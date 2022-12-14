const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Total = ({ total }) => (
    <p><strong>total of {total} exercises</strong></p>
)

export const Course = ({ course }) => {
    const totalExercies = course.parts
        .map(v => v.exercises)
        .reduce((c, v) => (c + v), 0)
    return (<div>
        <Header name={course.name} />
        {course.parts.map(v => <Part key={v.name} part={v} />)}
        <Total total={totalExercies} />
    </div>)
}
