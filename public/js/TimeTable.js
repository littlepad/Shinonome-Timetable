function TimeTable() {   

    var HOUR = 60 * 60 * 1000;
    var TRAIN_DIRECTION_INBOUND = "inbound";
    var DEFAULT_TRAIN_DIRECTION = TRAIN_DIRECTION_INBOUND;
    var _trainDirection = DEFAULT_TRAIN_DIRECTION;

    function execute() {
        restore_options();

        var timeTable = [];
        var timeTableData = new TimeTableData();
        if(_trainDirection == TRAIN_DIRECTION_INBOUND) {
            if(isWeekend(new Date())) {
                timeTable = timeTableData.WEEKEND_INBOUND;
            } else {
                timeTable = timeTableData.WEEKDAY_INBOUND;
            }
        } else {
            if(isWeekend(new Date())) {
                timeTable = timeTableData.WEEKEND_OUTBOUND;
            } else {
                timeTable = timeTableData.WEEKDAY_OUTBOUND;
            }
        }

        var trains = [];
        var date = new Date();
        for (var i = 0; i < timeTable.length; i++) {
            var train = convertToTrain(timeTable[i]);
            if(train.departureTime - date > 0 && train.departureTime - date < HOUR){
                trains.push(train);
            }
        }

        output(trains);
    }

    function restore_options() {
        if(localStorage["train_direction"]) {
            _trainDirection = localStorage["train_direction"];
        } else {
            _trainDirection = DEFAULT_TRAIN_DIRECTION;
        }
    }

    function output(trains) {
        outputTitle();
        outputTimeTable(trains);
    }

    function outputTitle() {
        if(_trainDirection == TRAIN_DIRECTION_INBOUND) {
            document.getElementsByTagName("h1")[0].innerHTML = "上り(新木場方面)";
        } else {
            document.getElementsByTagName("h1")[0].innerHTML = "下り(大崎方面)";
        }
    }

    function outputTimeTable(trains) {
        var timeTableDom = document.getElementById("timeTable");
        if (trains.length > 0) {
            timeTableDom.innerHTML = "<ul>";
            for (var i = 0; i < trains.length; i++) {
                timeTableDom.getElementsByTagName("ul")[0].innerHTML += "<li>" + formatDate(trains[i].departureTime) + " " + trains[i].arrivalStation + "</li>";
            }
        } else {
            timeTableDom.innerHTML = "<p>これから1時間の間に電車はありません。</p>";
        }
    }

    function convertToTrain(data) {
        var result = data.split(',');
        var arrivalStation = result[0];
        var result2 = result[1].split(':');
        var hour = result2[0];
        var min = result2[1];
        return new Train(hour, min, arrivalStation);
    }

    function formatDate(date) {
        var h = format2Didits(date.getHours());
        var m = format2Didits(date.getMinutes());
        return h + ":" + m;
    }

    function isWeekend(date) {
        return (date.getDay() == 0 || date.getDay() == 6);
    }

    function format2Didits(n) {
        if(String(n).length > 2) {
            throw "ERROR";
        }
        return (n < 10) ? "0" + n : n;
    }

    return {
        execute: execute,
        convertToTrain: convertToTrain,
        formatDate: formatDate,
        format2Didits: format2Didits,
        outputTitle: outputTitle,
        outputTimeTable: outputTimeTable,
        isWeekend: isWeekend 
    };

}

