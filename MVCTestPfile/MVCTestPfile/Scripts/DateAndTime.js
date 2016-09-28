$(document).ready(function () {

    // вписывает дату в таблицу
    function SetInHeadDate(date) {
        $("#dateAndMonth").text(date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear());
    }


    // вставляет картинку(Надпись дня недели) в зависимости от дня недели
    function AddImageOnTableDay(date) {
        var today = date.getDay();
        var src = "";
        switch (today) {
            case 1: {
                src = "/Images/Monday.png";
                break;
            }
            case 2: {
                src = "/Images/Tuesday.png";
                break;
            }
            case 3: {
                src = "/Images/Wendsday.png";
                break;
            }
            case 4: {
                src = "/Images/Thursday.png";
                break;
            }
            case 5: {
                src = "/Images/Friday.png";
                break;
            }
            case 6: {
                src = "/Images/Saturday.png";
                break;
            }

        }

        var td = document.getElementById("dateAndMonth");
        var image = document.createElement('img');
        image.src = src;
        td.appendChild(image);

    }




    //устанавливает дату на collapse в зависимости от даты
    function initializationWeek(date) {
        var today = date.getDay();
        var archive = date;
        index = 1;

        $(as[today]).text(date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear());
        SetInHeadDate(date);
        AddImageOnTableDay(date);

        for (i = today - 1; i >= 0; i--) {
            if (date.getDate() - index < 1) {

                date = new Date(date.getFullYear(), date.getMonth() - 1, GetDayOfMonth(date, -1));
                index = 0;
            }
            $(as[i]).text(PreviouslyDay(date, index) + "." + (date.getMonth() + 1) + "." + date.getFullYear());
            index++;
        }
        date = archive;
        index = 1;
        for (i = today + 1; i <= 6; i++) {

            if (date.getDate() + index > GetDayOfMonth(date, 0)) {
                date = new Date(date.getFullYear(), date.getMonth() + 1, 1);

                index = 0;
            }
            $(as[i]).text(NextDay(date, index) + "." + (date.getMonth() + 1) + "." + date.getFullYear());
            index++;
        }
    }

    //Возвращает предыдущий день в зависимости от смещения
    function PreviouslyDay(currently, smesh) {//currently - текущий день, smesh - смещение по дате от текущего дня(в днях)

        if (currently.getDate() - smesh < 1) {

            var daysOfPreviuslyMonth = GetDayOfMonth(currently, -1);
            return daysOfPreviuslyMonth - currently.getDate() - smesh;
        }
        else {
            return currently.getDate() - smesh;
        }
    }
    /*Возвращает следующий день в записимости от смещение 
    где currently - текущий день, smesh - смещение*/
    function NextDay(currently, smesh) {
        if (currently.getDate() + smesh > GetDayOfMonth(currently, 0)) {
            var DayOfThisMonth = GetDayOfMonth(currently, 0);
            return DayOfThisMonth - currently.getDate() + smesh;
        }
        else return Math.abs(currently.getDate() + smesh);

    }
    //Возвращает следующую неделю от текущей
    //по нажатию кнопки
    $("#next-week").on("click", function () {

        if (archievDate.getDate() + 7 > GetDayOfMonth(archievDate, 0)) {
            var count = archievDate.getDate() + 7 - GetDayOfMonth(archievDate, 0);
            if (archievDate.getMonth == 11) { archievDate.setFullYear(archievDate.getFullYear() + 1); }
            archievDate = new Date(archievDate.getFullYear(), (archievDate.getMonth() + 1), count);
        }
        else archievDate = new Date(archievDate.getFullYear(), archievDate.getMonth(), (archievDate.getDate() + 7));
        initializationWeek(archievDate);

    });
    //Возвращает предыдущую неделю от текущей
    //по нажатию кнопки
    $("#back-week").on("click", function () {
        if (archievDate.getDate() - 7 < 1) {
            var count = Math.abs(archievDate.getDate() - 7);

            if (archievDate.getMonth == 0) { archievDate.setFullYear(archievDate.getFullYear() - 1); }
            archievDate = new Date(archievDate.getFullYear(), (archievDate.getMonth() - 1), GetDayOfMonth(archievDate, -1) - count);
        }
        else archievDate = new Date(archievDate.getFullYear(), archievDate.getMonth(), (archievDate.getDate() - 7));
        initializationWeek(archievDate);
    });


    // Возвращает число дней в месяце
    // где currently - текущий месяц, index - при 0 возвращает текущий месяц, при -1 предыдущий, при 1 следующий месяц 
    function GetDayOfMonth(currentlyMonth, index) {

        var month = currentlyMonth.getMonth();


        if (index == -1) {
            if (currentlyMonth.getMonth() == 0) month = 11;
            else month = currentlyMonth.getMonth() - 1;

        }
        else if (index == 1) {
            if (currentlyMonth.getMonth() == 11) month = 0;
            else month = currentlyMonth.getMonth() + 1;

        }
        switch (month) {

            case 0: {
                return 31;
            }
            case 1: {
                if (currentlyMonth.getFullYear() % 4 == 0) return 29;
                else return 28;
            }
            case 2: {
                return 31;
            }
            case 3: {

                return 30;
            }
            case 4: {
                return 31;
            }
            case 5: {
                return 30;
            }
            case 6: {
                return 31;
            }
            case 7: {
                return 31;
            }
            case 8: {
                return 30;
            }
            case 9: {
                return 31;
            }
            case 10: {
                return 30;
            }
            case 11: {
                return 31;
            }
        }
    }

    //подсвечивает текущий день на вкладке ежедневник
    function illuminationDay(date) {
        id = "day" + date.getDay();

        $("#" + id).addClass("illumination");
    }

});