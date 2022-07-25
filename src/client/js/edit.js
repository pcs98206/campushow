const semester = document.getElementById("sell-form__semester");
const uploadThumbnail = document.getElementById("uploadThumbnail");
const filename = document.querySelector('.input_filename');
const file = document.querySelector(".input_file");


const addSemesterOpt = () => {
    const optList = [];
    for(i=0; i<20; i++){
        const year = `${new Date().getFullYear()}`;
        const month = new Date().getMonth();
        if(month >= 1 && month < 9){
            optList.push(`${year-i}`+"년 1학기");
            optList.push(`${year-i-1}`+"년 2학기");
        }else{
            optList.push(`${year-i}`+"년 2학기");
            optList.push(`${year-i}`+"년 1학기");
        }
        const opt = document.createElement("option");
        opt.value=optList[i];
        opt.innerText=optList[i];
        if(semester.dataset.semester === opt.innerText){
            opt.selected=true
        }
        semester.appendChild(opt);
    }
    
};

const filenameChange = () => {
    filename.value = file.files[0].name;
};

if(uploadThumbnail){
    uploadThumbnail.addEventListener('change', filenameChange);
};

addSemesterOpt();