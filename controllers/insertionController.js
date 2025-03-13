const pool = require("../config/db");

// Insert common herb
exports.insertCommonHerb = async (req, res) => {
  try {
    const { imageUrl, herbName, herbDescrip } = req.body;

    // Validate required fields
    if (!imageUrl || !herbName || !herbDescrip) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO common_herbs (imageUrl, herbName, herbDescrip) VALUES (?, ?, ?)",
        [imageUrl, herbName, herbDescrip]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "New record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting common herb:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert herbal detail
exports.insertHerbalDetail = async (req, res) => {
  try {
    const { herbName, herbDescription, herbImage } = req.body;

    // Validate required fields
    if (!herbName || !herbDescription || !herbImage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO herbal_details (herbName, herbDescription, herbImage) VALUES (?, ?, ?)",
        [herbName, herbDescription, herbImage]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Detail record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting herbal detail:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert herbal benefit
exports.insertHerbalBenefit = async (req, res) => {
  try {
    const { herbId, benefitDescription, benefitImageUrl } = req.body;

    // Validate required fields
    if (!herbId || !benefitDescription || !benefitImageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO herbal_benefits (herbId, benefitDescription, benefitImageUrl) VALUES (?, ?, ?)",
        [herbId, benefitDescription, benefitImageUrl]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Benefits record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting herbal benefit:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert herbal step
exports.insertHerbalStep = async (req, res) => {
  try {
    const { herbId, stepTitle, stepDetails } = req.body;

    // Validate required fields
    if (!herbId || !stepTitle || !stepDetails) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO herbal_steps (herbId, stepTitle, stepDetails) VALUES (?, ?, ?)",
        [herbId, stepTitle, stepDetails]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Steps record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting herbal step:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert ML herbal detail
exports.insertMLDetail = async (req, res) => {
  try {
    const { mlHerbName, mlHerbDescription, mlHerbImageUrl } = req.body;

    // Validate required fields
    if (!mlHerbName || !mlHerbDescription || !mlHerbImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO ml_details (mlHerbName, mlHerbDescription, mlHerbImageUrl) VALUES (?, ?, ?)",
        [mlHerbName, mlHerbDescription, mlHerbImageUrl]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Detail record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting ML detail:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert ML benefit
exports.insertMLBenefit = async (req, res) => {
  try {
    const { mlHerbName, mlBenefitDescription, mlBenefitImageUrl } = req.body;

    // Validate required fields
    if (!mlHerbName || !mlBenefitDescription || !mlBenefitImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO ml_benefits (mlHerbName, mlBenefitDescription, mlBenefitImageUrl) VALUES (?, ?, ?)",
        [mlHerbName, mlBenefitDescription, mlBenefitImageUrl]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Benefit record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting ML benefit:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert ML step
exports.insertMLStep = async (req, res) => {
  try {
    const { mlHerbName, mlStepTitle, mlStepDetails } = req.body;

    // Validate required fields
    if (!mlHerbName || !mlStepTitle || !mlStepDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO ml_steps (mlHerbName, mlStepTitle, mlStepDetails) VALUES (?, ?, ?)",
        [mlHerbName, mlStepTitle, mlStepDetails]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Herbal Step record created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting ML step:", error.message);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

// Insert user history
exports.insertUserHistory = async (req, res) => {
  try {
    const { userID, mlHerbName } = req.body;

    // Validate required fields
    if (!userID || !mlHerbName) {
      return res.status(400).json({
        error: "Invalid input",
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO user_history (userID, mlHerbName) VALUES (?, ?)",
        [userID, mlHerbName]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({
          message: "Record inserted successfully",
        });
      } else {
        res.status(500).json({
          error: "Error inserting record",
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error inserting user history:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};
