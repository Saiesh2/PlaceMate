import Resume from "../models/resume.model.js";
import { summarizeText } from "../utils/aiSummarizer.js"; // AI logic

// POST /api/resume/summarize
export const summarizeResume = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Resume text is required" });

    const summary = await summarizeText(text); // Call to AI logic
    return res.status(200).json({ summary });
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ message: "Failed to summarize resume" });
  }
};

// POST /api/resume/save
export const saveResume = async (req, res) => {
  try {
    const { resumeText, summarizedText, font, theme, type } = req.body;

    const userId = req.user._id; // Ensure you're using auth middleware

    const newResume = new Resume({
      userId,
      resumeText,
      summarizedText,
      font,
      theme,
      type,
    });

    await newResume.save();
    res.status(201).json({ message: "Resume saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Failed to save resume" });
  }
};
