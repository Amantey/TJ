
$(document).ready(function () {
    // типо плагин для удаления класса по маске
    (function ($) {
        $.fn.removeClassWild = function (mask) {
            return this.removeClass(function (index, cls) {
                var re = mask.replace(/\*/g, '\\S+');
                return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
            });
        };
    })(jQuery);


    // проверяет на наличие аттрибута у тега
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

});