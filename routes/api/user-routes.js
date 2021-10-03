const router = require("express").Router();

const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserbyId).put(uodateUser).delete(deleteUser);

// /api/users/:id/friends/:friendsId
router.route("/:id/friends/:friendsId").post(newFriend). delete(deleteFriend);

module.exports = router;