import aws from 'aws-sdk';
import multerS3 from 'multer-s3-v2';
import multer from 'multer';

export const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
});

const multerUploader = multerS3({
    s3 : s3,
    bucket : 'campushow-clone',
    Condition: {
        StringEquals: {
            "s3:x-amz-acl": ["public-read"],
        },
    }
});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "캠퍼스하우 클론";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || "";
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

const storageOffice = multerS3({
    s3 : s3,
    bucket : 'campushow-clone',
    Condition: {
        StringEquals: {
            "s3:x-amz-acl": ["public-read"],
        },
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    dest : 'upload/files',
    key: function (req, file, cb) {
        cb(null, 'uploads/files/'+ Date.now() + '_' + `${file.originalname}`)
    }
});

export const uploadFilesMulter = multer({ storage: storageOffice });

export const uploadAvatarsMulter = multer(
    {
        name: 'uploadAvatar',
        dest: 'upload/avatars',
        storage: multerUploader
    }
);

