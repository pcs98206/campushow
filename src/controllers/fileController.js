import File from "../models/File";
import User from "../models/User";

export const handleHome = async(req, res) => {
    const files = await File.find().sort({createdAt : 'desc'});
    return res.render("home", {pageTitle : "선배의 노하우를 내려받다, 캠퍼스하우 클론", files});
};

export const getSell = (req, res) => {
    return res.render('sell', {pageTitle:"자료 등록"});
};

export const postSell = async(req, res) => {
    const { mainType, subType, campus, subject, professor, semester, price, title, description } = req.body;
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    try{
        const file = await File.create({
            mainType, 
            subType,
            campus, 
            subject, 
            professor, 
            semester, 
            price, 
            title, 
            description,
            owner : _id
        });
        user.files.push(file._id);
        user.save();
        return res.redirect("/");
    }catch(error){
        console.log(error)
        return res.render('sell', {pageTitle: `자료 등록`, errorMessage: error._message})
    }
};

export const getEdit = async(req, res) =>{
    const {id} = req.params;
    const file = await File.findById(id);
    if(!file){
        return res.status(400).render("mypage", {pageTitle: "마이페이지", errorMessage:"파일이 존재하지 않습니다."});
    };
    return res.render("edit", {pageTitle: "자료 수정", file});
};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const { mainType, subType, campus, subject, professor, semester, price, title, description } = req.body;
    const file = await File.exists({_id: id});
    if(!file){
        return res.status(400).render("mypage", {pageTitle: "마이페이지", errorMessage:"파일이 존재하지 않습니다."});
    };
    await File.findByIdAndUpdate(id, {
        mainType,
        subType, 
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
    const file = await File.findById(id).populate("owner");
    return res.render('see', {pageTitle: `${file.title}`, file});
};

export const remove = async(req, res) => {
    const {id} = req.params;
    await File.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async(req, res) => {
    const { search } = req.query;
    let files = [];
    files = await File.find({
        title: {$regex: `[${search}]`, $options:"i"}
    });
    return res.render("search", {pageTitle : "선배의 노하우를 내려받다, 캠퍼스하우 클론", files})
};