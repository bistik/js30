const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            alert("Webcam is not accessible");
        })
}

function paintToCanvas() {
    const {videoWidth, videoHeight} = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
        let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight); // get pixels
        //pixels = greenEffect(pixels);
        //pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 32);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play(); // camera click

    // get data
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'my-photo');
    link.textContent = 'download';
    link.innerHTML = `<img src="${data}" alt="handsome web dev">`;
    strip.insertBefore(link, strip.firstChild);
}

function greenEffect(pixels) {
    for (let i=0; i< pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i] * 0.8; // Red
        pixels.data[i + 1] = pixels.data[i + 1] * 1.5; // Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.9; // Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i=0; i< pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 200] = pixels.data[i + 1];
        pixels.data[i - 250] = pixels.data[i + 2];
    }
    return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
