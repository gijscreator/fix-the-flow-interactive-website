
// Alle dom elementen selecteren
const cameraView = document.getElementById('camera-view');
const editorView = document.getElementById('editor-view');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
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

        // Video frame in het canvas
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // midden definieren
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

        // tweede stap preview en filters laten zien
        if (preview) preview.src = dataURL;
        filterThumbnails.forEach(img => img.src = dataURL);

        // camera stopt
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }

        // camera weg filters erbij
        cameraView.classList.add('hide');
        editorView.classList.remove('hide');
    });
}

// foto veranderen

if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
        // editor naar camera
        editorView.classList.add('hide');
        cameraView.classList.remove('hide');
        
        // filters weghalen
        if(preview) preview.style.filter = 'none';

        // camera herstarten
        startCamera();
    });
}

// filters
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const imgInsideBtn = btn.querySelector('img');
        // filters toepassen
        if (preview && imgInsideBtn) {
            preview.style.filter = getComputedStyle(imgInsideBtn).filter;
        }
    });
});

// start de camera on load
startCamera();