import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "캠퍼스하우 클론";
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.loggedInUser = req.session.user;
    next();
};

export const protectMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return res.redirect("/login");
    }else{
        next();
    }
};

export const publicMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return res.redirect("/");
    }else{
        next();
    }
};

export const uploadFilesMulter = multer({
    name: "uploadFile",
    dest: 'upload/files'
});

export const uploadAvatarsMulter = multer(
    {
        name: 'uploadAvatar',
        dest: 'upload/avatars'
    }
);
    