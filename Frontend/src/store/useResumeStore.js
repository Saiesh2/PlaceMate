// src/store/useResumeStore.js
import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"; // Your custom axios instance

export const useResumeStore = create((set) => ({
  resumeText: '',
  summarizedText: '',
  font: 'Arial',
  theme: 'light',
  type: 'Modern',
  isSummarizing: false,
  isSaving: false,

  setResumeText: (text) => set({ resumeText: text }),
  setFont: (font) => set({ font }),
  setTheme: (theme) => set({ theme }),
  setType: (type) => set({ type }),

  summarizeResume: async () => {
    set({ isSummarizing: true });
    try {
      const { resumeText } = useResumeStore.getState();
      const res = await axiosInstance.post("/resume/summarize", { text: resumeText });
      set({ summarizedText: res.data.summary });
    } catch (err) {
      console.error("AI Summarization failed:", err);
    } finally {
      set({ isSummarizing: false });
    }
  },

  saveResume: async () => {
    set({ isSaving: true });
    try {
      const { resumeText, summarizedText, font, theme, type } = useResumeStore.getState();
      await axiosInstance.post("/resume/save", {
        resumeText,
        summarizedText,
        font,
        theme,
        type,
      });
    } catch (err) {
      console.error("Error saving resume:", err);
    } finally {
      set({ isSaving: false });
    }
  },
}));

export default useResumeStore ;