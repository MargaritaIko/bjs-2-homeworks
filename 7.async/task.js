class AlarmClock {
    constructor () {
        this.alarmCollection = [],
        this.timerId = null
    }
    addClock(time, callback, id) {
        if (typeof id === 'undefined') {
            throw new Error('error text');
        }
        else if (typeof this.alarmCollection.find(clock => clock.id === id) !== 'undefined') {
            return console.error('The Alert already exist.');
        }
        return this.alarmCollection.push({id, time, callback});
    }
    removeClock (id) {
        let inputArrLength = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter(clock => clock.id !== id);
        let outputArrLength = this.alarmCollection.length;
        return outputArrLength < inputArrLength;
    }
    getCurrentFormattedTime () {
        let zeroAdd = (number) => {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        let actualTime = new Date();
        let minutes = zeroAdd(actualTime.getMinutes());
        let hours = zeroAdd(actualTime.getHours());
        return hours + ':' + minutes;
    }
    start () {
        let checkClock = (clock) => {
            let alarm = this.getCurrentFormattedTime();
            if (clock.time === alarm) {
                return clock.callback();
            }
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach(clock => checkClock(clock));
            }, 1000);
        }
        return;
    }
    stop () {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            return this.timerId = null;
        }
    }
    printAlarms () {
        return this.alarmCollection.forEach(clock => console.log(clock.id + ': ' + clock.time));
    }
    clearAlarms () {
        this.stop();
        return this.alarmCollection = [];
    }
}



//Examples:

let PhoneClock = new AlarmClock();
PhoneClock.addClock('06:55', () => console.log ('New Day!'), 1);
PhoneClock.addClock('06:56', () => console.log ('New Day Has Come!!!'), 2);
PhoneClock.removeClock(2);
PhoneClock.addClock('06:57', () => console.log ('Wake Up, Buddy!'), 3);
PhoneClock.start();
PhoneClock.stop();
PhoneClock.printAlarms();