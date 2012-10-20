function Train(hour, minute, arrival) {
    var departureTime = new Date(),
    arrivalStation = arrival;

    departureTime.setHours(hour);
    departureTime.setMinutes(minute);

    return {
        departureTime: departureTime,
        arrivalStation: arrival
    };
}
