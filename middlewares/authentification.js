const jwtUtils = require("../utils/jwt.utils");

module.exports= async (req, res, next)=>{
    const heaerAuth= req.headers["authorization"];
    const userId= jwtUtils.getUserId(heaerAuth, res);
    
        
            if (userId < 0) {
              throw new UnauthorizedError(
                "Non autorisé",
                "Vous devez être connecté pour accéder à cette ressource."
              )
    };
    req.userId = userId;
    next();
}