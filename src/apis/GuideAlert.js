import api from "./index.js";

export const logGuideAlert = async (data) => {
    try {
      const response = await api.post("/api/v1/alert-api/log-guide-alert", data);
      return response;
    } catch (error) {
      console.error("log guideAlert 오류:", error);
      throw error;
    }
};

export const dbGuideAlert = async (data) => {
    try {
      const response = await api.post("/api/v1/alert-api/db-guide-alert", data);
      return response;
    } catch (error) {
      console.error("db guideAlert 오류:", error);
      throw error;
    }
};
