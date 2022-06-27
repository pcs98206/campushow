const form = document.getElementById("sell-form");
const mainCategory = document.getElementById("sell-form__main");
const campusInput = document.getElementById("sell-form__input");
const semester = document.getElementById("sell-form__semester");
const filename = document.querySelector('.input_filename');
const file = document.querySelector('.input_file');

const addSelect = () => {
    const subCategory = document.getElementById("sell-form__sub");
    if(subCategory){
        form.removeChild(subCategory);
    };
    if(mainCategory.value === "과제"){
        const subCategoryList = ["자료 유형 선택", "레포트", "쪽글", "실험", "발표", "독후감", "기타"];
        const newSelect = document.createElement("select");
        newSelect.id="sell-form__sub";
        newSelect.name="subType";
        newSelect.required=true;
        form.insertBefore(newSelect, campusInput);
        for(i=0; i<subCategoryList.length; i++){
            const opt = document.createElement("option");
            if(i==0){
                opt.selected=true;
                opt.disabled=true;
            };
            opt.value=subCategoryList[i];
            opt.innerText=subCategoryList[i];
            newSelect.appendChild(opt);
        };
    }else if(mainCategory.value === "필기"){
        const subCategoryList = ["자료 유형 선택", "강의 요약"];
        const newSelect = document.createElement("select");
        newSelect.id="sell-form__sub";
        newSelect.name="subType";
        newSelect.required=true;
        form.insertBefore(newSelect, campusInput);
        for(i=0; i<subCategoryList.length; i++){
            const opt = document.createElement("option");
            if(i==0){
                opt.selected=true;
                opt.disabled=true;
            };
            opt.value=subCategoryList[i];
            opt.innerText=subCategoryList[i];
            newSelect.appendChild(opt);
        };
    }else if(mainCategory.value === "시험정보"){
        const subCategoryList = ["자료 유형 선택", "중간고사", "기말고사", "퀴즈", "기타"];
        const newSelect = document.createElement("select");
        newSelect.id="sell-form__sub";
        newSelect.name="subType";
        newSelect.required=true;
        form.insertBefore(newSelect, campusInput);
        for(i=0; i<subCategoryList.length; i++){
            const opt = document.createElement("option");
            if(i==0){
                opt.selected=true;
                opt.disabled=true;
            };
            opt.value=subCategoryList[i];
            opt.innerText=subCategoryList[i];
            newSelect.appendChild(opt);
        };
    }
};

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
        semester.appendChild(opt);
    }
};

const filenameChange = () => {
    filename.value = file.files[0].name;
};

const handleNotice = () => {
    const body = document.querySelector("body");
    const div = document.createElement("div");
    div.className = "message info";
    body.prepend(div);
    const span = document.createElement("span");
    span.innerText = "자료를 업로드하는 중입니다. 잠시만 기다려주세요.";
    div.appendChild(span);
};

mainCategory.addEventListener("change", addSelect);
addSemesterOpt();

if(file){
    file.addEventListener('change', filenameChange);
};

form.addEventListener('submit', handleNotice);