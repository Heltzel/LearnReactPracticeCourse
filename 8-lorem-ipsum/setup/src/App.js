import React, { useState } from 'react'
import data from './data'
function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted')
    let amount = parseInt(count)
    if (count <= 0) {
      amount = 1
    }
    if (count >= data.length) {
      amount = data.length
    }
    setText(data.slice(0, amount))
  }

  const onChange = (e) => {
    const { value } = e.target
    setCount(value)
  }

  return (
    <section className="section-center">
      <h3>tired of boring loremipsum ?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={count}
          onChange={onChange}
        />
        <button type="submit" className="btn">
          generate
        </button>
      </form>
      <article className="lorem-text">
        {text.map((para, index) => {
          return <p key={index}>{para}</p>
        })}
      </article>
    </section>
  )
}

export default App
