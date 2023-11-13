import api from "./index.js";

export const requestExample = (order) =>
  api.get(`/api/v1/file-api/example/${order}`);

export const summaryFile = (file) =>
api.post("/api/v1/file-api/summary", file, {
  headers: {
    "Content-Type": `multipart/form-data; `,
  },
});

export const searchDb = (dbData) =>
api.post("/api/v1/db-api/rds",dbData);

export const searchPrice = (dbData) =>
api.post("/api/v1/pricing-api/rds",dbData);


export const searchEc2 = (dbData) =>
api.post("/api/v1/pricing-api/ec2",dbData)
  