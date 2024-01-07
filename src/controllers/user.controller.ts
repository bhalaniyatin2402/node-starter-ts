import { Request } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import User, { IUser, TUser } from "../models/user.model";

import AppError from "../utils/error.utils";

export interface SignUpRequest extends Request, IUser { }
export type LoginRequest = Omit<SignUpRequest, "name">
export type UpdateUserRequest = Partial<IUser> & Request

export const signUp = asyncHandler<SignUpRequest>(async (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return next(new AppError('all fields are required', 400))
  }

  const isUserExist: IUser | null = await User.findOne({ email })

  if(isUserExist) {
    return next(new AppError('please enter another email', 400))
  }

  const user: TUser = new User({ name, email, password })

  await user.save()

  res.status(200).json({
    success: true,
    message: 'user register successfully'
  })
})

export const login = asyncHandler<LoginRequest>(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    return next(new AppError('email and password is required', 400))
  }

  const user: IUser | null = await User.findOne({ _id: userId })

  if (!user) {
    return next(new AppError('invalid email and password', 400))
  }

  return res.status(200).json({
    success: true,
    message: 'user login successfully',
    user
  })
})

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    return next(new AppError('user id is required to get user details', 400))
  }

  const user: IUser | null = await User.findById(userId)

  if (!user) {
    return next(new AppError('user not found on this id', 400))
  }

  res.status(200).json({
    success: true,
    user
  })
})

export const updateUserDetail = asyncHandler<UpdateUserRequest>(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    return next(new AppError('user id is required to get user details', 400))
  }

  const user: IUser | null = await User.findByIdAndUpdate(userId, {
    ...req.body
  })

  if (!user) {
    return next(new AppError('user not found on this id', 400))
  }

  res.status(200).json({
    success: true,
    message: 'user updated successfully'
  })
})

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    return next(new AppError('user id is required to get user details', 400))
  }

  const user: IUser | null = await User.findById(userId)

  if (!user) {
    return next(new AppError('user not found on this id', 400))
  }

  await User.findByIdAndDelete(userId)

  res.status(200).json({
    success: true,
    message: 'user deleted successfully'
  })
})

export const getAllUsers = asyncHandler(async (req, res) => {
  const users: Array<IUser> = await User.find()

  res.status(200).json({
    success: true,
    users
  })
})
