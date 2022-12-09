const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => (props.parts.map((v, i) => <Part key={i} part={v} index={i} />))

const Total = (props) => {
  const sum = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 
    0
  )
  return (<p>Number of exercises {sum}</p>)
  }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App