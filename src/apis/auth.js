import api from "./index.js";

export const idCheck = (data) =>
  api.post("/api/v1/users-api/id-dup-check", data);

export const emailCheck = (data) =>
  api.post("/api/v1/users-api/mailConfirm", data);

export const codeCheck = (data) => api.post("/api/v1/users-api/authCode", data);

export const join = (data) => api.post("/api/v1/users-api/sign-up", data);

export const login = (data) => api.post("/api/v1/users-api/sign-in", data);

export const myuser = (data) => api.post("/api/v1/users-api/my-user", data);

export const myNameModify = (data) =>
  api.post("/api/v1/users-api/my-modify-name", data);

export const myPwModify = (data) =>
  api.post("/api/v1/users-api/my-modify-pw", data);

export const myPwCheck = (data) =>
  api.post("/api/v1/users-api/my-check-pw", data);
