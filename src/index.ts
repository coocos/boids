const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.fillRect(canvas.width / 2 - 48, canvas.height / 2 - 48, 48, 48);
