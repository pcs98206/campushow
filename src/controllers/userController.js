import User from '../models/User';

export const handleMypage = (req, res) =>{
    return res.send("my page");
};

export const handleMyinfo = (req, res) => {
    return res.send("my info")
};

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "회원가입 | 캠퍼스하우 클론"});
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
    return res.render("login", {pageTitle:"로그인 | 캠퍼스하우 클론"});
};

export const postlogin = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    return res.end();
};