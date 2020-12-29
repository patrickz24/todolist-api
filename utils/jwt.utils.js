require('dotenv').config({ path: __dirname + '/.env' });
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/errors');

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;
const parseAuthorization=  (authorization)=> {
  const token = authorization.replace('Bearer ', '');
  if (token===null || token === ""){ 
    throw new UnauthorizedError(
      "Accès non autorisé",
      "Token non trouvé: merci de vous authentifier",
    );}
    return token;
}
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
      
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },
   getUserId:(authorization, req)=> {
    var userId = -1;
    var token = parseAuthorization(authorization);
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        userId = jwtToken.userId;
      } catch (err) {
        throw new UnauthorizedError(
          "Accès non autorisé",
          "Problem: token invalide",
        );
      }
  
   return userId;
    },
};
