import GenerateImage from 'generate-image';

const thumbnail = document.querySelectorAll(".file_thumb");

thumbnail.forEach(i => {
    const img = i.querySelector("img")
    const imageData = GenerateImage({
        c: img.dataset.title,
    });
    img.src = imageData;
});

