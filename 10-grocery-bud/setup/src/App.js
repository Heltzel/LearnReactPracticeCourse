import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  // Input handleing
  const handleChange = (e) => {
    const { value } = e.target
    setName(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted')
    if (!name) {
      showAlert(true, 'danger', 'Please enter a grocery')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        }),
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'grocery changed')
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      showAlert(true, 'success', `${name} is added to the list`)
      setName('')
    }
  }

  //Button handeling
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show: show, type: type, msg: msg })
  }
  const clearList = () => {
    setList([])
    showAlert(true, 'danger', 'List is cleared')
  }
  const removeItem = (id, title) => {
    showAlert(true, 'danger', `${title} is removed`)
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    if (specificItem) {
      setIsEditing(true)
      setEditID(id)
      setName(specificItem.title)
    }
  }

  //Localstorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    return () => {}
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery buddy</h3>
        <div className="form-control">
          <input
            type="text"
            name=""
            id=""
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
