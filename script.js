var canvas = document.querySelector('.myCanvas');
var context = canvas.getContext('2d');

setTimeout(function () {

    var randA = Math.floor(Math.random() * 50);
    var randB = randA;
    var randX = Math.floor(Math.random() * 50);
    var randY = Math.floor(Math.random() * 50);
    
    drawFigure(randX, randY, randA, randB);

}, 1000);

/* setInterval(function () {
 
    var randA = Math.floor(Math.random() * 50);
    var randB = randA;
    var randX = Math.floor(Math.random() * 50);
    var randY = Math.floor(Math.random() * 50);    

    drawFigure(randX, randY, randA, randB);

}, 5000); */

var draw = document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var ribA = document.querySelector('input[name=rib_a]').value;
    var ribB = document.querySelector('input[name=rib_b]').value;
    var pointX = document.querySelector('input[name=point_x]').value;
    var pointY = document.querySelector('input[name=point_y]').value;
    var result = document.querySelector('#square');

    if (!checkDigit(ribA) || !checkDigit(ribB) || !checkDigit(pointX) || !checkDigit(pointY)) {
        result.classList.remove('normal');
        result.classList.add('error');
        result.textContent = 'Error: Incorrect number format or a negative number entered';
    } else if (!checkBorder(ribA, pointX, canvas.width) || !checkBorder(ribB, pointY, canvas.height)) {
        result.classList.remove('normal');
        result.classList.add('error');
        result.textContent = 'Error: Incorrect input, the square is cross over the canvas\'s borders';
    } else {
        var square = ribA * ribB;
        result.classList.remove('error');
        result.classList.add('normal');
        result.textContent = 'Square area: ' + square;
        drawFigure(pointX, pointY, ribA, ribB);
    }
});

var btnEven = document.querySelector('.clear');
btnEven.addEventListener('click', function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
})

function drawByClick(event) {
    var clickX = (event.offsetX / (canvas.scrollWidth / canvas.width));
    var clickY = (event.offsetY / (canvas.scrollHeight / canvas.height));

    document.querySelector('input[name=point_x]').value = clickX;
    document.querySelector('input[name=point_y]').value = clickY;

}

function checkBorder(start, side, maxLength) {
    if (Number(start) + Number(side) > Number(maxLength))
        return false;
    return true;
}

function checkDigit(num) {
    var reg = new RegExp('^[0-9]+\.[0-9]+$|^[0-9]+$'); {
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