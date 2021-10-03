const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtroutes = require("./thought-routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;