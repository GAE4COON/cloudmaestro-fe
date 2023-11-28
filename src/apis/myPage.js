import api from "./index.js";

export const myNetworkDB = () =>
  api.post(`/api/v1/mypage-api/architecture/history/list`);

export const getDiagramData = async (id) =>{
  try {
    console.log(typeof(id), id)
    const response = await api.post(`/api/v1/mypage-api/architecture/history/diagram`, id);
    console.log(response)
    return response;
  } catch (error) {
    // 여기에 오류 처리 로직 작성
    console.error("requestExample 오류:", error);
    throw error; // 오류를 다시 던지거나 필요에 따라 다른 동작을 수행
  }
};