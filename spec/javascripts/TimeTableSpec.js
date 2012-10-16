describe("TimeTable", function() {

    var timeTable;

    // it の前に実行される
    beforeEach(function() {
        timeTable = new TimeTable();
    });

    // it の後に実行される
    afterEach(function() {
        timeTable = null;
    });

    it("Dateから時間をhh:mmフォーマットに変換する", function() {
        var date1 = new Date(2012, 10, 16, 15, 10);
        var date2 = new Date(2012, 10, 16, 0, 2);
        expect(timeTable.formatDate(date1)).toEqual("15:10");
        expect(timeTable.formatDate(date2)).toEqual("00:02");
    });

    it("1桁数字は0を補完して2桁にする", function() {
        var num1 = 1;
        var num2 = 32;
        expect(timeTable.format2Didits(num1)).toEqual("01");
        expect(timeTable.format2Didits(num2)).toEqual(32);
    });

    it("2桁より大きい数字はエラーを返す", function() {
        expect(function(){ timeTable.format2Didits(123); }).toThrow("ERROR");
    });

    it("テキストデータをTrainにコンバートする", function() {
        var data = "新木場,5:32";
        var train = timeTable.convertToTrain(data);
        var date = new Date();
        date.setHours(5);
        date.setMinutes(32);
        expect(train.departureTime).toEqual(date);
        expect(train.arrivalStation).toEqual("新木場");
    });

    describe("出力系", function() {

        var testH1;
        var testDiv;

        beforeEach(function() {
            testH1 = document.createElement("h1");
            testDiv = document.createElement("div");
            testDiv.id = "timeTable";
            document.body.appendChild(testH1);
            document.body.appendChild(testDiv);
        });

        afterEach(function() {
            document.body.removeChild(testH1);
            document.body.removeChild(testDiv);
            testH1 = null;
            testDiv = null;
        });

        it("h1にタイトルが入る", function() {
            timeTable.outputTitle();
            var h1 = document.getElementsByTagName("h1");
            expect(h1[0].innerHTML).toEqual("上り(新木場方面)");
        });

        it("タイムテーブルを出力する", function() {
            var trains = [new Train(16, 10, "渋谷")];
            timeTable.outputTimeTable(trains);
            var div = document.getElementById("timeTable");
            var ul = div.getElementsByTagName("ul");
            expect(ul[0].innerHTML).toEqual("<li>16:10 渋谷</li>");
        });

        it("1時間以内の電車がない時にメッセージを出力する", function() {
            var trains = [];
            timeTable.outputTimeTable(trains);
            var div = document.getElementById("timeTable");
            expect(div.innerHTML).toEqual("<p>これから1時間の間に電車はありません。</p>");
        });

    });

});
