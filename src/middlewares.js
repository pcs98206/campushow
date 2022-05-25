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

const storage = multer.diskStorage({
    destination : 'upload/files',
    filename: (req, file, cb) => {
        let [filename, extension] = file.originalname.split('.');
        let nameFile = filename + "-" + Date.now() + "." + extension;
        cb(null, nameFile)
    }
});

export const uploadFilesMulter = multer({ storage: storage })

export const uploadAvatarsMulter = multer(
    {
        name: 'uploadAvatar',
        dest: 'upload/avatars'
    }
);
