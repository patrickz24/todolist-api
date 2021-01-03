const { UserTodo } = require("../database/models");

module.exports = {
  getTodoIdfromUser: (userId) => {
    return UserTodo.findOne({
      where: { userId },
      attributes: ["todoId"],
    });
  },

//   addHashtagTestimony: async (hashtagId, testimonyId) => {
//     const createJointure = await HashtagTestimony.create({
//       hashtagId,
//       testimonyId,
//     });
//     return createJointure;
//   },
};