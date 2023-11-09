import api from "./index.js";

export const sidebarResource = (nodeData) =>
api.post("/api/v1/sidebar-api/resource",nodeData);