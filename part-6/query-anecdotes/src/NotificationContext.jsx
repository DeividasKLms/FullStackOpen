import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState('')

  const renderNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification((current) => (current === notification ? '' : current))
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ renderNotification, notification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}