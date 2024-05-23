const Story = require("../models/stories");

// Create a new story
exports.createStory = async (req, res, next) => {
  try {
    const {
      story_date,
      story_title,
      story_description,
      story_author,
      story_image_url,
    } = req.body;
    const newStory = await Story.create({
      story_date,
      story_title,
      story_description,
      story_author,
      story_image_url,
    });
    res.status(201).json({ success: true, story: newStory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all stories
exports.getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.findAll();
    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single story by ID
exports.getStoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const story = await Story.findByPk(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Stories not found" });
    }
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a story by ID
exports.updateStory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const story = await Story.findByPk(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }
    // Update story attributes
    await story.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Story updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a story by ID
exports.deleteStory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const story = await Story.findByPk(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }
    // Delete the story
    await story.destroy();
    res
      .status(200)
      .json({ success: true, message: "Story deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
