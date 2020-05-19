const LEVELS = {
    5: 1,
    15: 2,
    25: 3,
    40: 4,
    55: 5,
    70: 6,
    0: 7
};
let i = 1;
let totals = {
  coins: 0,
  bronze: 0,
  silver: 0,
  gold: 0,
  exp: 0
};

addRow();
$(".addRow").on("click", addRow);

function addRow() {
    let rows = $(".rows");

    rows.append("<div class=\"row" + i++ + "\"></div>");
    rows.children(":last-child").load("/matCalcForm.html", function loadDone() {
        rows.children(":last-child").find("form").on("submit", onSubmit);
    });
}

function onSubmit(e) {
    e.preventDefault();
    let formElem = $(this);
    let totalsElem = $(".totals");
    let responseElem = $(".response");
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
            totals.coins += data.coins;
            totals.bronze += data.bronze;
            totals.silver += data.silver;
            totals.gold += data.gold;
            totals.exp += data.exp;
            responseElem.removeClass("d-none")
            responseElem.html(formatResponse(data));

            if (i > 1) {
                totalsElem.removeClass("d-none")
                totalsElem.html(formatResponse(totals))
            }
        },
        error: function (_jXHR, _textStatus, errorThrown) {
            responseElem.removeClass("d-none")
            responseElem.html(errorThrown);
        }
    });
}

function formatResponse(data) {
    return `
        Coins: ${data.coins}<br>
        Bronze Mats: ${data.bronze}<br>
        Silver Mats: ${data.silver}<br>
        Gold Mats: ${data.gold}<br>
        Experience: ${data.exp}
    `;
}
