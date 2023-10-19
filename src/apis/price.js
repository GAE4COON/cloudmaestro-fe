import api from "./index.js";

export const requestExample = (order) =>
  api.get(`/api/v1/file-api/example/${order}`);

  export const summaryFile = (file) =>
  api.post("/api/v1/file-api/summary", file, {
    headers: {
      "Content-Type": `multipart/form-data; `,
    },
  });