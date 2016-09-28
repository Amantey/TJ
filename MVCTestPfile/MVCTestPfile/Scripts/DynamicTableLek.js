$(document).ready(function () {

    //Подсчитывает количество пропусков лекций(пропуском считается любой )
    $("#TableListOfStudentLek tbody tr").each(function () { //запрещает изменять значения столбцов с фамилией студента и кол-во пропусков
        $(this).find("td:first").attr("class", "no-target");
        $(this).find("td:last").attr("class", "col-leave");
    });



    $('#modalListOfStudentLek').on('show.bs.modal', function () {

        CountingLeaving();
    });

    function CountingLeaving() {
        var count = 0;
        var currentIndex = 0;

        $("#TableListOfStudentLek tbody td").each(function () {
            if ($(this).attr("class") == "no-target") return;
            if ($(this).attr("class") == "col-leave") {
                $(this).text(count * 2);
                currentIndex++;
                count = 0;
            }

            if ($(this).text() == "" || $.isNumeric($(this).text())) {
                if ($(this).hasClass("leaving")) {
                    $(this).removeClass("leaving");
                }
                return;
            }

            var index = $(this).parent('tr').index();
            $(this).attr("class", "leaving");
            if (currentIndex == index) {
                count++;
            }

        });
    }
});