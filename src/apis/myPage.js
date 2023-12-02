import api from "./index.js";

export const myNetworkDB = () =>
  api.post(`/api/v1/mypage-api/architecture/history/list`);

export const getDiagramData = async (id) =>{
  try {
    const response = await api.post(`/api/v1/mypage-api/architecture/history/diagram`, id);
    return response;
  } catch (error) {
    console.error("getDiagramData 오류:", error);
    throw error;
  }
};

export const deleteDiagramData = async (id) =>{
  try {
    const response = await api.post(`/api/v1/mypage-api/architecture/history/delete`, id);
    console.log(response)
    return response;
  } catch (error) {
    console.error("deleteDiagramData 오류:", error);
    throw error; 
  }
}