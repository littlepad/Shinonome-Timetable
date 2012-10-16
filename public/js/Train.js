function Train(hour, minute, arrivalStation) {
    var departureTime = new Date();
    var arrivalStation = arrivalStation;

    departureTime.setHours(hour);
    departureTime.setMinutes(minute);

    return {
        departureTime: departureTime,
        arrivalStation: arrivalStation
    };
}
