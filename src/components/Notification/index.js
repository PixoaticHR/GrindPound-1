
import React, { useEffect, Fragment } from 'react';
import { notificationService } from "../../services/notifications/notificationService";
import notificationType from '../../constant/notificationTypes';

// import PNotify from 'pnotify/dist/es/PNotify';
// import 'pnotify/dist/es/PNotifyButtons';
// import 'pnotify/dist/es/PNotifyConfirm';
// import 'pnotify/dist/es/PNotifyCallbacks';

import { info, notice, success, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";


export function defaultPNotify(title, text) {
    notice({
        title: title,
        text: text,
        delay: 2000
    });
}
export function primaryPNotify(title, text) {
    notice({
        title: title,
        text: text,
        delay: 2000
    });
}
export function successPNotify(title, text) {
    success({
        title: title,
        text: text,
        delay: 2000
    });
}
export function infoPNotify(title, text) {
    info({
        title: title,
        text: text,
        delay: 2000

    });
}
export function errorPNotify(title, text) {
    error({
        title: title,
        text: text,
        delay: 2000
    });
}

export function successDesktopPNotify(title, text) {
    success({
        title: title,
        text: text,
        modules: {
            Desktop: {
                desktop: true
            }
        }
    }).on('click', function (e) {
        if (e.target.className.match('ui-pnotify-sticker') ||
            e.target.className.match('ui-pnotify-closer') ||
            e.target.className.match('brighttheme-icon-sticker') ||
            e.target.className.match('brighttheme-icon-closer')) {
            return;
        }
    });
}
export function errorDesktopPNotify(title, text) {
    error({
        title: title,
        text: text,
        modules: {
            Desktop: {
                desktop: true
            }
        }
    }).on('click', function (e) {
        if (e.target.className.match('ui-pnotify-sticker') ||
            e.target.className.match('ui-pnotify-closer') ||
            e.target.className.match('brighttheme-icon-sticker') ||
            e.target.className.match('brighttheme-icon-closer')) {
            return;
        }
    });
}
export function warningDesktopPNotify(title, text) {
    notice({
        title: title,
        text: text,
        modules: {
            Desktop: {
                desktop: true
            }
        }
    }).on('click', function (e) {
        if (e.target.className.match('ui-pnotify-sticker') ||
            e.target.className.match('ui-pnotify-closer') ||
            e.target.className.match('brighttheme-icon-sticker') ||
            e.target.className.match('brighttheme-icon-closer')) {
            return;
        }
    });
}
export function infoDesktopPNotify(title, text) {
    info({
        title: title,
        text: text,
        modules: {
            Desktop: {
                desktop: true
            }
        }
    }).on('click', function (e) {
        if (e.target.className.match('ui-pnotify-sticker') ||
            e.target.className.match('ui-pnotify-closer') ||
            e.target.className.match('brighttheme-icon-sticker') ||
            e.target.className.match('brighttheme-icon-closer')) {
            return;
        }
    });
}

export function noteNotify(title, text, data, onClose) {


    info({
        title: title,
        text: text,
        width: '500px',
        minHeight: '150px',
        hide: false,
        closerHover: false,
        stickerHover: false,
        icon: 'fa fa-sticky-note fa-2x',
        textTrusted: true,
        titleTrusted: true,
        data: data,
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                            text: "Dismiss",
                            primary: true,
                            click: (notice) => {
                                onClose?.(data);
                                console.log(arguments);
                                notice.close();
                            }
                        }
                    ]
                }
            ]
        ])
    });


}



const DefaultErrorTitle = "Some thing went wrong";
const DefaultErrorMessage = "An unexpected error has occurred. Please try again. Contact us if the problem continues.";

export const notificationServiceHandler = (notification = {}) => {
    if (notification && !notification.type) {
        notification.type = ''
    }
    if (notification && !notification.title) {
        notification.title = DefaultErrorTitle
    }
    if (notification && !notification.text) {
        notification.text = DefaultErrorMessage
    }
    switch (notification?.type) {
        case notificationType.PRIMARY: primaryPNotify(notification.title, notification.text);
            return;
        case notificationType.SUCCESS: successPNotify(notification.title, notification.text);
            return;
        case notificationType.INFO: infoPNotify(notification.title, notification.text);
            return;
        case notificationType.ERROR: errorPNotify(notification.title, notification.text);
            return;
        case notificationType.SUCCESSDESKTOP: successDesktopPNotify(notification.title, notification.text);
            return;
        case notificationType.ERRORDESKTOP: errorDesktopPNotify(notification.title, notification.text);
            return;
        case notificationType.WARNINGDESKTOP: warningDesktopPNotify(notification.title, notification.text);
            return;
        case notificationType.INFODESKTOP: infoDesktopPNotify(notification.title, notification.text);
            return;
        case notificationType.NOTE: noteNotify(notification.title, notification.text, notification.data, notification.onClose);
            return;
        default: defaultPNotify(notification.title, notification.text);
            return;

    }
};


const Notification = () => {

    useEffect(() => {

        // subscribe to loading
        const subscription = notificationService.getMessage().subscribe(notification => {
            notificationServiceHandler(notification);
        });
        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Fragment>
            <div className="rna-container">
            </div>
        </Fragment>
    );
}

export default Notification;



