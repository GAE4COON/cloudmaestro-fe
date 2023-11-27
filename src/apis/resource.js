import api from "./index.js";

export const ResourceGuide = (title) =>
  api.post(`/api/v1/resource-api/resource`, title);

export const DrawResourceGuide = (title) =>
  api.post(`/api/v1/resource-api/draw-resource`, title);
