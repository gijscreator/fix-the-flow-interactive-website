// Query DOM directly (works when script is loaded with `defer` or placed at end of body)
const cameraView = document.getElementById('camera-view');
const editorView = document.getElementById('editor-view');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const retakeBtn = document.getElementById('retakeBtn');
const preview = document.getElementById('preview');
const filterThumbnails = document.querySelectorAll('.filters button img');
const filterButtons = document.querySelectorAll('.filters button');
const submit = document.getElementById('submitBtn');
const submitField = document.querySelector('.submit')

// Start de camera
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
    alert("Please allow camera access.");
  }
}

// Capture button
if (captureBtn) {
  captureBtn.addEventListener('click', () => {
    if (!video || !canvas) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      video,
      (video.videoWidth - size) / 2,
      (video.videoHeight - size) / 2,
      size, size,
      0, 0,
      size, size
    );

    const dataURL = canvas.toDataURL('image/png');

    if (preview) preview.src = dataURL;
    filterThumbnails.forEach(img => { if (img) img.src = dataURL; });

    if (video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }

    if (cameraView) cameraView.classList.add('hide');
    if (editorView) editorView.classList.remove('hide');
  });
}

// Retake button
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

// Submit
if (submit) {
  submit.addEventListener('click', () => {
    if (cameraView) cameraView.classList.add('hide');
    if (editorView) editorView.classList.add('hide');
    if (submitField) submitField.classList.remove('hide');
    console.log('im working');
  });
}

// Start camera immediately (defer ensures DOM exists)
startCamera();