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

document.addEventListener('DOMContentLoaded', () => {
    const area = document.querySelector('.timer');
    // const defaultSec = 60 * 25;
    const defaultSec = 10;
    const defaultBreakSec = 5;
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
            console.log(history);
            console.log(history.length % 3 === 0);
            sec = status ? (history.length % 3 === 0 ? defaultBreakSec * 3 : defaultBreakSec) : defaultSec;
            status = !status;
        }

        timerId = setTimeout(timer, INTERVAL);
    };

    const button = document.querySelector('button');

    if (!button) {
        return;
    }

    button.addEventListener('click', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement;
        switch (target.dataset.status) {
            case ButtonStatus.START:
                timerId = setTimeout(timer, INTERVAL);
                button.dataset.status = ButtonStatus.STOP;
                button.textContent = 'STOP';
                break;
            case ButtonStatus.PAUSE:
            case ButtonStatus.STOP:
                clearTimeout(timerId);
                button.dataset.status = ButtonStatus.START;
                button.textContent = 'START';
                break;
            default:
                break;
        }
    });
});