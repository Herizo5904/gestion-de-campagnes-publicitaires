const campaignService = require("../services/campaign.service");

exports.create = async (req, res, next) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const campaigns = await campaignService.getCampaigns({}, page, limit);
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "il y a des erreurs " });
    } else {
      res.json(campaign);
    }
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaignById(
      req.params.id,
      req.body.status,
    );
    res.json(campaign);
  } catch (err) {
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const stats = await campaignService.getStats(req.params.id);
    if (!stats) {
      return res.status(404).json({ message: "il y a des erreurs" });
    } else {
      res.json(stats);
    }
  } catch (err) {
    next(err);
  }
};
