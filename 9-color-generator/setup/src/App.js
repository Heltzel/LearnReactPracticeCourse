import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  const [color, setColor] = useState('')
  const [isError, setIsError] = useState(false)
  const [list, setList] = useState(new Values('#f15025').all(10))

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('form sumitted')
    try {
      let colors = new Values(color).all(10)
      setList(colors)
    } catch (error) {
      console.error('color not found')
      setIsError(true)
    }
  }
  const handleOnchange = (e) => {
    const { value } = e.target
    setColor(value)
  }

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            className={`${isError ? 'error' : null}`}
            placeholder="#f15025"
            value={color}
            onChange={handleOnchange}
          />
          <button className="btn" style={{ marginLeft: '15px' }}>
            generate
          </button>
        </form>
      </section>
      <section type="submit" className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor key={index} {...color} hex={color.hex} index={index} />
          )
        })}
      </section>
    </>
  )
}

export default App
