import { AsyncStorage } from 'react-native'
import { NOTIFICATIONS } from "../../../../constants/App/constants";

/**
*
* Notification:
*
* @Param date (number): timestamp of notification date
* @Param quizDone (Boolean): flag to know if quiz is done
*
* */


export const getNotification = () => AsyncStorage.getItem(NOTIFICATIONS)

export const setNotification = notification => AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(notification))