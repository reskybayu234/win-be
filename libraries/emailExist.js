import User from "../models/User.js";

const emailExist = async (email) => {
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return true;
  }
  return false;
};

export default emailExist;
