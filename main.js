status = "";
object = "";
objects = [];
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
    if (status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i=0; i<objects.length; i++)
        {
            percent = floor(objects[i].confidence * 100);
            fill('#FF0000');
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (object == objects[i].label)
    {
        document.getElementById("status").innerHTML = "Object Found";
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(object + "Found"); synth.speak(utterThis);
    }

    else
    {
        document.getElementById("status").innerHTML = "Object Not Found";
    }
        }
    }
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}