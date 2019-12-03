let videoInitiated;
let cap;
let streaming = true;
let delay;
const FPS = 30;

function stream() {
  streaming = !streaming;
}

function captInit() {
  videoInitiated = document.getElementById('videoInput');
  cap = new cv.VideoCapture(videoInitiated);
}


function processVideo() {
  if (src == null) {
    begin = Date.now();
    delay = 1000 / FPS - (Date.now() - begin);
    setTimeout(processVideo, delay);
  } else {
    try {
      if (!streaming) {
        // clean and stop.
        src.delete();
        dst.delete();
        return;
      }
      begin = Date.now();
      // start processing.
      cap.read(src);
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      cv.imshow('canvasOutput', dst);
      // schedule the next one.
      delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    } catch (err) {
      console.log(err);;
    }
  }
};

// schedule the first one.
setTimeout(processVideo, 0);
