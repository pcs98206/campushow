import User from '../models/User';
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const mypage = async(req, res) =>{
    const { session : {
        user : {_id}
    } } = req;
    const user = await User.findById(_id).populate("files");
    return res.render("profile/mypage", {pageTitle: "마이페이지", user});
};

export const getMyinfo = (req, res) => {
    const { session : {user} } = req;
    return res.render("profile/myinfo", {pageTitle:"내 정보", user})
};

export const postMyinfo = (req, res) => {
    return res.end();
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

export const githubStart = (req, res) => {
    const baseURL = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.CLIENT_ID,
        scope : "read:user user:email",
        allow_signup: true,
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
};

export const githubFinish = async(req, res) => {
    const baseURL = "https://github.com/login/oauth/access_token";
    const config = {
        client_id : process.env.CLIENT_ID,
        client_secret : process.env.CLIENT_SECRET,
        code : req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await(await fetch(finalURL, {
        method : 'POST',
        headers: {
            Accept: 'application/json'
        },
    })).json();
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const userData = await(await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        const emailData = await(await fetch("https://api.github.com/user/emails", {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        const email = await emailData.find(email => email.primary===true && email.verified===true);
        if(!email){
            return res.redirect("/login");
        };
        let user = await User.findOne({email: userData.email});
        if(!user){ 
            user = await User.create({
                email : userData.email,
                password : " ",
                nickname : userData.login,
                campus : "정보없음",
                socialOnly : true,
                avatarUrl : userData.avatar_url
            });
        }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/")
    }else{
        return res.redirect("/login");
    };
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};