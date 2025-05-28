const isAuth = (req, res, next) => {
    if (req.user){
         next();
    } else if(!req.user && req.session.authenticated){
        return res.json(req.session.user[0])
    } else if(!req.session.authenticated){
        return res.json(false)
    } else{
        return res.json(false)
    }
    
}

module.exports = isAuth