const jwtUtils = require("../utils/jwt.utils");

module.exports= async (req, res, next)=>{
  const headerAuth= req.headers["authorization"];
  const userId= jwtUtils.getUserId(headerAuth, res);       
    if (userId < 0) {
     throw new UnauthorizedError(
       "Non autorisé",
      "Vous devez être connecté pour accéder à cette ressource."
    )};
    req.userId = userId;
    next();
}