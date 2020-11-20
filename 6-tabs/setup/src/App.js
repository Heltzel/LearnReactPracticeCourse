import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs)
    setLoading(false)
  }

  // useEffect : does work outside the component
  // useEffect : cannot be async
  // useEffect : is a hook:  HOOKS  cannot be placed INSIDE a Conditional
  //  SO:  place the CONDITIONAL inside the hook
  //  [] : an empty dependency array as second param makes useEffect only run on the intial render
  //  [jobs] : useEffect will run on initial render AND on a render when jobs changes

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  const { company, dates, duties, title } = jobs[value]
  return (
    <section className="section">
      <div className="title">
        <h2>experience </h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={index}
                className={`job-btn ${index === value && 'active-btn'}`}
                onClick={() => {
                  setValue(index)
                }}
              >
                {job.company}
              </button>
            )
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>{' '}
                <p> {duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
