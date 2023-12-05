import api from "./index.js";

export const ResourceGuide = async (title) => {
  try {
    const response = await api.post(`/api/v1/resource-api/resource`, title);
    return response;
  } catch (error) {
    console.error("Error in ResourceGuide:", error);
    throw error;
  }
};

export const DrawResourceGuide = async (title) => {
  try {
    const response = await api.post(`/api/v1/resource-api/draw-resource`, title);
    return response;
  } catch (error) {
    console.error("Error in DrawResourceGuide:", error);
    throw error;

  }
};
