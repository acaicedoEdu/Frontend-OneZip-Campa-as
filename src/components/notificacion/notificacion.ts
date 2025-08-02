import { Notify, type QNotifyCreateOptions } from 'quasar';

export const showErrorNotification = (message: string) => {
  const options: QNotifyCreateOptions = {
    message,
    color: 'grey-9',
    position: 'bottom-right',
    timeout: 30000,
    icon: 'fa-solid fa-exclamation-triangle',
    actions: [{ icon: 'fa-solid fa-xmark', color: 'white', round: true }],
  };
  Notify.create(options);
};
