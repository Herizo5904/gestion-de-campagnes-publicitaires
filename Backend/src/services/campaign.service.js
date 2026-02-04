const Campaign = require("../models/Campaign.model");

const createCampaign = (data) => {
  return Campaign.create(data);
};

const getCampaigns = (filters, page, limit) => {
  return Campaign.find(filters)
    .skip((page - 1) * limit)
    .limit(limit);
};

const getCampaignById = (id) => {
  return Campaign.findById(id);
};

const updateStatus = (id, status) => {
  return Campaign.findByIdAndUpdate(id, { status }, { new: true });
};

const getStats = async (id) => {
  const campaign = await Campaign.findById(id);
  if (!campaign) {
    return null;
  }

  const ctr =
    campaign.impressions === 0
      ? 0
      : (campaign.clicks / campaign.impressions) * 100;

  const cpc = campaign.clicks === 0 ? 0 : campaign.budget / campaign.clicks;

  return {
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    CTR: ctr,
    CPC: cpc,
  };
};

module.exports = {
    createCampaign , 
    getCampaigns , 
    getCampaignById , 
    updateStatus, 
    getStats
}