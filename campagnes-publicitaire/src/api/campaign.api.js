import http from "../services/http";

export const getCampaigns = () => http.get("/campaigns");
export const getCampaign = (id) => http.get(`/campaigns/${id}`);
export const createCampaign = (data) => http.post("/campaigns", data);
export const updateStatus = (id, status) =>
  http.patch(`/campaigns/${id}/status`, { status });
export const getStats = (id) => http.get(`/campaigns/${id}/stats`);
