// Variable initialization
const canvas = document.getElementById("canvasTop");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvasBottom");
const ctx2 = canvas2.getContext("2d");
const canvasOffset = $("#canvasTop").offset();
const offsetX = canvasOffset.left;
const offsetY = canvasOffset.top;
const functElement = document.getElementById("function");
const gridElement = document.getElementById("gridSpace");

// Function to display the position of the cursor
const handleMouseMove = (e) => {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = 1 - (2 * (e.clientY - offsetY) / canvas.height);
    $("#movelog").html("Cursor co-ordinates: x = " + mouseX + " , y = " + mouseY.toFixed(3));
}

$("#canvasTop").mousemove(e => handleMouseMove(e));

const drawCanvas = () => {
    const gridSpace = gridElement.options[gridElement.selectedIndex].value;
    const typeOfWave = functElement.options[functElement.selectedIndex].value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawRulerGrid(gridSpace);
    ctx.beginPath();
    drawGraph(ctx, canvas.width, canvas.height, gridSpace, typeOfWave);
    ctx.stroke();
}

const drawRulerGrid = (gridSpace) => {
    ctx.beginPath();
    ctx2.beginPath();
    ctx.strokeStyle = '#dadae2';
    ctx.fillStyle = '#dadae2'

    for (let i = 0; i < canvas.width; i += 10) {
        let x, y;
        if (i / gridSpace == parseInt(i / gridSpace)) {
            y = 0;
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx2.strokeText(i / gridSpace, i + 15, 15);
        } else {
            y = 10
        }
        ctx2.moveTo(i + 25, y);
        ctx2.lineTo(i + 25, 15);

        if (i / gridSpace == parseInt(i / gridSpace)) {
            x = 5;
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx2.strokeText((canvas.height - 2 * i) / canvas.height, 0, i + 15);
        } else {
            x = 15;
        }
        ctx2.moveTo(x, i + 15);
        ctx2.lineTo(25, i + 15);
    }
    ctx.stroke();
    ctx2.stroke();
}

const drawGraph = (context, width, height, gridSpace, typeOfWave) => {
    context.strokeStyle = '#0D47A1';
    context.fillStyle = '#0D47A1';
    context.moveTo(0, 250);
    const waveFunctions = {
        sine: (y) => Math.sin(-y),
        cosine: (y) => -Math.cos(y),
    }
    for (let i = 0; i <= width; i += 10) {
        x = i * (Math.PI / (gridSpace * 2));
        y = waveFunctions[typeOfWave](x);
        context.lineTo(i, parseInt(y * 250 + 250));
    }
}