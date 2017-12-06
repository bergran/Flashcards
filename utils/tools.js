import { Permissions, Notifications } from 'expo'
import { getNotification, setNotification } from "../src/03-services/asyncStorage/App/notifications";


export const capitalize = value => `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`

export const createNotificacion = (title, body) => {
    return {
        title: title,
        body: body,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'hight',
            sticky: false,
            vibrate: true
        }
    }
}

export const manageNotification = (title, body, date, quizDone = false) => {
    Promise.all([
        Permissions.getAsync(Permissions.NOTIFICATIONS),
        getNotification()
    ])
        .then(([
                   notificationRaw,
                   dataNotification
        ]) => {
            if (notificationRaw.status === 'granted') {
                const dateDiff = dataNotification && (Date.now() - dataNotification.date) / 1000
                if (!dataNotification || (dataNotification && dateDiff > 3600 && !dataNotification.quizDone)) {
                    const notification = createNotificacion(title, body)
                    Notifications.scheduleLocalNotificationAsync(notification, {
                        time: date,
                        repeat: 'day'
                    })
                        .then(data => {
                            setNotification({date: date.getTime(), quizDone})
                        })
                } else if (dateDiff > 86400 && dataNotification.quizDone) {
                    Notifications.cancelAllScheduledNotificationsAsync()
                        .then(data => {
                            const notification = createNotificacion('DeckSwift',
                                'Hey, do you forget to play a quiz? :(')
                            Notifications.scheduleLocalNotificationAsync(notification, {
                                time: date,
                                repeat: 'day'
                            })
                                .then(data => {
                                    setNotification({date: date.getTime(), quizDone})
                                })

                        })
                }
            }
        }
    )
}