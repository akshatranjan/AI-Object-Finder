status = "";
object = "";
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function preload()
{
    video = createCapture(VIDEO);
    video.size(480, 480);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("name").value;
}

function modelLoaded()
{
    console.log("Model is loaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380);
}