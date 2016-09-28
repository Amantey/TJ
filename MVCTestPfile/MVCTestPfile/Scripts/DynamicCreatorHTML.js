$(document).ready(function () {
    var content = "<tbody>"
    var columns = "";
    var title = "";


    var CreateTable = function () {
        // КОСТЫЛЬ!
        title += "<thead>";

        for (k = 0; k < 2; k++) {
            title += "<tr>";
            for (j = 0; j < 15; j++) {    // количество колонок          
                title += "<th></th>";
                // ВНИМАНИЕ КОСТЫЛЬ! 
            }
            title += "</tr>";
        }
        title += " </thead>";
        $("#TableListOfStudentPrak").append(title);

        for (j = 0; j < 14; j++) {
            columns += "<td class = " + 'col' + j + " data-toggle = 'popover' title='Заголовок панели' data-content='Текст панели.'></td>";
        }


        for (i = 0; i < 16; i++) {  // строки
            content += '<tr>';
            if (i % 2 == 0) {                   // КОСТЫЛИ, ОНИ ПОВСЮДУ, АААААА!
                content += "<td rowspan='2' class = 'no-target'  >Иванов А.В.</td>" + columns + '</tr>';
            }
            else content += columns + '</tr>';
        }

        content += "</tbody>"
        $("#TableListOfStudentPrak").append(content);
    }

    CreateTable();
});