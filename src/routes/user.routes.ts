import { Router } from "express";
import { signUp, login, getUserDetails, updateUserDetail, deleteUser, getAllUsers } from "../controllers/user.controller";
import { asyncHandlerArgType } from "../middlewares/asyncHandler.middleware";

const router: Router = Router()

router.post('/sign-up', <asyncHandlerArgType>signUp)
router.post('/login/:userId', <asyncHandlerArgType>login)
router.get('/users', getAllUsers)
router.route('/me/:userId')
  .get(getUserDetails)
  .put(updateUserDetail)
  .delete(deleteUser)

export default router
