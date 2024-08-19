const User = require("../models/user.js");

const checkUser = async (usn) => {
    try {
      const user = await User.findOne({ usn });
      return user ? user : null;
    } catch (error) {
      console.error("Error occurred while finding user:", error);
    }
  };
  module.exports = checkUser;