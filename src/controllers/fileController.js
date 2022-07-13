import File from "../models/File";
import User from "../models/User";
import Comment from "../models/Comment";
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import {s3} from "../middlewares";
import fs from "fs"

const ilovepdf = new ILovePDFApi('project_public_85823481f9e356c6f8a212a90e685c32_Pz-_-bc8c13b3a97378cc7331250d9fad4f22', 'secret_key_8d36edea6020a603d19920106695d286_AVDw3074ebb54067d7bb6b802ce3a25fbdcaf');


export const handleHome = async(req, res) => {
    const files = await File.find().sort({createdAt : 'desc'});
    return res.render("home", {pageTitle : "선배의 노하우를 내려받다, 캠퍼스하우 클론", files});
};

export const getSell = (req, res) => {
    return res.render('sell', {pageTitle:"자료 등록"});
};

const convertToJpg = async(url) => {
    const task = ilovepdf.newTask('pdfjpg');
    console.log("1")
    await task.start()
    .then(() => {
        console.log("2")
        return task.addFile(url);
    })
    .then(() => {
        console.log("3")
        return task.process({ pdfjpg_mode: 'pages' });
    })
    .then(() => {
        console.log("4")
        return task.download();
    })
    .then((data) => {
        fs.writeFileSync('./upload/convertToPdf/teset.jpg', data);
        // console.log(data)
        // const params = {
        //     'Bucket' : 'campushow-clone',
        //     'Key' : 'uploads/convertToJpg'+'/'+`${name}.png`,
        //     'Condition': {
        //         StringEquals: {
        //             "s3:x-amz-acl": ["public-read"],
        //         },
        //     },
        //     'Body': data,
        //     'ContentType': 'image/png'
        // };
        // s3.upload(params, async function(error, result){
        //     if(error){
        //         console.log(error);
        //     }
        // })
    });
};


const convertToPdf = async(fileUrl, name) => {
    const task1 = ilovepdf.newTask('officepdf');    
    await task1.start().then(() => {
        return task1.addFile(fileUrl)
    }).then(() => {
        return task1.process({
            output_filename : `${name}.pdf`
        });
    }).then(() => {
        return task1.download();
    })
    .then((data) => {
        fs.writeFileSync(`${__dirname}/upload/convertToPdf/test.pdf`, data);
        // const params = {
        //     'Bucket' : 'campushow-clone',
        //     'Key' : 'uploads/convertToPdf'+'/'+`${name}.pdf`,
        //     'Condition': {
        //         StringEquals: {
        //             "s3:x-amz-acl": ["public-read"],
        //         },
        //     },
        //     'Body': data,
        //     'ContentType': 'application/pdf',
        // };
        // s3.upload(params, async function(error, result){
        //     if(error){
        //         console.log(error);
        //     }
        //     convertToJpg(result.Location);
        // })
    });
};

export const postSell = async(req, res) => {
    const { mainType, subType, campus, subject, professor, semester, price, title, description } = req.body;
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    const fullname = req.file.key.split("/")[2].split(".")[0];
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
            owner : _id,
            fileUrl : req.file? req.file.location : fileUrl
        });
        user.files.push(file._id);
        user.save();

        const sOriginImgUrl = req.file.location;
        const arSplitUrl = sOriginImgUrl.split("/");
        const nArLength = arSplitUrl.length;
        const arFileName = arSplitUrl[nArLength-1];
        await convertToPdf(req.file.location, fullname);
        // await convertToJpg(fullname);
        return res.redirect("/");
    }catch(error){
        req.flash("error", "오류 발생! 다시 업로드 해주세요.");
        return res.render('sell', {pageTitle: `자료 등록`, error})
    }
};

export const getEdit = async(req, res) =>{
    const {id} = req.params;
    const file = await File.findById(id);
    if(!file){
        req.flash("error", "파일이 존재하지 않습니다.");
        return res.status(400).render("profile/mypage", {pageTitle: "마이페이지"});
    };
    if(String(file.owner._id) !== String(req.session.user._id)){
        req.flash("error", "다른 회원의 자료는 수정할 수 없습니다.");
        return res.status(403).redirect("/");
    };
    return res.render("edit", {pageTitle: "자료 수정", file});
};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const { mainType, subType, campus, subject, professor, semester, price, title, description } = req.body;
    const file = await File.exists({_id: id});
    if(!file){
        req.flash("error", "파일이 존재하지 않습니다.");
        return res.status(400).render("mypage", {pageTitle: "마이페이지"});
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
    const file = await File.findById(id).populate("owner").populate("comments");
    console.log(file)
    return res.render('see', {pageTitle: `${file.title}`, file});
};

export const remove = async(req, res) => {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    let fileArray = user.files;
    if(String(file.owner._id) !== String(req.session.user._id)){
        req.flash("error", "다른 회원의 자료는 삭제할 수 없습니다.");
        return res.status(403).redirect("/");
    };
    fileArray.splice(fileArray.indexOf(fileId),1);
    user.save();
    await File.findByIdAndDelete(fileId);
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

export const fileDownload = async(req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);
    const filename = file.fileUrl.split("/")[2];
    return res.download(`${file.fileUrl}`, `${filename}`);
};

export const registerView = async(req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);
    if(!file){
        return res.sendStatus(404);
    }
    file.views = file.views + 1;
    file.save();
    return res.sendStatus(200);
};

export const registerComment = async(req, res) => {
    const { id } = req.params;
    const {text} = req.body;
    const sessionUser = req.session.user;
    const user = await User.findById(sessionUser._id)
    const file = await File.findById(id);
    if(!file){
        return res.sendStatus(404);
    };
    const comment = await Comment.create({
        text,
        owner : sessionUser._id,
        file : id
    });
    file.comments.push(comment._id);
    file.save();
    user.comments.push(comment._id);
    user.save();
    return res.status(201).json({newCommentId : comment._id});
};

export const deleteComment = async(req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const sessionUser = req.session.user;
    const user = await User.findById(sessionUser._id);
    const userComments = user.comments;
    const file = await File.findById(comment.file);
    const fileComments = file.comments;
    if(!file){
        return res.sendStatus(404);
    };
    await Comment.findByIdAndDelete(id);
    fileComments.splice(fileComments.indexOf(file),1);
    userComments.splice(userComments.indexOf(user),1);
    file.save();
    user.save();
    return res.sendStatus(200);
};