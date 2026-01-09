![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Travel Review Sentiment Analyzer API for Node.js

## ✈️ Analyze travel review sentiment with AI — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-travel-review-sentiment.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-travel-review-sentiment)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-travel-review-sentiment.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Travel Review Sentiment Analyzer** uses AI to determine if travel reviews are positive, negative, or neutral with confidence scores. Perfect for hotels, airlines, tour operators, and travel booking platforms.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Response Format](#response-format)
6. [Examples](#examples)
7. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-travel-review-sentiment
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiTravelReviewSentimentService } = require('@sharpapi/sharpapi-node-travel-review-sentiment');

const apiKey = process.env.SHARP_API_KEY;
const service = new SharpApiTravelReviewSentimentService(apiKey);

const review = `
Amazing hotel! The staff was incredibly friendly and helpful.
The room was spacious and clean with a beautiful ocean view.
Would definitely recommend and stay here again!
`;

async function analyzeReview() {
  try {
    const statusUrl = await service.analyzeSentiment(review);
    console.log('Job submitted. Status URL:', statusUrl);

    const result = await service.fetchResults(statusUrl);
    const sentiment = result.getResultJson();

    console.log('Sentiment:', sentiment.opinion);
    console.log('Confidence:', sentiment.score + '%');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

analyzeReview();
```

---

## API Documentation

### Methods

#### `analyzeSentiment(reviewText: string): Promise<string>`

Analyzes the sentiment of a travel review.

**Parameters:**
- `reviewText` (string, required): The travel review text to analyze

**Returns:**
- Promise<string>: Status URL for polling the job result

---

## Response Format

The API returns sentiment classification with confidence score:

```json
{
  "opinion": "POSITIVE",
  "score": 95,
  "key_aspects": {
    "service": "positive",
    "cleanliness": "positive",
    "location": "positive",
    "value": "neutral"
  },
  "summary": "Highly positive review praising staff, room quality, and views"
}
```

**Sentiment Values:**
- `POSITIVE`: Review expresses satisfaction or praise
- `NEGATIVE`: Review expresses dissatisfaction or criticism
- `NEUTRAL`: Review is balanced or factual without strong opinion

**Confidence Score:**
- `90-100%`: Very high confidence
- `75-89%`: High confidence
- `60-74%`: Moderate confidence
- `Below 60%`: Low confidence (review may be ambiguous)

---

## Examples

### Basic Sentiment Analysis

```javascript
const { SharpApiTravelReviewSentimentService } = require('@sharpapi/sharpapi-node-travel-review-sentiment');

const service = new SharpApiTravelReviewSentimentService(process.env.SHARP_API_KEY);

const review = 'The hotel location was great but the room was dirty and noisy.';

service.analyzeSentiment(review)
  .then(statusUrl => service.fetchResults(statusUrl))
  .then(result => {
    const sentiment = result.getResultJson();

    const emoji = sentiment.opinion === 'POSITIVE' ? '😊' :
                  sentiment.opinion === 'NEGATIVE' ? '😞' : '😐';

    console.log(`${emoji} Sentiment: ${sentiment.opinion} (${sentiment.score}% confidence)`);
  })
  .catch(error => console.error('Analysis failed:', error));
```

### Batch Review Analysis for Hotels

```javascript
const service = new SharpApiTravelReviewSentimentService(process.env.SHARP_API_KEY);

const hotelReviews = [
  { id: 1, text: 'Perfect location! Walking distance to everything.' },
  { id: 2, text: 'Terrible experience. Would not recommend.' },
  { id: 3, text: 'Average hotel. Nothing special but decent value.' },
  { id: 4, text: 'Outstanding service! Best vacation ever!' }
];

async function analyzeAllReviews(reviews) {
  const analyzed = await Promise.all(
    reviews.map(async (review) => {
      const statusUrl = await service.analyzeSentiment(review.text);
      const result = await service.fetchResults(statusUrl);
      const sentiment = result.getResultJson();

      return {
        id: review.id,
        text: review.text,
        sentiment: sentiment.opinion,
        score: sentiment.score
      };
    })
  );

  const positive = analyzed.filter(r => r.sentiment === 'POSITIVE').length;
  const negative = analyzed.filter(r => r.sentiment === 'NEGATIVE').length;
  const neutral = analyzed.filter(r => r.sentiment === 'NEUTRAL').length;

  return {
    total: reviews.length,
    positive,
    negative,
    neutral,
    positiveRate: Math.round((positive / reviews.length) * 100),
    reviews: analyzed
  };
}

const analysis = await analyzeAllReviews(hotelReviews);

console.log('📊 Review Analysis Summary:');
console.log(`Total Reviews: ${analysis.total}`);
console.log(`Positive: ${analysis.positive} (${analysis.positiveRate}%)`);
console.log(`Negative: ${analysis.negative}`);
console.log(`Neutral: ${analysis.neutral}`);
```

### Real-time Review Monitoring

```javascript
const service = new SharpApiTravelReviewSentimentService(process.env.SHARP_API_KEY);

async function monitorReview(review, alertThreshold = 40) {
  const statusUrl = await service.analyzeSentiment(review.text);
  const result = await service.fetchResults(statusUrl);
  const sentiment = result.getResultJson();

  const alert = {
    reviewId: review.id,
    sentiment: sentiment.opinion,
    score: sentiment.score,
    needsAttention: sentiment.opinion === 'NEGATIVE' && sentiment.score >= 70,
    needsResponse: sentiment.opinion === 'NEGATIVE' && sentiment.score >= 85,
    priority: sentiment.opinion === 'NEGATIVE' ?
              (sentiment.score >= 85 ? 'HIGH' :
               sentiment.score >= 70 ? 'MEDIUM' : 'LOW') :
              'NONE'
  };

  if (alert.needsResponse) {
    console.log(`🚨 URGENT: Negative review detected (${alert.score}%)`);
    console.log(`   Review ID: ${alert.reviewId}`);
    console.log(`   Action: Immediate response required`);
  } else if (alert.needsAttention) {
    console.log(`⚠️  WARNING: Negative feedback detected`);
    console.log(`   Review ID: ${alert.reviewId}`);
    console.log(`   Action: Manager review recommended`);
  }

  return alert;
}

const newReview = {
  id: 'REV-12345',
  text: 'Absolutely terrible. The worst hotel experience ever. Staff was rude and unprofessional.'
};

const alert = await monitorReview(newReview);
```

### Travel Platform Dashboard

```javascript
const service = new SharpApiTravelReviewSentimentService(process.env.SHARP_API_KEY);

async function generatePropertyInsights(propertyId, reviews) {
  const sentiments = await Promise.all(
    reviews.map(async (review) => {
      const statusUrl = await service.analyzeSentiment(review.text);
      const result = await service.fetchResults(statusUrl);
      return result.getResultJson();
    })
  );

  const positive = sentiments.filter(s => s.opinion === 'POSITIVE');
  const negative = sentiments.filter(s => s.opinion === 'NEGATIVE');
  const avgScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;

  return {
    propertyId,
    totalReviews: reviews.length,
    sentimentBreakdown: {
      positive: positive.length,
      negative: negative.length,
      neutral: sentiments.length - positive.length - negative.length
    },
    averageConfidence: Math.round(avgScore),
    overallRating: positive.length > negative.length ? 'Positive' : 'Negative',
    needsImprovement: negative.length > reviews.length * 0.3,
    recommendation: negative.length > reviews.length * 0.5 ?
      'Critical: Immediate action required' :
      negative.length > reviews.length * 0.3 ?
      'Warning: Address customer concerns' :
      'Good: Maintain current service levels'
  };
}

const propertyReviews = [
  { text: 'Excellent experience!' },
  { text: 'Good value for money.' },
  { text: 'Room was dirty and outdated.' }
];

const insights = await generatePropertyInsights('HOTEL-789', propertyReviews);
console.log('Property Insights:', insights);
```

---

## Use Cases

- **Hotel Management**: Monitor guest satisfaction in real-time
- **Online Travel Agencies**: Filter and display reviews by sentiment
- **Tour Operators**: Track customer experience across tours
- **Airlines**: Analyze passenger feedback and service quality
- **Restaurant Reviews**: Understand diner satisfaction trends
- **Reputation Management**: Identify and respond to negative feedback quickly
- **Competitive Analysis**: Compare sentiment across properties

---

## Travel-Specific Sentiment Analysis

The analyzer evaluates travel-specific factors:

- **Service Quality**: Staff friendliness, professionalism
- **Cleanliness**: Room and facility cleanliness
- **Location**: Accessibility, convenience, safety
- **Value for Money**: Price vs. quality perception
- **Amenities**: Facilities and services quality
- **Food & Beverage**: Dining experience
- **Comfort**: Room comfort, noise levels
- **Overall Experience**: General satisfaction level

---

## API Endpoint

**POST** `/tth/review_sentiment`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVf)
- [Product Page](https://sharpapi.com/en/catalog/ai/travel-tourism-hospitality/travel-review-sentiment-checker)

---

## Related Packages

- [@sharpapi/sharpapi-node-product-review-sentiment](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-review-sentiment) - Product review sentiment
- [@sharpapi/sharpapi-node-hospitality-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-hospitality-categories) - Hospitality categorization
- [@sharpapi/sharpapi-node-detect-spam](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam) - Spam detection
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
