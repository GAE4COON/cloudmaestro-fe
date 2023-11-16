import api from "./index.js";

export const sendRequirement = (data) =>
  api.post("/api/v1/request-api/userRequirement", data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });

export const sendRequirementDiagram = (data) =>
  api.post("/api/v1/request-api/userRequirement", data, {
    headers: {
      "Content-Type": `application/json; charset=UTF-8`,
    },
  });
