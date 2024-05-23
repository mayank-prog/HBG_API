// routes/storyRoutes.js

const express = require("express");
const router = express.Router();
const storyController = require("../controllers/stories");

router.post("/", storyController.createStory);
router.get("/", storyController.getAllStories);
router.get("/:id", storyController.getStoryById);
router.put("/:id", storyController.updateStory);
router.delete("/:id", storyController.deleteStory);

module.exports = router;
