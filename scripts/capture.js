const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');

// Functie om camera te starten
async function startCamera() {
    if (!video) return; // als er geen video element is, stop
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        await video.play();
    } catch (err) {
        console.error("Camera cannot be started:", err);
        alert("Camera access is required to take a photo.");
    }
}

// Foto maken
if (captureBtn && video && canvas) {
    captureBtn.addEventListener('click', () => {
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

        // Opslaan in localStorage
        const dataURL = canvas.toDataURL('image/png');
        localStorage.setItem('capturedPhoto', dataURL);

        // Camera stoppen
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }

        // Ga naar filterpagina
        window.location.href = 'addfilter.html';
    });
}

// Als er een preview element is, laad de foto
if (preview) {
    const capturedPhoto = localStorage.getItem('capturedPhoto');
    if (capturedPhoto) {
        preview.src = capturedPhoto;
    } else {
        preview.alt = "No photo captured yet.";
    }
}

// Start camera alleen als er een video element is
startCamera();
