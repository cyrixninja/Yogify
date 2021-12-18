let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/AEqvygkRD/';
let video;
let flippedVideo;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
 let value1= "You're doing nothing"
  if (label == "Goddess") {
    value1 = "You're doing Goddess";
  } else if (label == "Plank") {
    value1 = "You're doing Plank Pose";
  } else if (label == "Tree") {
    value1 = "You're doing Tree Pose";
  }
 else if (label == "Warriror") {
    value1 = "You're doing Warrior Pose";
  }
   else if (label == "Downdog") {
    value1 = "You're doing Downdog Pose";
  }

  textSize(35);
  text(value1, width / 2, height / 2);

}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}