import { Alert } from '@mui/material'
import { useNotificationText, useNotificationType } from '../store'

const Notification = () => {
  const notificationText = useNotificationText()
  const notificationType = useNotificationType()

  if (notificationText === null) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={notificationType}>
      {notificationText}
    </Alert>
  )
}

export default Notification