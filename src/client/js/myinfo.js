const file = document.querySelector(".input_file");
const filename = document.querySelector(".input_filename");

const filenameChange = () => {
    filename.value = file.files[0].name;
};
if(file){
    file.addEventListener('change', filenameChange);
};