import 'firebase/messaging';
import { useEffect } from 'react';

const PushNotificationButton = () => {
  const messaging = firebase.messaging();

  useEffect(() => {
    messaging.requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(token => {
        console.log('Token:', token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <button>Enable Push Notifications</button>
  );
};

export default PushNotificationButton;
