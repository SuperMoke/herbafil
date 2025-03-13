const pool = require("../config/db");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT userID, email FROM users WHERE username = ? AND password = ?",
        [username, password]
      );

      if (rows.length > 0) {
        const userData = rows[0];
        res.status(200).json({
          status: "success",
          userID: userData.userID,
          email: userData.email,
        });
      } else {
        res.status(401).json({
          status: "failure",
          message: "Invalid username or password",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      status: "failure",
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    console.log("Check username request received:", req.body);

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const connection = await pool.getConnection();
    try {
      // Check if username already exists
      const [rows] = await connection.execute(
        "SELECT COUNT(*) as count FROM users WHERE username = ?",
        [username]
      );

      if (rows[0].count > 0) {
        return res.status(200).json({
          success: false,
          message: "Username already exists.",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Success",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error checking username:", error.message);
    res.status(500).json({
      success: false,
      message: "Connection failed: " + error.message,
    });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    // Validate input
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email, and password cannot be empty.",
      });
    }

    const connection = await pool.getConnection();
    try {
      // Check if username already exists
      const [existingUsers] = await connection.execute(
        "SELECT COUNT(*) as count FROM users WHERE username = ?",
        [username]
      );

      if (existingUsers[0].count > 0) {
        return res.status(409).json({
          success: false,
          message: "Username already exists.",
        });
      }

      // Insert the new user
      const [result] = await connection.execute(
        "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)",
        [name, email, username, password]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Account created successfully",
          userID: result.insertId,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create account",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error creating account:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userID = parseInt(req.query.userID);

    if (!userID) {
      return res.status(400).json({
        error: true,
        message: "Invalid request - userID is required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT userID, name, username, password, userProfile FROM users WHERE userID = ?",
        [userID]
      );

      if (rows.length > 0) {
        const user = rows[0];
        // Adjust the base URL to match your server configuration
        const baseUrl = "http://localhost:3000/";
        const imageUrl = baseUrl + user.userProfile;

        res.status(200).json({
          userID: user.userID,
          username: user.username,
          name: user.name,
          password: user.password,
          userProfile: imageUrl,
        });
      } else {
        res.status(404).json({
          error: true,
          message: "User not found",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      error: true,
      message: "Server error: " + error.message,
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
        otp: 0,
      });
    }

    // Generate a simple numeric OTP (matching the PHP implementation)
    function simpleNumericOTP(length = 6) {
      return String(Math.floor(Math.random() * Math.pow(10, length))).padStart(
        length,
        "0"
      );
    }

    const otp = simpleNumericOTP();

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "herbafil.noreply@gmail.com",
        pass: "uxaz vzpq ukbn hmzb", // Note: In production, use environment variables
      },
    });

    // Email content (matching the PHP implementation)
    const mailOptions = {
      from: '"otp_noreply" <herbafil.noreply@gmail.com>',
      to: email,
      replyTo: "herbafil.noreply@gmail.com",
      subject: "Herbafil OTP",
      html: `Your OTP for verification 
            <br> Thank you for using Herbafil.
            Please use the code below to authenticate your e-mail address. <br> <b>${otp}</b>`,
      text: `Your OTP for verification ${otp} Thank you for using Herbafil.`,
    };

    // Store OTP in database
    const connection = await pool.getConnection();
    try {
      // Insert new OTP (simplified to match PHP implementation)
      const [result] = await connection.execute(
        "INSERT INTO otp_table (otp) VALUES (?)",
        [otp]
      );

      if (result.affectedRows > 0) {
        // Send the email
        const emailSent = await transporter.sendMail(mailOptions);

        if (emailSent) {
          res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp, // Note: In production, you might not want to return the OTP
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "OTP failed to send",
          otp: 0,
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({
      success: false,
      message: `Message could not be sent. Mailer Error: ${error.message}`,
      otp: 0,
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const connection = await pool.getConnection();
    try {
      // Check if OTP exists (matching the PHP implementation)
      const [rows] = await connection.execute(
        "SELECT otpID FROM otp_table WHERE otp = ?",
        [otp]
      );

      if (rows.length > 0) {
        // OTP is valid, delete it to prevent reuse
        const [deleteResult] = await connection.execute(
          "DELETE FROM otp_table WHERE otp = ?",
          [otp]
        );

        if (deleteResult.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "Verification Complete!",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "There is a problem with the OTP",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to register",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({
      success: false,
      message: "Database error: " + error.message,
    });
  }
};
