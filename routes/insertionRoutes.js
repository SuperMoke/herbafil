const express = require("express");
const router = express.Router();
const insertionController = require("../controllers/insertionController");

// Common herbs routes
router.post("/insert-common-herb", insertionController.insertCommonHerb);

// Herbal details routes
router.post("/insert-herbal-detail", insertionController.insertHerbalDetail);
router.post("/insert-herbal-benefit", insertionController.insertHerbalBenefit);
router.post("/insert-herbal-step", insertionController.insertHerbalStep);

// ML herbs routes
router.post("/insert-ml-detail", insertionController.insertMLDetail);
router.post("/insert-ml-benefit", insertionController.insertMLBenefit);
router.post("/insert-ml-step", insertionController.insertMLStep);

// User history route
router.post("/insert-user-history", insertionController.insertUserHistory);

module.exports = router;
