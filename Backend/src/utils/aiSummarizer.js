// src/utils/hfSummarizer.js
export const summarizeText = async (text) => {
  const HF_API_TOKEN = process.env.HF_API_TOKEN;

  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 30,
        do_sample: false
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Hugging Face Error: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  return data[0]?.summary_text || "No summary generated.";
};
