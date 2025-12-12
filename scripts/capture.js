document.addEventListener('DOMContentLoaded', () => {

const cameraView = document.getElementById('camera-view');
const editorView = document.getElementById('editor-view');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const preview = document.getElementById('preview');
const filterThumbnails = document.querySelectorAll('.filters button img');
const filterButtons = document.querySelectorAll('.filters button');
const submit = document.getElementById('submitBtn');
const submitField = document.querySelector('.submit');
const submitPreview = document.getElementById('submit-preview');
const changePictureSubmitBtn = document.getElementById('changePictureSubmitBtn');
const images = document.querySelector('.images');

// Start cam
async function startCamera() {
  if (!video) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    video.srcObject = stream;
    await video.play();
  } catch (err) {
    console.error("Camera error:", err);
    // if user denied permission, notify and go back to previous page
    const denied = err && (
      err.name === 'NotAllowedError' ||
      err.name === 'PermissionDeniedError' ||
      /denied/i.test(err.message)
    );
    if (denied) {
      history.back();
      return;
    }
  }
}

// Neem de foto
if (captureBtn) {
  captureBtn.addEventListener('click', () => {
    if (!video || !canvas) return;

    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    const size = Math.min(vw, vh) || 500;
    canvas.width = size;
    canvas.height = size;
    const dcanvas = canvas.getContext('2d');

    dcanvas.drawImage(
      video,
      (vw - size) / 2,
      (vh - size) / 2,
      size, size,
      0, 0,
      size, size
    );

    const dataURL = canvas.toDataURL('image/png');

    // set editor preview and submitted preview
    if (preview) preview.src = dataURL;
    if (submitPreview) submitPreview.src = dataURL;

    // update thumbnails if any
    filterThumbnails.forEach(img => { if (img) img.src = dataURL; });

    // stop camera
    if (video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }

    if (cameraView) cameraView.classList.add('hide');
    if (editorView) editorView.classList.remove('hide');
  });
}

// Retake
if (retakeBtn) {
  retakeBtn.addEventListener('click', () => {
    if (editorView) editorView.classList.add('hide');
    if (cameraView) cameraView.classList.remove('hide');
    if (preview) preview.style.filter = 'none';
    startCamera();
  });
}

// Filters
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const imgInsideBtn = btn.querySelector('img');
    if (preview && imgInsideBtn) {
      preview.style.filter = getComputedStyle(imgInsideBtn).filter || 'none';
    }
  });
});

// Submit -> show submitted state (ensure image present)
if (submit) {
  submit.addEventListener('click', () => {
    if (cameraView) cameraView.classList.add('hide');
    if (editorView) editorView.classList.add('hide');
    if (submitField) submitField.classList.remove('hide');
    if (images) images.classList.remove('hide');

    // ensure submitted preview has the captured image
    if (submitPreview) {
      if (preview && preview.src) submitPreview.src = preview.src;
      else submitPreview.src = canvas.toDataURL ? canvas.toDataURL('image/png') : '';
    }
  });
}

// Change picture on submitted screen -> back to editor
if (changePictureSubmitBtn) {
  changePictureSubmitBtn.addEventListener('click', () => {
    if (submitField) submitField.classList.add('hide');
    if (editorView) editorView.classList.remove('hide');
    // keep the same preview visible in editor
    if (preview && submitPreview) preview.src = submitPreview.src || preview.src;
  });
}

// Start camera (works when script is deferred)
startCamera();

});