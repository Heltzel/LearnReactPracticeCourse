import React, { useEffect } from 'react'

const Alert = ({ msg, type, list, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [removeAlert, list])

  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
