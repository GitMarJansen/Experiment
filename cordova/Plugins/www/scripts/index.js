// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    var map;

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        


        // Network information plug-in
        checkConnection();
        document.addEventListener('offline', offline, false);
        document.addEventListener('online', online, false);


        // Map plug-in
        // Initialize the map view
        //var div = document.getElementById("map_canvas");
        //map = plugin.google.maps.Map.getMap(div);
        //map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);


        // Inappbrowser plug-in
        var button = document.getElementById("dialButton");
        button.addEventListener("click", dialNumber, false);


        //Device plug-in
        console.log('Device: ' + device.platform + ' - ' + device.model + ' - ' + device.version);
        console.log('UUID:   ' + device.uuid);

        //GeoLocation plug-in
        var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, options);


        //SQLite

        window.sqlitePlugin.echoTest(function () {
            console.log('EchoTest: Success');
        }, function () {
            console.log('EchoTest: Failure');
        });
        window.sqlitePlugin.selfTest(function () {
            console.log('SelfTest: Success');
        }, function() {
            console.log('SelfTest: Failure');
        });

        prepareDB();
        document.getElementById("addRecord").addEventListener("click", addRecord, false);
        document.getElementById("countRecords").addEventListener("click", countRecords, false);
        document.getElementById("deleteRecord").addEventListener("click", deleteRecord, false);
    };

    function prepareDB() {
        window.sqlitePlugin.openDatabase({ name: 'DemoDB', location: 'default' }, function (db) {
            console.log('Database opened');
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,number INTEGER)', [], function () {
                    console.log('Database created');
                }, sqliteErrorCB);
            }, sqliteErrorCB);
        }, sqliteErrorCB);
    }

    function addRecord() {
        window.sqlitePlugin.openDatabase({ name: 'DemoDB', location: 'default' }, function (db) {
            console.log('Database opened');
            db.transaction(function (tx) {
                var query = 'INSERT INTO DEMO (name, number) VALUES (?, ?)';
                var values = ['Hilmar Jansen', 79];
                tx.executeSql(query, values, function () {
                    console.log('Data added');
                }, sqliteErrorCB);
            }, sqliteErrorCB);
        }, sqliteErrorCB);
    }

    function countRecords() {
        window.sqlitePlugin.openDatabase({ name: 'DemoDB', location: 'default' }, function (db) {
            console.log('Database opened');
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM DEMO', [], function (tx, result) {
                    console.log('retrieved data: ' + result.rows.length + ' rows');
                    for (var i = 0; i < result.rows.length; i++){
                        var row = result.rows.item(i);
                        console.log('data:           ' + row.id + ' -> ' + row.name);
                    }
                }, sqliteErrorCB);
            }, sqliteErrorCB);
        }, sqliteErrorCB);
    }

    function deleteRecord() {
        window.sqlitePlugin.openDatabase({ name: 'DemoDB', location: 'default' }, function (db) {
            console.log('Database opened');
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM DEMO', [], function (tx, result) {
                    if (result.rows.length > 0) {
                        var id = result.rows.item(0).id;
                        tx.executeSql('DELETE FROM DEMO WHERE id=?', [id], function () {
                            console.log('deleted row with id ' + id);
                        }, sqliteErrorCB);
                    }
                }, sqliteErrorCB);
            }, sqliteErrorCB);
        }, sqliteErrorCB);
    }

    var onLocationSuccess = function (position) {
        console.log('Latitude:  ' + position.coords.latitude + '\n' +
              'Longitude: ' + position.coords.longitude + '\n' +
              'Altitude:  ' + position.coords.altitude + '\n' +
              'Accuracy:  ' + position.coords.accuracy + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
              'Heading:   ' + position.coords.heading + '\n' +
              'Speed:     ' + position.coords.speed + '\n' +
              'Timestamp: ' + position.timestamp + '\n');
    };

    function onLocationError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }


    function onMapReady() {
        var button = document.getElementById("button");
        button.addEventListener("click", onBtnClicked, false);
    }

    function onBtnClicked() {
        map.showDialog();
    }

    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        console.log('Connection type: ' + states[networkState]);

    }

    function offline(ev) {
        console.log('Network off-line');
    }

    function online(ev) {
        console.log('Network on-line');
    }


    function dialNumber() {
        placeCall("+31 318 785369");
    }

    function placeCall(num) {
        if (window.cordova) {
            cordova.InAppBrowser.open('tel:' + num.replace(/\s/g, ''), '_system');
        }
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };



    // Transaction error callback
    //
    function sqliteErrorCB(err) {
        alert("Error processing SQL: " + err.code);
    }

} )();