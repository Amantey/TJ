$(document).ready(function () {
    var availableTags;


    $.ajax({
        type: "GET",
        url: 'AutoComplete/GetGroup',
        dataType: "json",
        success: function (data) {
            $("#gr1").autocomplete({
                source: data
            })
            $("#gr2").autocomplete({
                source: data
            })
            $("#gr3").autocomplete({
                source: data
            })
        }
    })
    $.ajax({
        type: "GET",
        url: 'AutoComplete/GetPredmet',
        dataType: "json",
        success: function (data) {
            $("#nameSubject").autocomplete({
                source: data
            })
           
        }
    })
    // задаем массив в качестве источника слов для автозаполнения.
    
            
})