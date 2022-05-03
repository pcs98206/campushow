import File from "../models/File";

export const handleHome = async(req, res) => {
    const files = await File.find();
    return res.render("home", {pageTitle : "선배의 노하우를 내려받다, 캠퍼스하우 클론", files});
};

export const getSell = (req, res) => {
    return res.render('sell', {pageTitle:"자료 등록 | 캠퍼스하우 클론"});
};

export const postSell = async(req, res) => {
    const { type, campus, subject, professor, semester, price, title, description } = req.body;
    try{
        const file = await File.create({
            type, 
            campus, 
            subject, 
            professor, 
            semester, 
            price, 
            title, 
            description,
        });
        return res.redirect("/");
    }catch(error){
        return res.render('sell', {pageTitle: `자료 등록 | 캠퍼스하우 클론`, errorMessage: error._message})
    }
};

export const getEdit = async(req, res) =>{
    const {id} = req.params;
    const file = await File.findById(id);
    if(!file){
        return res.status(400).render("mypage", {pageTitle: "마이페이지 | 캠퍼스하우 클론", errorMessage:"파일이 존재하지 않습니다."});
    };
    return res.render("edit", {pageTitle: "자료 수정 | 캠퍼스하우 클론", file});
};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const { type, campus, subject, professor, semester, price, title, description } = req.body;
    const file = await File.exists({_id: id});
    if(!file){
        return res.status(400).render("mypage", {pageTitle: "마이페이지 | 캠퍼스하우 클론", errorMessage:"파일이 존재하지 않습니다."});
    };
    await File.findByIdAndUpdate(id, {
        type, 
        campus, 
        subject, 
        professor, 
        semester, 
        price, 
        title, 
        description,
    });
    return res.redirect(`/${file._id}`);;
};

export const see = async(req, res) => {
    const {id} = req.params;
    const file = await File.findById(id);
    return res.render('see', {pageTitle: `${file.title}`, file});
};

export const remove = async(req, res) => {
    const {id} = req.params;
    await File.findByIdAndDelete(id);
    return res.redirect("/");
};