import {Component} from 'angular2/core';

@Component({
    selector: 'networkstatus',
    template: `<div><p>{{networkstatus}}</p></div>`
})
class NetworkStatus {
    networkstatus : string;
    constructor() {
        document.addEventListener('offline', this.offline, false);
        document.addEventListener('online', this.online, false);
    }

    offline(ev) {
        this.networkstatus = 'Network offline';
    }

    online(ev) {
        this.networkstatus = 'Network online';
    }
}