describe("Train", function() {

    var train;

    // it の前に実行される
    beforeEach(function() {
        train = new Train(10, "09", "新宿");
    });

    // it の後に実行される
    afterEach(function() {
        train = null;
    });

    it("出発時間を保持する", function() { 
        var date = new Date();
        date.setHours(10);
        date.setMinutes(9);
        expect(train.departureTime).toEqual(date);
    });

    it("終点を保持する", function() {
        expect(train.arrivalStation).toEqual("新宿");
    });

});
