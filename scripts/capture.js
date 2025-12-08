
// Alle dom elementen selecteren
const cameraView = document.getElementById('camera-view');
const editorView = document.getElementById('editor-view');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const preview = document.getElementById('preview');
const filterThumbnails = document.querySelectorAll('.filters button img'); 
const filterButtons = document.querySelectorAll('.filters button');

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

        // A. Draw video frame to canvas
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Crop center square
        ctx.drawImage(
            video,
            (video.videoWidth - size) / 2,
            (video.videoHeight - size) / 2,
            size, size,
            0, 0,
            size, size
        );

        // B. Create Image URL
        const dataURL = canvas.toDataURL('image/png');

        // C. Show image in Preview AND all Filter buttons
        if (preview) preview.src = dataURL;
        filterThumbnails.forEach(img => img.src = dataURL);

        // D. Stop the Camera (Turn off light/save battery)
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }

        // E. SWITCH VIEW: Hide Camera -> Show Editor
        cameraView.classList.add('hide');
        editorView.classList.remove('hide');
    });
}

// foto veranderen

if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
        // A. SWITCH VIEW: Hide Editor -> Show Camera
        editorView.classList.add('hide');
        cameraView.classList.remove('hide');
        
        // B. Clear any filter currently applied to the preview
        if(preview) preview.style.filter = 'none';

        // C. Restart Camera
        startCamera();
    });
}

// --- 5. Filter Selection Logic ---
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const imgInsideBtn = btn.querySelector('img');
        // Apply the filter style from the button to the main preview
        if (preview && imgInsideBtn) {
            preview.style.filter = getComputedStyle(imgInsideBtn).filter;
        }
    });
});

// --- 6. Initialize on Load ---
startCamera();