const express = require("express");
const router = express.Router();
const fetchableController = require("../controllers/fetchableController");

// Common herbs endpoint
router.get("/common-herbs", fetchableController.getCommonHerbs);

// Herbal details endpoints
router.get("/herbal-details", fetchableController.getHerbalDetails);
router.get("/herbal-benefits", fetchableController.getHerbalBenefits);
router.get("/herbal-steps", fetchableController.getHerbalSteps);

// ML herbal endpoints
router.get("/ml-details", fetchableController.getMLDetails);
router.get("/ml-benefits", fetchableController.getMLBenefits);
router.get("/ml-steps", fetchableController.getMLSteps);

// User history endpoint
router.get("/user-history", fetchableController.getUserHistory);

module.exports = router;
