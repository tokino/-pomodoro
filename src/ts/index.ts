import '../stylus/style.styl';

interface HistoryObject {
    start: Date;
    end: Date;
}

enum ButtonStatus {
    START = 'start',
    PAUSE = 'pause',
    STOP = 'stop'
}

enum NotificationPermission {
    GRANTED = 'granted',
    DENIED = 'denied'
}

document.addEventListener('DOMContentLoaded', () => {

    // すでに通知の許可を得ているか確認する
    if (Notification.permission !== NotificationPermission.GRANTED) {
        Notification.requestPermission((permission) => {

        });
    }

    const area = document.querySelector('.timer');
    const defaultSec = 60 * 25;
    const defaultBreakSec = 60 * 5;
    const INTERVAL = 1000;
    let historyObject: HistoryObject = {
        start: new Date(),
        end: new Date()
    };

    const history: HistoryObject[] = [];

    let status = true;

    const sec2displayTime = (sec: number) => {
        let minutes = Math.floor(sec / 60);
        const seconds = (sec - minutes * 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const date2displayString = (date: Date) => {
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1).toString().padStart(2, '0');
        const D = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        const s = date.getSeconds().toString().padStart(2, '0');
        return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    };

    const addHistoryColumn = () => {
        const ul = document.querySelector('ul');
        if (!ul) {
            return;
        }

        const li = document.createElement('li');
        li.textContent = `${date2displayString(historyObject.start)} ~ ${date2displayString(historyObject.end)}`;

        ul.appendChild(li);
    };

    let sec = defaultSec;
    let timerId: number;
    const timer = () => {
        if (!area) {
            return;
        }

        if (sec === defaultSec) {
            historyObject.start = new Date();
        }

        area.textContent = sec2displayTime(sec);

        sec--;

        if (sec < 0) {
            historyObject.end = new Date();

            if (status) {
                history.push(historyObject);
                addHistoryColumn();
            }

            sec = status ? (history.length % 3 === 0 ? defaultBreakSec * 3 : defaultBreakSec) : defaultSec;
            const notification = new Notification(status ? '休憩に入りましょう' : '集中して作業をしましょう');
            setTimeout(notification.close.bind(notification), 2 * 1000);
            status = !status;
        }

        timerId = setTimeout(timer, INTERVAL);
    };

    const button = document.querySelector('.js-timer-btn');

    if (!button) {
        return;
    }

    button.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        switch (target.dataset.status) {
            case ButtonStatus.START:
                timerId = setTimeout(timer, INTERVAL);
                target.dataset.status = ButtonStatus.STOP;
                button.textContent = 'STOP';
                break;
            case ButtonStatus.PAUSE:
            case ButtonStatus.STOP:
                clearTimeout(timerId);
                target.dataset.status = ButtonStatus.START;
                button.textContent = 'START';
                break;
            default:
                break;
        }
    });

    const resetButton = document.querySelector('.js-reset-btn');

    if (!resetButton) {
        return;
    }

    resetButton.addEventListener('click', () => {
        sec = defaultSec;
    });
});