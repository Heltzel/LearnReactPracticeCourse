import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, hex, index }) => {
  const [isAlert, setIsAlert] = useState(false)
  const bcg = rgb.join(',')
  const hexValue = `#${hex}`

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [isAlert])

  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setIsAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value"> {hexValue}</p>
      {isAlert && <p className="alert">copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
