import { notificationService } from '../services/notifications/notificationService';

var token = localStorage.getItem('token');
export const checkAuth = () => {
    if (!token) {
        notificationService.sendMessage({ type: "error", title: "Please login First", text: "You Profile Not Found." })
        window.location.replace(window.location.origin + '/login');
    } else {
        return true;
    }
}