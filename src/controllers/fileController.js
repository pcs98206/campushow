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
};