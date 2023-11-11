import api from "./index.js";

export const myNetworkDB = (userId) =>
  api.post(`/api/v1/mypage-api/network/user/${userId}`); // 백틱 사용