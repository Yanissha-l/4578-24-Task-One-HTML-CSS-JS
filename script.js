var canvas = document.querySelector('.myCanvas');
var context = canvas.getContext('2d');
var clickX = -1;
var clickY = -1;
var ribGlobalA = -1;
var ribGlobalB = -1;

var draw = document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    var form = event.target;

    var ribA = form.querySelector('[name=rib_a]');
    var ribB = form.querySelector('[name=rib_a]');
    var pointX = form.querySelector('[name=point_x]');
    var pointY = form.querySelector('[name=point_y]');
    var result = document.querySelector('#square');

    if (!checkDigit(ribA.value) || !checkDigit(ribB.value) || !checkDigit(pointX.value) || !checkDigit(pointY.value)) {
        result.classList.remove('normal');
        result.classList.add('error');
        result.textContent = 'Error: Incorrect number format or a negative number entered';
    } else if (!checkBorder(ribA.value, pointX.value, canvas.width) || !checkBorder(ribB.value, pointY.value, canvas.height)) {
        result.classList.remove('normal');
        result.classList.add('error');
        result.textContent = 'Error: Incorrect input, the square is cross over the canvas\'s borders';
    } else {
        var square = ribA.value * ribB.value;
        ribGlobalA = ribA.value;
        ribGlobalB = ribB.value;
        result.classList.remove('error');
        result.classList.add('normal');
        result.textContent = 'Square area: ' + square;
        drawFigure(pointX.value, pointY.value, ribA.value, ribB.value);
    }
})

var btnEven = document.querySelector('.clear');
btnEven.addEventListener('click', function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
})

function drawByClick(event) {
    clickX = event.offsetX / 2;
    clickY = event.offsetY / 2.3;
    var result = document.querySelector('#square');

    if (ribGlobalA === -1 || ribGlobalB === -1) {
        var ribA = 20;
        var ribB = 20;
    } else {
        var ribA = ribGlobalA;
        var ribB = ribGlobalB;
    }

    if (!checkBorder(ribA, clickX, canvas.width) || !checkBorder(ribB, clickY, canvas.height)) {
        result.classList.remove('normal');
        result.classList.add('error');
        result.textContent = 'Error: Incorrect input, the square is cross over the canvas\'s borders';
    } else {
        var square = ribA * ribB;
        result.classList.remove('error');
        result.classList.add('normal');
        result.textContent = 'Square area: ' + square;
        drawFigure(clickX, clickY, ribA, ribB);
    }
}

function checkBorder(start, side, maxLength) {
    if (Number(start) + Number(side) > Number(maxLength))
        return false;
    return true;
}

function checkDigit(num) {
    var reg = new RegExp('^[0-9]*$'); {
        if (!reg.test(num)) {
            return false;
        }
    }
    return true;
}

function drawFigure(startX, StartY, SideX, SideY) {
    context.beginPath();
    context.rect(startX, StartY, SideX, SideY);
    context.closePath();
    context.lineWidth = 0.5;
    context.stroke();
}