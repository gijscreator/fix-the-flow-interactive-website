document.addEventListener('DOMContentLoaded', () => {
  // Alle dom elementen selecteren (queried after DOM ready)
  const cameraView = document.getElementById('camera-view');
  const editorView = document.getElementById('editor-view');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const retakeBtn = document.getElementById('retakeBtn');
  const preview = document.getElementById('preview');
  const filterThumbnails = document.querySelectorAll('.filters button img'); 
  const filterButtons = document.querySelectorAll('.filters button');
  const captureBtn = document.getElementById('captureBtn');

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
          if (!video) return;

          // Video frame in het canvas (square center crop)
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

          // afbeelding url maken
          const dataURL = canvas.toDataURL('image/png');

          // preview en thumbnails updaten
          if (preview) preview.src = dataURL;
          filterThumbnails.forEach(img => { if(img) img.src = dataURL; });

          // stop camera tracks
          if (video.srcObject) {
              video.srcObject.getTracks().forEach(track => track.stop());
              video.srcObject = null;
          }

          // toggle views: hide camera & capture UI, show editor
          if (cameraView) cameraView.classList.add('hide');
          if (editorView) editorView.classList.remove('hide');
      });
  }

  // retake (back to camera)
  if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
          // editor naar camera
          if (editorView) editorView.classList.add('hide');
          if (cameraView) cameraView.classList.remove('hide');
          
          // filters weghalen
          if (preview) preview.style.filter = 'none';

          // herstart camera
          startCamera();
      });
  }

  // filters: klikken op thumbs past css filter toe op preview
  filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
          const imgInsideBtn = btn.querySelector('img');
          if (preview && imgInsideBtn) {
              preview.style.filter = getComputedStyle(imgInsideBtn).filter || 'none';
          }
      });
  });

  // start de camera on load
  startCamera();
});