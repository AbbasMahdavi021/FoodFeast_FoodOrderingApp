module.exports = function adminMW(req, res, next) {

    if (req.session.isAdmin) {
        next();
    } else {
        console.log("Unauthorized User!");
        res.status(401).send("Unauthorized User!");
    }
}