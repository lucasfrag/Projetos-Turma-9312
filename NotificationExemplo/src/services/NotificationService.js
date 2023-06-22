import PushNotification from "react-native-push-notification"

class NotificationService {

    // Configuração orientada pela documentação do React Native Push Notification
    // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManager] onRegister token:", token);
            },
            onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);
            },
        })
    }

    // É aqui que nossa notificação para o Android é construida
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            channelId: "notificador",
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    // Fução que exibe a notificação
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Propriedades do Android */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* Propriedades do Android e iOS */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        })
    }

    // Função que cancela todas notiificações e limpa as que estão no centro de notificações
    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    // Configurações de canais
    createChannel = () => {
        PushNotification.createChannel(
            {
              channelId: "notificador", // (required)
              channelName: "Notificador do App", // (required)
              channelDescription: "Meu canal de notificações principal do aplicativo Notification Exemplo.", // (optional) default: undefined.  
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }

    // Disparo de notificações locais agendadas
    scheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: "notificador",
            id: 3,
            message: "Notificação Agendada 1 😉", // (required)
            date: new Date(Date.now() + 5 * 1000),
            allowWhileIdle: false,           
            /* Android Only Properties */
            repeatType: 'minute',
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          });

          PushNotification.localNotificationSchedule({
            channelId: "notificador",
            id: 4,
            message: "Notificação Agendada 2 😉", // (required)
            date: new Date(Date.now() + 15 * 1000),
            allowWhileIdle: false,           
            /* Android Only Properties */
            repeatType: 'minute',
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          });
    }
}

export const Notification = new NotificationService();