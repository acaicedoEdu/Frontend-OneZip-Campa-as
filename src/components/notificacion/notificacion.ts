import { Notify, type QNotifyCreateOptions } from 'quasar';

export const showErrorNotification = (message: string) => {
  const options: QNotifyCreateOptions = {
    message,
    iconColor: 'negative',
    classes: 'custom-error-notification',
    textColor: 'dark',
    position: 'bottom-right',
    timeout: 30000,
    icon: 'fa-solid fa-exclamation-triangle',
    actions: [{ icon: 'fa-solid fa-xmark', color: 'dark', round: true }],
  };
  Notify.create(options);
};

export function showSuccessNotification(message: string) {
  const options: QNotifyCreateOptions = {
    message,
    icon: 'check_circle',
    iconColor: 'positive',
    classes: 'custom-success-notification',
    textColor: 'dark',
    position: 'bottom-right',
    timeout: 5000,
    actions: [{ icon: 'fa-solid fa-xmark', color: 'black', round: true }],
  };

  Notify.create(options);
}
