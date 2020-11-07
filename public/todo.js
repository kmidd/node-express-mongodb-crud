jQuery(function () {

    $('[data-toggle="collapse"]').on('click', function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(this).text("Hide");
        } else {
            $(this).text("Show");
        }
    });


    $('input[id^="doneCheckbox"]').on('click', function () {

        fetch('/done/' + $(this).closest('tr').attr('id'), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            }
        });
    });

    // set default date in form
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear() + "-" + (month) + "-" + (day);
    $('#doByDate').val(today);
});