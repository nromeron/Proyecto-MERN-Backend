const jwt = require("../utils/jwt");

function asureAuth(req, res, next ){

    if(!req.headers.authorization){
        return res.status(403).send({msg: "La petición no tiene autorización"})
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    
    try {
        const payload = jwt.decoded(token);
        
        const {exp} = payload;
        const currentDate = new Date().getTime();

        if (exp <= currentDate) {
            return res.status(400).send({msg: "El tokene ha expirado"})
        } else {
            req.user = payload;
            next();
        }

    } catch (error) {
        return res.status(400).send({msg: "Token invalido"});
    }
}

module.exports = {
    asureAuth
}