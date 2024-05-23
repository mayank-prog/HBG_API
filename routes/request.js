// routes/storyRoutes.js

const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

router.post("/", requestController.getDonorByRequest);
// router.get("/", storyController.getAllStories);
// router.get("/:id", storyController.getStoryById);
// router.put("/:id", storyController.updateStory);
// router.delete("/:id", storyController.deleteStory);

module.exports = router;
