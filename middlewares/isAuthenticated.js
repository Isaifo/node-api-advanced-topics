const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;  

    if(authorization === "123456"){
       return next();

}
else{
    res.status(401).json({error: "Token invalido"});
}
};
module.exports = isAuthenticated;