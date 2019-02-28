module.exports = function(req, res, next){
    const user = res.locals.user;

    const returnUrl = req.url;

    if(!user){
        res.redirect(`/login?return=${returnUrl}`);
        return;
    }

    next();
}