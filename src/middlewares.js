export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "캠퍼스하우 클론";
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.user = req.session.user;
    next();
};