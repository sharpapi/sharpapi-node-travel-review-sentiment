![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Travel Review Sentiment Checker API for Node.js

## ✈️ Analyze travel review sentiment — powered by SharpAPI AI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-travel-review-sentiment.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-travel-review-sentiment)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-travel-review-sentiment.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Travel Review Sentiment** analyzes travel and hospitality reviews to determine sentiment (positive, negative, neutral). Helps businesses understand guest satisfaction and identify service issues.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [Use Cases](#use-cases)
7. [API Endpoint](#api-endpoint)
8. [Related Packages](#related-packages)
9. [License](#license)

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

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiTravelReviewSentimentService(apiKey);

const review = 'Amazing hotel! The staff was friendly and the location was perfect.';

async function processText() {
  try {
    // Submit processing job
    const statusUrl = await service.analyzeReviewSentiment(review);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    console.log('Result:', result.getResultJson());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

processText();
```

---

## API Documentation

### Methods

The service provides methods for processing content asynchronously. All methods return a status URL for polling results.

**Parameters:**
- `content` (string, required): The content to process
- `language` (string, optional): Output language
- `voice_tone` (string, optional): Desired tone (e.g., professional, casual)
- `context` (string, optional): Additional context for better results

For complete API specifications, see the [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGseb).

### Response Format

The API returns structured JSON data. Response format varies by endpoint - see documentation for details.

---

## Examples

### Basic Example

```javascript
const { SharpApiTravelReviewSentimentService } = require('@sharpapi/sharpapi-node-travel-review-sentiment');

const service = new SharpApiTravelReviewSentimentService(process.env.SHARP_API_KEY);

// Customize polling behavior if needed
service.setApiJobStatusPollingInterval(10);  // Poll every 10 seconds
service.setApiJobStatusPollingWait(180);     // Wait up to 3 minutes

// Use the service
// ... (implementation depends on specific service)
```

For more examples, visit the [Product Page](https://sharpapi.com/en/catalog/ai/travel-tourism-hospitality/travel-review-sentiment-checker).

---

## Use Cases

- **Guest Feedback**: Quickly identify positive and negative reviews
- **Service Quality**: Monitor hospitality service levels
- **Review Moderation**: Prioritize addressing negative feedback
- **Competitive Analysis**: Analyze competitor review sentiments
- **Property Management**: Use sentiment data to improve services
- **Reputation Management**: Track and respond to review trends

---

## API Endpoint

**POST** `/tth/review_sentiment`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGseb)
- [Product Page](https://sharpapi.com/en/catalog/ai/travel-tourism-hospitality/travel-review-sentiment-checker)

---

## Related Packages

- [@sharpapi/sharpapi-node-product-review-sentiment](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-review-sentiment)
- [@sharpapi/sharpapi-node-hospitality-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-hospitality-categories)
- [@sharpapi/sharpapi-node-tours-activities-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-tours-activities-categories)

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
