import api from "./index.js";

export const requestExample = ((order) =>
  api.get(`/api/v1/file-api/example/${order}`)  // 백틱 사용
)

export const fileUpload = ((file) =>
  api.post('/api/v1/file-api/upload', file, {
    headers: {
      "Content-Type": `multipart/form-data; `,
    },
  })
)

export const summaryFile =((file) =>
  api.post('/api/v1/file-api/summary', file, {
    headers: {
      "Content-Type": `multipart/form-data; `,
    },
  })
)
