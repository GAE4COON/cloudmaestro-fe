import api from "./index.js";

export const guideAlert = async (data) => {
    try {
      const response = await api.post("/api/v1/alert-api/guide-alert", data);
      return response;
    } catch (error) {
      console.error("guideAlert 오류:", error);
      throw error;
    }
};