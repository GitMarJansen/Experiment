// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var CordovaTS;
(function (CordovaTS) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('offline', offline, false);
            document.addEventListener('online', online, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var element = document.getElementById("deviceready");
            element.innerHTML = 'Device Ready';
            element.className += ' ready';
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
        function offline(ev) {
            var element = document.getElementById("networkState");
            element.innerHTML = 'Network offline';
            element.className += ' ready';
        }
        function online(ev) {
            var element = document.getElementById("networkState");
            element.innerHTML = 'Network online';
            element.className += ' ready';
        }
    })(Application = CordovaTS.Application || (CordovaTS.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(CordovaTS || (CordovaTS = {}));
//# sourceMappingURL=appBundle.js.map