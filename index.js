const LEVELS = {
    5: 1,
    15: 2,
    25: 3,
    40: 4,
    55: 5,
    70: 6
};

$("form").on("submit", function(e) {
    e.preventDefault();
    let formElem = $(this);
    let formData = formElem.serializeArray();
    let dataObj = {};

    for(let i = 0, n = formData.length; i < n; i++) {
        dataObj[formData[i].name] = formData[i].value;
    }

    dataObj.startLevel = LEVELS[parseInt(dataObj.startRank.split("/")[1])];
    dataObj.startRank = parseInt(dataObj.startRank.split("/")[0]);
    dataObj.endLevel = LEVELS[parseInt(dataObj.endRank.split("/")[1])];
    dataObj.endRank = parseInt(dataObj.endRank.split("/")[0]);

    $.ajax({
        url : $(this).attr('action') || window.location.pathname,
        type: "POST",
        data: $.param(dataObj),
        xhrFields: {
            withCredentials: false // cors request
        },
        success: function (data) {
            $(".response").html(data);
        },
        error: function (_jXHR, _textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
});