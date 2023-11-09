import api from "./index.js";

export const ResourceGuide = (title) =>
  api.post(`/api/v1/resource-api/resource`, title);
