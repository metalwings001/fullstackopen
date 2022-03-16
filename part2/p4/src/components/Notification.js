import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    //console.log('message is null')
    return null
  }
  const messageToShow = message[0] === 'A' ? 'confirmation' : 'error'
  return (
    <div className={messageToShow}>
      {message}
    </div>
  )
}

export default Notification