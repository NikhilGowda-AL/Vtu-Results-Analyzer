const User = require("../models/user");

const createUser = async (userData, usn, res) => {
  const { name, sgpa } = userData;
  const marks = sgpa[1];
  console.log(userData);
  try {
    const newUser = new User({ name, usn, marks, sgpa:sgpa[0] });
    await newUser.save();
    res.status(201).json(userData);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createUser;
