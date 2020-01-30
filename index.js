const LEVELS = {
    5: 1,
    15: 2,
    25: 3,
    40: 4,
    55: 5,
    70: 6
};
let i = 1;
let main = $(".main");

addRow();

function addRow() {
    main.append("<div class=\"row" + i + "\"></div>");
    main.find(":last-child").load("/matCalcForm.html", function loadDone() {
        main.find(":last-child form").on("submit", onSubmit);
    });
}

function onSubmit(e) {
    e.preventDefault();
    let formElem = $(this);
    let responseElem = formElem.parent().find(".response");
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
        success: function (data) {
            responseElem.html(data);
        },
        error: function (_jXHR, _textStatus, errorThrown) {
            responseElem.html(errorThrown);
        }
    });
}
