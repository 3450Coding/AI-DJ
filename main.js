song = "";
lWx = 0;
lWy = 0;

rWx = 0;
rWy = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose = ml5.poseNet(video, mL);
    pose.on('pose', gP);
}

function mL() {
    console.log("Model Loaded");
}

function Playing() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function draw() {
    image(video, 0, 0, 600, 600);

    fill("#3449eb");
    stroke("#3449eb");

    if (rcore > 0.2) {
        circle(rWx, rWy, 20);
        if (rWy > 0 && rWy <= 100) {
            document.getElementById("S").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rWy > 100 && rWy <= 200) {
            document.getElementById("S").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rWy > 200 && rWy <= 300) {
            document.getElementById("S").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rWy > 300 && rWy <= 400) {
            document.getElementById("S").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rWy > 400 && rWy <= 500) {
            document.getElementById("S").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (score > 0.2) {
        circle(lWx, lWy, 20);
        Numbers = Number(lWy);
        numbers2 = floor(Numbers);
        volume = numbers2 / 600;
        song.setVolume(volume);
        document.getElementById("V").innerHTML = "Volume: " + volume;
    }
}

function gP(results) {
    if (results.length > 0) {
        console.log(results);
        score = results[0].pose.keypoints[9].score;
        rcore = results[0].pose.keypoints[10].score;
        console.log("Left Hand " + score);
        console.log("Right Hand " + rcore);
        lWx = results[0].pose.leftWrist.x;
        lWy = results[0].pose.leftWrist.y;
        console.log("leftWrist x = " + lWx + " leftWrist y = " + lWy);

        rWx = results[0].pose.rightWrist.x;
        rWy = results[0].pose.rightWrist.y;
        console.log("rightWrist x = " + rWx + " rightWrist y = " + rWy);
    }
}