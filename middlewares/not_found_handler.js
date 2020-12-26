const NotFoundError = require("../helpers/errors/not_found_error");

module.exports = (req, res, next) => {
  throw new NotFoundError(
    "Ressource introuvable",
    "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URL et réessayez."
  );
};