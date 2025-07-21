const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function clearCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function circle(x, y, color, borderThickness, borderColor) {
    ctx.beginPath();
    ctx.arc(x, y, borderThickness > 0 ? borderThickness : 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    if (borderThickness > 0 && borderColor) {
        ctx.lineWidth = borderThickness;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
    }
}

function line(a, b, color, borderThickness, borderColor) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = borderColor || color;
    ctx.lineWidth = borderThickness;
    ctx.stroke();
}

function rectangle(rect, color, borderThickness, borderColor) {
    const { x, y, width, height } = rect;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    if (borderThickness > 0 && borderColor) {
        ctx.lineWidth = borderThickness;
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, width, height);
    }
}
function callCanvas(...args) {
    const [method, ...params] = args;
    if (typeof ctx[method] === "function") {
        ctx[method](...params);
    } else {
        console.warn(`Canvas method ${method} does not exist`);
    }
}