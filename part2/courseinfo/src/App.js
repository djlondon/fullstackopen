import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({ total }) => (
  <p><strong>total of {total} exercises</strong></p>
)

const Course = ({ course }) => {
  const totalExercies = course.parts
    .map(v => v.exercises)
    .reduce((c, v) => (c + v), 0)
  return (<div>
    <Header name={course.name} />
    {course.parts.map(v => <Part key={v.name} part={v} />)}
    <Total total={totalExercies} />
  </div>)
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Functional',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App