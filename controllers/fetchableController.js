const pool = require("../config/db");

exports.getCommonHerbs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute("SELECT * FROM common_herbs");

      const herbs = rows.map((row) => ({
        herbID: row.herbID,
        herbName: row.herbName,
        herbDescrip: row.herbDescrip,
        imageUrl: row.imageUrl,
      }));

      res.status(200).json(herbs);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching common herbs:", error.message);
    res.status(500).json({
      success: false,
      error: "Database error: " + error.message,
    });
  }
};

// Get herbal details by ID
exports.getHerbalDetails = async (req, res) => {
  try {
    const herbId = parseInt(req.query.herbId);

    if (!herbId) {
      return res.status(400).json({ message: "herbId parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM herbal_details WHERE herbId = ?",
        [herbId]
      );

      if (rows.length > 0) {
        res.status(200).json([rows[0]]);
      } else {
        res.status(404).json({ message: "No record found" });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching herbal details:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get herbal benefits by ID
exports.getHerbalBenefits = async (req, res) => {
  try {
    const herbId = parseInt(req.query.herbId);

    if (!herbId) {
      return res.status(400).json({ message: "herbId parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM herbal_benefits WHERE herbId = ?",
        [herbId]
      );

      res.status(200).json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching herbal benefits:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get herbal steps by ID
exports.getHerbalSteps = async (req, res) => {
  try {
    const herbId = parseInt(req.query.herbId);

    if (!herbId) {
      return res.status(400).json({ message: "herbId parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM herbal_steps WHERE herbId = ?",
        [herbId]
      );

      res.status(200).json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching herbal steps:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get ML herbal details by name
exports.getMLDetails = async (req, res) => {
  try {
    const mlHerbName = req.query.mlHerbName;

    if (!mlHerbName) {
      return res
        .status(400)
        .json({ message: "mlHerbName parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM ml_details WHERE mlHerbName = ?",
        [mlHerbName]
      );

      if (rows.length > 0) {
        res.status(200).json([rows[0]]);
      } else {
        res.status(404).json({ message: "No record found" });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching ML details:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get ML benefits by name
exports.getMLBenefits = async (req, res) => {
  try {
    const mlHerbName = req.query.mlHerbName;

    if (!mlHerbName) {
      return res
        .status(400)
        .json({ message: "mlHerbName parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM ml_benefits WHERE mlHerbName = ?",
        [mlHerbName]
      );

      res.status(200).json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching ML benefits:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get ML steps by name
exports.getMLSteps = async (req, res) => {
  try {
    const mlHerbName = req.query.mlHerbName;

    if (!mlHerbName) {
      return res
        .status(400)
        .json({ message: "mlHerbName parameter is required" });
    }

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM ml_steps WHERE mlHerbName = ?",
        [mlHerbName]
      );

      res.status(200).json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching ML steps:", error.message);
    res.status(500).json({
      error: "Database error: " + error.message,
    });
  }
};

// Get user history
exports.getUserHistory = async (req, res) => {
  try {
    const userID = parseInt(req.query.userID);

    if (!userID || userID <= 0) {
      return res.status(400).json({ error: "Invalid userID" });
    }

    const connection = await pool.getConnection();
    try {
      // Check if user exists
      const [userCheck] = await connection.execute(
        "SELECT COUNT(*) as count FROM user_history WHERE userID = ?",
        [userID]
      );

      if (userCheck[0].count === 0) {
        return res.status(404).json({ error: "userID does not exist" });
      }

      // Get user history
      const [rows] = await connection.execute(
        `SELECT ml_details.mlHerbName, ml_details.mlLimitedDescript, mlHerbImageUrl, user_history.created_at
         FROM ml_details
         INNER JOIN user_history ON ml_details.mlHerbName = user_history.mlHerbName
         WHERE user_history.userID = ?
         ORDER BY user_history.created_at DESC`,
        [userID]
      );

      if (rows.length > 0) {
        res.status(200).json({ data: rows });
      } else {
        res.status(200).json({ message: "No history found for this userID" });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching user history:", error.message);
    res.status(500).json({
      error: "Error: " + error.message,
    });
  }
};
