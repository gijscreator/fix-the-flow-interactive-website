const captureHtml = document.querySelector('.capture-wrapper')
const filterHtml = document.querySelector('.addfilter')
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');
const filter1 = document.getElementById('filter1');
const filter2 = document.getElementById('filter2');
const filter3 = document.getElementById('filter3');
const filter4 = document.getElementById('filter4');
const filter5 = document.getElementById('filter5');
const filter6 = document.getElementById('filter6');

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
        filter1.src = capturedPhoto;
        filter2.src = capturedPhoto;
        filter3.src = capturedPhoto;
        filter4.src = capturedPhoto;
        filter5.src = capturedPhoto;
        filter6.src = capturedPhoto;
    } else {
        preview.alt = "No photo captured yet.";
    }
}

document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        preview.style.filter = getComputedStyle(img).filter;
    });
});


// Start camera alleen als er een video element is
startCamera();

// capture html weg
if (captureHtml) {
    captureHtml.classList.add('hide');
}

// filters html weg
if (captureHtml) {
    captureHtml.classList.add('hide');
}

// preview html weg
if (captureHtml) {
    captureHtml.classList.add('hide');
}