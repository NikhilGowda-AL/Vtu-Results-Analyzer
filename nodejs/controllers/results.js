const checkUser = require("./checkUser.js");
const createUser = require("./createUser.js");

const results = async (req, res) => {
  const { usn, captcha, cookie, token } = req.body;

  try {
    const user = await checkUser(usn);
    if (user) {
      try {
        const response = await fetch("http://127.0.0.1:5000/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usn, captcha, cookie, token }),
        });

        const responseData = await response.json();
        return res.status(200).json(responseData);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        return res.status(500).json({ error: "Error fetching data from the external service" });
      }
    } 

    try {
      const response = await fetch("http://127.0.0.1:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usn, captcha, cookie, token }),
      });

      const responseData = await response.json();
      await createUser(responseData, usn, res);
      console.log("User created successfully:", responseData);
    } catch (createError) {
      console.error("Error creating user:", createError);
      return res.status(500).json({ error: "Error creating user" });
    }

  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = results;
