import User from '../models/User';
import bcrypt from "bcrypt";

export const handleMypage = (req, res) =>{
    return res.send("my page");
};

export const handleMyinfo = (req, res) => {
    return res.send("my info")
};

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "회원가입"});
};
export const postJoin = async(req, res) => {
    const { email ,password ,password2 ,nickname ,campus } = req.body;
    const exist = await User.exists({email});
    if(password !== password2){
        return res.status(404).render("join", {pageTitle: "회원가입 | 캠퍼스하우 클론", errorMessage : "비밀번호가 일치하지 않습니다."})
    };
    if(exist){
        return res.status(404).render("join", {pageTitle: "회원가입 | 캠퍼스하우 클론", errorMessage : "이미 존재하는 이메일입니다."})
    };
    const user = await User.create({
        email,
        password,
        password2,
        nickname,
        campus
    })
    return res.redirect("/");
};

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:`로그인`});
};

export const postlogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).render("login", {pageTitle:"로그인론", errorMessage:"가입되지 않은 이메일입니다."});
    };
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(404).render("login", {pageTitle:"로그인론", errorMessage:"비밀번호가 일치하지 않습니다."});

    };
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};