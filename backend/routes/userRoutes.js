const express = require("express");
const {
  createUser,
  sendOtp,
  loginUser,
  isAuth,
  getAllUsers,
  editUser,
  deleteUser,
  chartresult,
} = require("../controllers/userController.js");
const { isAuthenticatedUser, authorizedRoles } = require("../models/auth.js");
const router = express.Router();
router.route("/create-user").post(createUser);
router.route("/sendotp").post(sendOtp);
router.route("/login").post(loginUser);
router.route("/isAuth").get(isAuth);
router
  .route("/getAllUsers")
  .get(isAuthenticatedUser, authorizedRoles("admin", "manager"), getAllUsers);
router
  .route("/updateUser")
  .put(isAuthenticatedUser, authorizedRoles("admin"), editUser)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
router.route("/dataforchart").get(isAuthenticatedUser, chartresult);

module.exports = router;
