import express from "express";
import * as dotenv from "dotenv";
// New
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
// });

// POST route for DALL-E image generation
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing 'prompt' in request body" });
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
