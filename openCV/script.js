let canvasFrame; // canvasFrame is the id of <canvas>
let context;
let src;
let dst;
let video;
const width = 300;
const height = 300;

document.addEventListener('DOMContentLoaded', function() {
  canvasFrame = document.getElementById("canvasFrame"); // canvasFrame is the id of <canvas>
  context = canvasFrame.getContext("2d");
});

function openCVready() {
  document.getElementById("status").innerHTML = "openCV is <b>ready</b>";
  src = new cv.Mat(height, width, cv.CV_8UC4);
  dst = new cv.Mat(height, width, cv.CV_8UC1);
  captInit();
}

function videoInit() {
  console.log("DEBUG");
  video = document.getElementById("videoInput"); // video is the id of video tag
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred! " + err);
    });
    cap = new cv.VideoCapture(videoSource);
}
