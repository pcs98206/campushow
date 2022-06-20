import "../scss/styles.scss";

const filename = document.querySelector('.input_filename');
const file = document.querySelector('.input_file');

document.addEventListener("contextmenu", e => {
    e.target.matches("img") && e.preventDefault()
});

const filenameChange = () => {
    filename.value = file.files[0].name;
};

if(file){
    file.addEventListener('change', filenameChange);
}