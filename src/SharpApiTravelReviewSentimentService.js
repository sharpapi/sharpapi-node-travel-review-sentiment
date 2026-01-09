const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for analyzing travel review sentiment using SharpAPI.com
 */
class SharpApiTravelReviewSentimentService extends SharpApiCoreService {
  /**
   * Creates a new SharpApiTravelReviewSentimentService instance
   * @param {string} apiKey - Your SharpAPI API key
   * @param {string} [apiBaseUrl='https://sharpapi.com/api/v1'] - API base URL
   */
  constructor(apiKey, apiBaseUrl = 'https://sharpapi.com/api/v1') {
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-travel-review-sentiment/1.0.1');
  }

  /**
   * Parses the Travel/Hospitality product review and provides its sentiment (POSITIVE/NEGATIVE/NEUTRAL)
   * with a score between 0-100%. Great for sentiment report processing for any online store.
   *
   * @param {string} text
   * @returns {Promise<string>} - The status URL.
   */
  async travelReviewSentiment(text) {
    const data = { content: text };
    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.TTH_REVIEW_SENTIMENT.url, data);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiTravelReviewSentimentService };