import { asyncHandler2 } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler2(async (req, res) => {
  /**
   * get user details from API
   * validation - not empty
   * check if the user already exists: username, email,
   * check for images, check for avatar
   * upload them to cloudinary, avatar
   * create user object - create entry in db
   * remove password and refresh token field from response
   * check for user creation
   * return response
   */
  const { username, email, fullName, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Full name is required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // 'req.files' is coming from multer upload middleware used in user routes
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  let coverImageLocalPath;
  if (req.files?.coverImage && req.files?.coverImage.length > 0) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const cover = await uploadOnCloudinary(coverImageLocalPath); //here cloudinary will handle the null or undefined

  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }

  // DB call
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: cover?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  // DB call
  const createdUser = await User.findById(user._id, {
    password: 0,
    refreshToken: 0,
  });

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while creating user");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created !"));
});

export { registerUser };
