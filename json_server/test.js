var coursesApi = 'http://localhost:3000/coursers';
var currentDate = 17;
var pointUsers = [
    {
        id: 1,
        point: 0,
    },
    {
        id: 2,
        point: 0,
    },
    {
        id: 3,
        point: 0,
    },
    {
        id: 4,
        point: 0,
    }
];
var budget = 400;
var codeValid;

function start() {
    getCourses(handleImportMoney);
}

start();

function getCourses(callBack) {
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callBack);
}

function handleImportMoney(infoCodes) {
    var btnNext = document.querySelector('#next');
    var btnApply = document.querySelector('#apply');
    var cash = document.getElementById('cash');
    var point = document.getElementById('point');
    var code = document.getElementById('code');
    
    btnNext.onclick = function() {
        var numberMoney = Number(document.querySelector('#numberMoney').value);

        /* Check sự hợp lệ số tiền nhập vào */
        if (!Number.isInteger(numberMoney) || (numberMoney<=0)) {
            reset();
            alert('Unread, don\'t use');
            return;
        }

        /* Kiem tra HSD code */
        codeValid = checkDate(infoCodes);
        if (!showHidden(codeValid)) {
            reset();
            cash.innerText = `Cash : ${numberMoney}`;
            return;
        }

        /* Kiểm tra số lần sủ dụng */
        codeValid = checkTimes(codeValid);
        if (!showHidden(codeValid)) {
            reset();
            cash.innerText = `Cash : ${numberMoney}`;
            return;
        }

        /* Kiểm tra số tiền nạp dùng code */
        codeValid = checkMoney(codeValid);
        if (!showHidden(codeValid)) {
            reset();
            cash.innerText = `Cash : ${numberMoney}`;
            return;
        }
        
        codeValid = checkPointUser(codeValid);
        if (!showHidden(codeValid)) {
            reset();
            cash.innerText = `Cash : ${numberMoney}`;
            return;
        }

        codeValid = checkPointCode(codeValid);
        if (!showHidden(codeValid)) {
            reset();
            cash.innerText = `Cash : ${numberMoney}`;
            return;
        }

        var automatic = document.getElementById('automatic');
        if(!automatic.checked) {
            automatic.checked = true;
        }

        cash.innerText = `Cash : ${numberMoney}`;
        point.innerText = `Point : ${50}`;
        code.innerText = `${codeValid[0].code}`
    };

    btnApply.onclick = function() {
        if (codeValid == undefined) {
            alert('Nhập số tiền xong click next đã bạn ơi !!');
            return;
        }

        var manuallyCode = document.getElementById('codeManually').value;

        var codeM = codeValid.find((codeDateR) => {
            return codeDateR.code == manuallyCode;
        });

        if (codeM == undefined) {
            alert('Không làm mà đòi có ăn ... !');
            let codeC = document.getElementById('code').innerText;
            if (codeC == '') {
                document.getElementById('automatic').checked = false;
                document.getElementById('manually').checked = false;
            } else {
                document.getElementById('automatic').checked = true;
            }
            return;
        } else {
            document.getElementById('point').innerText = `Point : 50`;
            document.getElementById('code').innerText = codeM.code;
            document.getElementById('manually').checked = true;
        }
    };

    document.getElementById('automatic').addEventListener("click", changeOld);
    function changeOld() {
        point.innerText = `Point : ${50}`;
        code.innerText = `${codeValid[0].code}`
    }

    document.getElementById('manually').addEventListener("click", resetNewCode);
    function resetNewCode() {
        document.getElementById('point').innerText = `Point : 0`;
        document.getElementById('code').innerText = '';
    }

    document.getElementById('payment').onclick = function() {
        alert(document.getElementById('cash').innerText + "\n" + document.getElementById('point').innerText);
    }
}

function checkDate(infoCodes) {
    var dates = infoCodes.map(date => {
        return [date.start_date, date.end_date];
    });

    var indexDate = [];
    dates.forEach((date, index) => {
        if ((date[0] <= currentDate) && (currentDate <= date[1])) {
            return indexDate.push(infoCodes[index]);
        }
    })

    return indexDate;
}

function checkTimes(codeValid) {
    var codeTimes = [];
    codeValid.forEach((codeDateR, index) => {
        if (codeDateR.max_times > 0) {
            codeTimes.push(codeValid[index]);
        }
    })
    return codeTimes;
}

function checkMoney(codeValid) {
    var numberMoney = Number(document.querySelector('#numberMoney').value);
    var codeMoney = [];

    codeValid.forEach((codeDateR, index) => {
        if (numberMoney >= codeDateR.user_min_amount) {
            codeMoney.push(codeValid[index]);
        }
    })
    return codeMoney;
}

function checkPointUser(codeValid) {
    var codePointUser = [];

    codeValid.forEach((codeDateR, index) => {
        pointUsers.forEach((pointUser) => {
            if (pointUser.id == codeDateR.id) {
                if ((pointUser.point + 50) <= codeDateR.user_max_amount) {
                    codePointUser.push(codeValid[index]);
                }
            }
        });
    });
    return codePointUser;
}

function checkPointCode(codeValid) {
    var codePointCode = [];

    codeValid.forEach((codeDateR, index) => {
        if ((codeDateR.budget_using + 50) <= budget) {
            codePointCode.push(codeValid[index]);
        }
    })
    return codePointCode;
}

function showHidden(codeRights) {
    var p = document.querySelector('.show').classList;

    if (codeRights == '') {
        if (p[1] == 'hidden') {
            p.remove('hidden');
        }
        return false;
    } else {
        if (p[1] == undefined) {
            p.add('hidden');
        }
        return true;
    }
}

function makePay() {
    //Sau khi click thì phài giảm đi 1 của max_times;
}

function reset() {
    document.getElementById('automatic').checked = false;
    document.getElementById('manually').checked = false;
    document.querySelector('input[name="code"]').value = '';
    document.getElementById('cash').innerText = `Cash : 0`;
    document.getElementById('point').innerText = `Point : 0`;
    document.getElementById('code').innerText = '';
    showHidden([]);
}