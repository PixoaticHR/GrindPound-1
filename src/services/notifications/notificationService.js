import { Subject } from "rxjs";
import notificationType from '../../constant/notificationTypes'
const subject = new Subject();
const DefaultErrorMessage =
  "An unexpected error has occurred. Please try again. Contact us at support@debtonator.us if the problem continues.";


export const notificationService = {

  sendMessage: (message) =>
    subject.next({
      text: message.text,
      type: message.type,
      title: message.title,
    })
  ,
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
  sendErrorMessage: ({ text = DefaultErrorMessage }) =>
    subject.next({ text: text, type: notificationType.ERROR, title: "Error" }),
  sendSuccessMessage: (text) =>
    subject.next({ text: text, type: notificationType.SUCCESS, title: "Success" }),
  sendInfoMessage: (text) =>
    subject.next({ text: text, type: notificationType.INFO, title: "Info" }),
  sendNoteMessage: ({ text, title, data, onClose }) =>
    subject.next({ text, title, type: notificationType.NOTE, data, onClose }),
};
