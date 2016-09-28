$(document).ready(function () {

    var isCtrl;
    var countmass = 0;
    var mass = [];
    var isShift;
    var isBreak = false;
    var isAlt = false;
    $(document).keydown(function (e) {
        if (e.which == '17') {
            isCtrl = true;

        }
        if (e.which == '16') {
            isShift = true;
        }
        if (e.which == '18') {
            isAlt = true;
        }
        if (event.keyCode == 13) {
            $('#edit').blur();
        }
    });
    $(document).keyup(function (e) {
        if (e.which == '17') {
            isCtrl = false;
        }
        if (e.which == '16') {
            isShift = false;
        }
        if (e.which == '18') {
            isAlt = false;
        }
        unionTable(mass);
        FlagColumn = false;
        countmass = 0;
        mass.length = countmass;
    });

    $("#TableListOfStudentPrak thead tr:nth-child(odd) th").each(function () {
        $(this).attr("class", "no-target");
    });

    $("#TableListOfStudentPrak tbody tr:nth-child(odd)").each(function () {
        $(this).find("td:first").attr("class", "no-target");
    });


    //вызов модального окна с пометками

    $("#o-listOfMark").on('click', function () {

        $("#modalListOfStudentPrak").modal("hide");
        $("#listOfMark").modal("show");

    });
    // закрытия модального окна с пометками
    $("#c-modalMark").on('click', function () {
        $("#listOfMark").modal("hide");
        $("#modalListOfStudentPrak").modal("show");
    });

    //<*------*>
    // блок отвечает за объединение пар на модальном окне листа практики

    

    var FlagColumn = false;



    $("#TableListOfStudentPrak ").on("click", 'td', function () {

        if (isCtrl == true) {
            if ($(this).hasClass("no-target")) return;
            if ($(this).hasClass("halfNo-target")) return;
            var colIndex = $(this).parent().children().index($(this));

            var colspan = $("#modalListOfStudentPrak tbody tr td:nth-child(" + (colIndex + 1) + ")").attr("colspan");
            if (colspan != undefined) {
                FlagColumn = true;
                return;
            }
            if (mass.length != 0) {

                for (var i = 0; i < mass.length; i++) {

                    if (colIndex == mass[i]) {
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
        if (mass.length <= 1 || FlagColumn == true) return;
        else {

            var min = mass[0]
            for (var i = 0; i < mass.length; i++) {
                if (mass[i] < min)
                    min = mass[i];
            }
            min += 1;
            var colspan;
            if ($("#modalListOfStudentPrak tbody tr td:nth-child(" + min + ")").attr("colspan") == undefined) {
                colspan = 0;
            }
            else { colspan = Number($("#modalListOfStudentPrak tbody tr td:nth-child(" + min + ")").attr("colspan")) - 1; }

            for (var i = 0; i < mass.length - 1; i++) {                 // удаляет лишние ячейки получающиеся при объединение нескольких ячеек
                $('#modalListOfStudentPrak tr:nth-child(odd) td:nth-child(' + (min) + ")").remove();
            }
            for (var i = 0; i < mass.length - 1; i++) {                 // удаляет лишние ячейки в head-строке таблицы, получающиеся при объединение нескольких ячеек
                $('#modalListOfStudentPrak tr:nth-child(even) th:nth-child(' + (min) + ")").remove();
            }

            colspan = colspan + mass.length;


            $("#modalListOfStudentPrak tbody tr:nth-child(odd) td:nth-child(" + min + ")").each(function () { // объединяет ячейки в таблице
                $(this).attr("colspan", colspan);
            })
            $("#modalListOfStudentPrak thead tr:nth-child(even) th:nth-child(" + min + ")").each(function () { // объединяет ячейки в head-строке таблицы
                $(this).attr("colspan", colspan);
            })

            RewriteClassOnCollumn();
        }

    }



    ////////////////блок отвечающий за разбитие ячеек//////////////////


    $("#TableListOfStudentPrak ").on("click", 'td', function () {
        if (isShift == true) {
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
        var numberCol;
        $("#modalListOfStudentPrak tbody tr:nth-child(odd) td:nth-child(" + (index + 1) + ")").each(function () {
            countCol = $(this).attr("colspan");
            numberCol = $(this).index();
            $(this).removeAttr("colspan");
        })

        for (var j = 0; j < countCol - 1; j++) {
            for (var i = 0; i < $("#modalListOfStudentPrak").length; i++) {
                $('#modalListOfStudentPrak tbody tr:nth-child(odd)').find('td:nth-child(' + numberCol + ')').after('<td></td>');
            }
        }

        // делает анологично предыдущему, только для head-строки в таблице практики

        $("#modalListOfStudentPrak thead tr:nth-child(even) th:nth-child(" + (index + 1) + ")").each(function () {
            countCol = $(this).attr("colspan");
            numberCol = $(this).index();
            $(this).removeAttr("colspan");
        })

        for (var j = 0; j < countCol - 1; j++) {
            for (var i = 0; i < $("#modalListOfStudentPrak").length; i++) {
                $('#modalListOfStudentPrak thead tr:nth-child(even)').find('th:nth-child(' + numberCol + ')').after('<th></th>');
            }
        }
        RewriteClassOnCollumn();
    }


    $('#TableListOfStudentPrak tbody tr:nth-child(even) td').addClass('halfNo-target');


    // Вставляет колонку с модулем



    InsertCollumn = function (e) {
        if (isAlt == false || $(this).hasClass('halfNo-target') || $(this).hasClass('no-target')) return;


        var numberOfColumn = $(this).index();

        var numberOfRow = $(this).parent('tr').index();
        var colspan = 0;
        $("#TableListOfStudentPrak tbody tr:nth-child(" + (numberOfRow + 1) + ") td").each(function () {
            if ($(this).index() > numberOfColumn) return;
            if ($(this).hasAttr('colspan')) {
                colspan += Number($(this).attr('colspan') - 1);
            }
        });

        $("#TableListOfStudentPrak tbody tr:nth-child(odd) td.col" + (numberOfColumn - 1)).after("<td class = 'modul'></td>");
        $("#TableListOfStudentPrak tbody tr:nth-child(even) td.col" + (numberOfColumn - 1 + colspan)).after("<td class = 'modul'></td>");


        $("#TableListOfStudentPrak thead tr:nth-child(even) th.col" + (numberOfColumn - 1)).after("<th class = 'modul'></th>");
        $("#TableListOfStudentPrak thead tr:nth-child(odd) th.col" + (numberOfColumn - 1 + colspan)).after("<th class = 'modul'></th>");

        ModulEvaluation();
        RewriteClassOnCollumn();
    }

    // подсчитывает баллы и пропуски, а результат заносится в колонку модуля
    var ModulEvaluation = function () {
        if ($("#TableListOfStudentPrak tbody td").is(".modul") == false) return;

        var countDoubleN = 0;
        var countHalfN = 0;
        var currentIndex = 1;
        $("#TableListOfStudentPrak tbody tr:nth-child(even) td").each(function () {
            if ($(this).hasClass("no-target")) return;
            if ($(this).parent('tr').index() > currentIndex) {
                currentIndex += 2;
                countDoubleN = 0;
                countHalfN = 0;
            }
            if ($(this).hasClass("modul")) {

                $(this).text(countDoubleN * 2 + countHalfN);
                countDoubleN = 0;
                countHalfN = 0;
                return;
            }
            if ($(this).text() == "") return;


            var index = $(this).parent('tr').index();
            $(this).attr("class", "leaving");
            if (currentIndex == index) {
                if ($(this).html() == 'Н/2') {
                    countHalfN++;
                } else countDoubleN++;
            } else { countDoubleN = 0; countHalfN = 0;}

        });

        count = 0;
        currentIndex = 0;
        countLesson = 0;

        $("#TableListOfStudentPrak tbody tr:nth-child(odd) td").each(function () {
            if ($(this).hasClass("no-target")) { return; }

            if ($(this).parent('tr').index() > currentIndex) {
                currentIndex += 2;
                count = 0;
                countLesson = 0;
            }
            if ($(this).hasClass("modul")) {
                if ($('#isRussianBudget').hasClass('ActiveRadioButton')) {
                    $(this).text((count * 6) / countLesson);
                } else{
                    $(this).text((count * 3)/countLesson);
                }
                count = 0;
                countLesson = 0;
                return;
            }

            count += Number($(this).text());
            countLesson++;

        });

    }

    // Переписывает классы колонок после изменения таблицы
    RewriteClassOnCollumn = function () {
        $('#TableListOfStudentPrak tbody td').each(function () {

            $(this).removeClassWild("col*");

            if ($(this).parent('tr').index() % 2 == 0) {
                $(this).addClass("col" + ($(this).index() - 1));
            } else $(this).addClass("col" + $(this).index());
        });
        RewriteClassOnHead();
    }

    // то же что и предыдущий блок, только для ячеек в head строке
    RewriteClassOnHead = function () {
        $('#TableListOfStudentPrak thead th').each(function () {

            $(this).removeClassWild("col*");
            $(this).addClass("col" + ($(this).index() - 1));

        });

    }


    

    // Вставка значений из выплывающего списка


    $('#panel').click(function (e) {

        if ($(this).hasClass('visible')) {

            var elm = e.target || event.srcElement;
            if (elm.id == "panel")
                $(this).removeClass('visible');
        }
        else {
            $(this).addClass('visible');
        }
    });


    var mark = 0;
    $('#markerList li').click(function (e) {

        $("#markerList li").removeClass('activePointList');
        $(this).addClass('activePointList');
        if ($(this).hasClass("remove")) mark = "delete";
        else mark = $(this).html();
    });

    InsertInput = function (e) {
        if (isCtrl == true || isShift == true || isAlt == true || $(this).hasClass("no-target") || $(this).hasClass("col-leave") || $(this).hasClass("modul")) { return; }
        if ($('#panel').hasClass('visible')) {

            if (mark == "delete") {
                $(this).html('');
                if ($(this).hasClass('leaving')) {
                    $(this).removeClass('leaving');
                }
                ModulEvaluation();
                return;
            }

            if ($(this).parent('tr').index() % 2 == 0) {
                if (mark != 'Н' && mark != 'Н/2') {
                    $(this).html(mark);
                }
            } else if (mark == 'Н' || mark == 'Н/2') {
                $(this).html(mark);
                $(this).addClass('leaving');
            }
            ModulEvaluation();
        } else return;
    };

    $('#isRussianBudget').click(function () {
        if ($(this).hasClass('ActiveRadioButton')) {
            $(this).removeClass('ActiveRadioButton').addClass('InactiveRadioButton');
            ModulEvaluation();
        } else { $(this).removeClass('InactiveRadioButton').addClass('ActiveRadioButton'); ModulEvaluation(); }
    });

    RewriteClassOnHead();
    $('.table_Students').on('click', 'td', InsertInput);
    $('.table_Students').on('click', 'th', InsertInput);
    $("#TableListOfStudentPrak ").on("click", 'td', InsertCollumn);
});