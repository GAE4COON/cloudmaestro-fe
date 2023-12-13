import api from "./index.js";

export const requestExample = async (order) => {
  try {
    const response = await api.get(`/api/v1/file-api/example/${order}`);
    return response;
  } catch (error) {
    // 여기에 오류 처리 로직 작성
    console.error("requestExample 오류:", error);
    throw error; // 오류를 다시 던지거나 필요에 따라 다른 동작을 수행
  }
};

export const fileUpload = async (file) => {
  try {
    const response = await api.post("/api/v1/file-api/upload", file, {
      headers: {
        "Content-Type": `multipart/form-data; `,
      },
    });
    return response;
  } catch (error) {
    console.error("fileUpload 오류:", error);
    throw error;
  }
};

export const summaryFile = async (file) => {
  try {
    const response = await api.post(
      "/api/v1/file-api/summary",
      JSON.stringify(file)
    );
    return response;
  } catch (error) {
    console.error("summaryFile 오류:", error);
    throw error;
  }
};

export const rehostRequest = async (data) => {
  try {
    const response = await api.post("/api/v1/file-api/rehost/ssohost", data);
    return response;
  } catch (error) {
    console.error("rehostRequest 오류:", error);
    throw error;
  }
};

export const alertCheck = async (data) => {
  try {
    const response = await api.post("/api/v1/alert-api/alert-check", data);
    return response;
  } catch (error) {
    console.error("alertCheck 오류:", error);
    throw error;
  }
};

export const GroupCheck = async (data) => {
  try {
    const response = await api.post("/api/v1/alert-api/group-check", data);
    return response;
  } catch (error) {
    console.error("nodeCheck 오류:", error);
    throw error;
  }
};

export const NodeCheck = async (data) => {
  try {
    const response = await api.post("/api/v1/alert-api/node-check", data);
    return response;
  } catch (error) {
    console.error("nodeCheck 오류:", error);
    throw error;
  }
};

export const DevCheck = async (data) => {
  try {
    const response = await api.post("/api/v1/alert-api/dev-check", data);
    return response;
  } catch (error) {
    console.error("nodeCheck 오류:", error);
    throw error;
  }
};

export const requirementRequest = async (data) => {
  try {
    const response = await api.post("/api/v1/naindae-api/multiregion", data);
    return response;
  } catch (error) {
    console.error("requirementRequest 오류:", error);
    throw error;
  }
};

export const saveDiagram = async (data, fileName, img) => {
  try {
    const body = {
      diagramData: data,
      fileName: fileName,
      fileImg: img,
    };
    const response = await api.post("/api/v1/file-api/save-diagram", body);
    return response;
  } catch (error) {
    console.error("save-diagram 오류:", error);
    throw error;
  }
};

export const updateDiagram = async (data, fileName, img) => {
  try {
    const body = {
      diagramData: data,
      fileName: fileName,
      fileImg: img,
    };
    const response = await api.post("/api/v1/file-api/update-diagram", body);
    return response;
  } catch (error) {
    console.error("update-diagram 오류:", error);
    throw error;
  }
};
