import api from "./index.js";

export const sendRequirement = (data) =>
  api.post("/api/v1/request-api/userRequirement", data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
