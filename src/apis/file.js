import api from "./index.js";

export const fileUpload = (file) =>
  api.post("http://localhost:8080/api/v1/file-api/upload", file, {
    headers: {
      "Content-Type": `multipart/form-data; `,
    },
  });

export const requestExample = (order) =>
  api.get(`http://localhost:8080/api/v1/file-api/example/${order}`); // 백틱 사용

export const rehostRequest = (data) =>
  api.post("/api/v1/file-api/network", data);
