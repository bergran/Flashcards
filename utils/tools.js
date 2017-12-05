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