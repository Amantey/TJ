$(document).ready(function () {
    var dData;
    var day;
    var num;


    var id = "";
    $.ajax({
        type: "GET",
        url: 'Home/GetRaspisanie',
        dataType: "json",
        success: function (data) {
            addSybject(data);
        }
    });
    
    var archievDate = new Date();

    var divs = $('.block-day');
    var as = $('div.panel-heading a');
    


    //initializationWeek(new Date());
    //SetInHeadDate(new Date());
    //AddImageOnTableDay(new Date());
    illuminationDay(new Date());

    $('#calExample').on('click', function () {
        archievDate = new Date($('#calendarik').val());
        initializationWeek(new Date($('#calendarik').val()));
    })



    
    $('.zagruzka-grup').on('click', function () {
        $.post('Home/PostGrup', { str: $('[name="Группа1"]').val() }, function (response) {
            $('.zagruzka-contenta').append(response);
        });
        //$.ajax({
        //    type: "POST",
        //    url: 'Home/PostGrup',
        //    data:{str:$('[name="Группа1"]').val()},
        //    dataType: "xml",
        //    success: function (data) {
        //        $('zagruzka-contenta').append(data);
        //    }
        //})
    })
    $('#addForm').submit(function (event) {
        event.preventDefault();
        var data = $(this).serialize();
        $.post('Home/AddStudi', data, function (response) {
            $('#comments').append(response);
        });
    });
    $('.comment').on('click', function () {
        var parent = $(this).parent().attr('class');
        num = String(parent).substring(0, 1);
        var tType = String(parent).substring(1, 2);
        day = String(parent).substring(2, 3);
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }
        $('#comment').val(null);
        for (var i = 0; i < dData.length; i++) {
            if (Number(dData[i].День_недели) == Number(day)) {
                if (Number(dData[i].Номер_пары) == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {
                        id = dData[i].id_расписания;
                        $('#comment').val(dData[i].Примечание);
                        break;
                    }
                }
            }
        }
    })
    $('body').on('click', '.subject', function () {
        var parent = $(this).parent().attr('class');
        num = String(parent).substring(0, 1);
        var tType = String(parent).substring(1, 2);
        day = String(parent).substring(2, 3);
        $('[name = "Название_предмета"]').val(null);
        $('[name = "Номер_аудитории"]').val(null);
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }

        for (var i = 0; i < dData.length; i++) {
            if (Number(dData[i].День_недели) == Number(day)) {
                if (Number(dData[i].Номер_пары) == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {

                        id = dData[i].id_расписания;

                        $('[name = "Название_предмета"]').val(dData[i].Название_предмета);
                        $('[name = "Номер_аудитории"]').val(dData[i].Номер_аудитории);
                        $('[name = "Тип_занятия"]').val(dData[i].Тип_занятия);
                        $('[name = "неделя"]').val(String(dData[i].Верхняя_неделя));
                        break;
                    }
                }
            }
        }

    })
    /*$('.group').on('click', function () {
        var parent = $(this).parent().attr('class');
        num = Number((parent).substring(0, 1));
        var tType = String(parent).substring(1, 2);
        day = Number((parent).substring(2, 3));
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }
        $('#gr1').val(null);
        $('#gr2').val(null);
        $('#gr3').val(null);
        for (var i = 0; i < dData.length; i++) {
            if (dData[i].День_недели== Number(day)) {
                if (dData[i].Номер_пары == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {
                        id = dData[i].id_расписания;
                        $('#gr1').val(dData[i].Группа1);
                        $('#gr2').val(dData[i].Группа2);
                        $('#gr3').val(dData[i].Группа3);
                        break;
                    }
                }
            }
        }
    })

    */

    $('#sub').submit(function (event) {

        event.preventDefault();
        var url = '/Home/FileXL';
        var data = $(this).serialize();

        $.post(url, { str: $('#textGrup').val(), file: $('#textGrup').file }, function (response) { })


    })


    $(as).click(function () {
        console.log($(" div.panel-body"));
        var now1 = $(this).text()
        var url = '/Home/AddComment';
        $.post(url, { Comment: now1 }, function (response) {
            $("div.panel-body").text(response);
        });
    })

    $('#AddSubject').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddSubject',
            dataType: "json",
            data: {d:day, p:num, Id:id, Название_предмета:$('[name = "Название_предмета"]').val(),
                Номер_аудитории: $('[name = "Номер_аудитории"]').val(),
                Тип_занятия: $('[name = "Тип_занятия"]').val(),
                неделя:$('[name = "неделя"]').val()},
            success: function (response) {
                addSybject(response);
            }
        })
    });
    $('#AddComment').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddComment',
            dataType: "json",
            data: {
                Comment: $('#comment').val(),
                id:id
            },
            success: function (response) {
                addSybject(response);
            }
        })
    })
    $('#AddGroup').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddGroup',
            dataType: "json",
            data: {
                gr1: $('#gr1').val(),
                gr2: $('#gr2').val(),
                gr3: $('#gr3').val(),
                id: id
            },
            success: function (response) {
                addSybject(response);
            }
        })
    })
    $('#viewgr1').click(function (event) { 
        var gr = '#gr1';
        SelectStud($(gr).val());
    })
    $('#viewgr2').click(function(event){
        var gr = '#gr2';
        SelectStud($(gr).val());
    })
    $('#viewgr3').click(function (event) {
        var gr = '#gr3';
        SelectStud($(gr).val());
    });

    ////////////////////////////////////////////////тут типо мой код//////////////////////////////////////////////////////////////////////

    //скрывает "продолжительность" пар, при переключение флажка(modalsubject)
    $('#check_period').change(function () {
        
        alert($('#check_period : checked'));
        if ($('#check_period : checked')) {

            $('#period').attr('hidden', false);
        } else {
            $('#period').attr('hidden', true);
        }
    });

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
            archievDate = new Date(archievDate.getFullYear(), (archievDate.getMonth() - 1), GetDayOfMonth( archievDate, -1) - count);
        }
        else archievDate = new Date(archievDate.getFullYear(), archievDate.getMonth(), (archievDate.getDate() - 7));
        initializationWeek(archievDate);
    });


    // Возвращает число дней в месяце
    // где currently - текущий месяц, index - при 0 возвращает текущий месяц, при -1 предыдущий, при 1 следующий месяц 
    function GetDayOfMonth(currentlyMonth, index) {

        var month = currentlyMonth.getMonth();


        if (index == -1)
        {
            if (currentlyMonth.getMonth() == 0) month = 11;
            else month = currentlyMonth.getMonth() - 1;
            
        }
        else if (index == 1){
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

    //скрывает расписание при нажатии на область
    $(".dayOnClick").on('click', function () {
        $("#timetable").addClass("table-hide");

        $("#detailTable").removeClass("table-hide");
       
        var classList = $(this).attr('class').split(/\s+/);
        $.each(classList, function (index, item) {
            if (item != 'dayOnClick') {
                $("#imageCenterDetailTable").attr("src", "/Images/"+ item +".png");
            }
        });
    });

    $("#back-on-table").on("click", function () {
        $("#timetable").removeClass("table-hide");
           
        $("#detailTable").addClass("table-hide");
    });

    //ставит и удаляет "н-ки" на модальной форме лекции
    $("#TableListOfStudentLek td").on("click", function () {
        
        if ($(this).text() != "Н" && $("#cleaning-mode").prop('checked') == false) {
            
            $(this).text("Н");
            
        }
        else if ($("#cleaning-mode").prop('checked') == true) {
            
            $(this).text(null);
        }
       
    });




    //<*------*>
    // блок отвечает за объединение пар на модальном окне листа практики

    var isCtrl;
    var countmass = 0;
    var mass = [];
    var isShift;
    var isBreak = false;

    $(document).keydown(function (e) {
        if (e.which == '17'){
            isCtrl = true;
         
        }
        if (e.which == '16') {
            isShift = true;
        }

        if (event.keyCode == 13) {	//если это Enter
            $('#edit').blur();	//снимаем фокус с поля ввода
        }
    });
    $(document).keyup(function (e) {
        if (e.which == '17') {
            isCtrl = false;
        }
        if (e.which == '16') {
            isShift = false;
        }
        unionTable(mass);
        
        countmass = 0;
        mass.length = countmass;
    });
    
    var FlagTwoColumn = 0;
    $("#TableListOfStudentPrak td").on("click", function () {
        if (isCtrl == true) {
            var colIndex = $(this).parent().children().index($(this));
        
            var colspan = $("#modalListOfStudentPrak tbody tr td:nth-child(" + (colIndex+1) + ")").attr("colspan");
            if (colspan != undefined) {
                FlagTwoColumn++;
            }
            if (mass.length != 0) {
                
                for (var i = 0; i < mass.length; i++) {

                    if(colIndex == mass[i]){
                        return;
                    }
                    
                    if (FlagTwoColumn >= 2) {
                        FlagTwoColumn = 0;
                        return;
                    }
                    if (mass[i] + 1 == colIndex || mass[i] - 1 == colIndex) {
                        countmass++;
                        mass.length = countmass;
                        mass[countmass - 1] = colIndex;
                    }
                    
                }

            } else {
                
                

                countmass++;
                mass.length = countmass;
                mass[countmass - 1] = colIndex;
            }
        }
    });

    function unionTable(mass) {
        if (mass.length <= 1 || FlagTwoColumn >= 2) return;
        else {
            var min = mass[0]
            for (var i = 0; i < mass.length; i++) {
                if (mass[i] < min)
                    min = mass[i];
            }
            min += 1;
            var colspan
            if ($("#modalListOfStudentPrak tbody tr td:nth-child(" + min + ")").attr("colspan") == undefined) {
                colspan = 0;
            }
            else { colspan = Number($("#modalListOfStudentPrak tbody tr td:nth-child(" + min + ")").attr("colspan")) - 1; }
            
            colspan =  colspan + mass.length;
            $("#modalListOfStudentPrak tbody tr td:nth-child(" + min + ")").each(function(){
                $(this).attr("colspan", colspan);
            })
            
            for (var i = 0; i < mass.length- 1; i++) {
                $('#modalListOfStudentPrak tr>td:last-child').remove();
            }
        }

    }




    ////////////////блок отвечающий за разбитие ячеек//////////////////

    
    $("#TableListOfStudentPrak td").on("click", function () {
        if (isShift == true ) {
            var colIndex = $(this).parent().children().index($(this));
        
            var colspan = $("#modalListOfStudentPrak tbody tr td:nth-child(" + (colIndex + 1) + ")").attr("colspan");
          
            if (colspan == undefined) {
                
                return;
            }
            else {
                BreakColumn(colIndex);
            }
        }
    });

    function BreakColumn(index) {
        var countCol;
        $("#modalListOfStudentPrak tbody tr td:nth-child(" + (index+1) + ")").each(function () {
            countCol = $(this).attr("colspan");
            $(this).removeAttr("colspan");
        })

        for (var j = 0; j < countCol - 1; j++) {
            for (var i = 0; i < $("#modalListOfStudentPrak").length; i++) {
                $('#modalListOfStudentPrak tbody tr').append('<td>');
            }
        }
        
    }

    // <*------*>
    //////////////////////////блок отвечающий за ввод в ячейку таблицы \\\\\\\\\\\\\\\\

    $('#modalListOfStudentPrak tbody td').click(function (e) {
        if (isCtrl == true || isShift == true) { return;}
        var t = e.target || e.srcElement;
        //получаем название тега
        var elm_name = t.tagName.toLowerCase();
        //если это инпут - ничего не делаем
        if (elm_name == 'input') { return false; }

        var val = $(this).html();	//получаем значение ячейки
        //формируем код текстового поля
        var code = '<input type="text" id="edit" value="' + val + '" />';
        //удаляем содержимое ячейки, вставляем в нее сформированное поле
        $(this).empty().append(code);
        //устанавливаем фокус на свеженарисованное поле
        $('#edit').focus();
        $('#edit').blur(function () {	//устанавливаем обработчик
            var val = $(this).val();	//получаем то, что в поле находится
            //находим ячейку, опустошаем, вставляем значение из поля
            $(this).parent().empty().html(val);
        });
    });


///////////////////////////////////////////////////////и вот тут типо он закончился/////////////////////////////////////////////////////////////////
    function addSybject(data) {
       
       
        dData = data;
        for (var i = 0; i < data.length; i++) {
            addSubjOnDailylog(data, i)
        }
    }
    function SelectStud(gr)
    {
        $.ajax({
            type: "GET",
            url: 'Home/SelectStud',
            dataType: "json",
            data: {
                grup: gr
            },
            success: function (response) {
                if (response.length == 0) {
                    $('#viewsstud').html('Нету студентов')
                }
                else {
            //        $('#viewsstud').html(' <div class="table-responsive">' +
            //'<table class="table table-striped table-bordered">' +
            //' <tbody>')
                    for (var i = 0; i < response.length; i++) {
                        $('#viewsstud').html('<div class="asdfsd"></div>'+ response.Фамилия + ' ' + response.Имя + ' ' + response.Отчество)
                    }
                    //$('#viewsstud').append('</tbody></table></div>');
                }
            }
        })
    }
})
