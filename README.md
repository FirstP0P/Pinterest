## README.md

# Pinterest Clone - AWS Cloud Project

A Pinterest-inspired web application built with React and deployed using AWS Amplify, featuring secure authentication, user-specific image storage, and scalable backend integrations with AWS services.
---

## 🚀 Features
- Authentication: Amazon Cognito for user sign-up, login, and secure session management.
- Frontend Hosting: Deployed on AWS Amplify for CI/CD and hosting.
- User-Specific Storage: Amazon S3 for storing photos, accessible only by the authenticated user.
- Metadata Management: AWS Lambda + DynamoDB to log and retrieve file metadata (file size, type, timestamps).
- Relational Database: Amazon RDS for structured data storage and queries.
- Scalable & Secure: Fully cloud-native architecture with IAM-based role permissions.

---

## 🛠️ Tech Stack
- Frontend: React, React Router, Tailwind (optional, based on your code)
- Backend: AWS Lambda, Amazon RDS (PostgreSQL/MySQL), Amazon DynamoDB
- Authentication: Amazon Cognito
- Storage: Amazon S3
- Deployment: AWS Amplify
- Other Tools: GitHub (CI/CD integration), CloudShell for debugging (nslookup, dig)
- 
---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/FirstP0P/Pinterest.git
cd Pinterest-main
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

### 4. Build for production

```bash
npm run build
```

---

## ☁️ AWS Deployment Guide

### Amplify Hosting

1. Connect the GitHub repo to AWS Amplify.
2. Amplify automatically builds and deploys on git push.

### Cognito Authentication

* Create a Cognito User Pool and Identity Pool.
* Configure in React app using aws-exports.js.

### S3 + DynamoDB + Lambda

* Create an S3 bucket for image uploads.
* Trigger a Lambda function on s3:ObjectCreated:*.
* Lambda stores metadata (size, type, timestamps) in DynamoDB.

Example Lambda (Node.js):

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'S3FileMetadata';

exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const head = await s3.headObject({ Bucket: bucket, Key: key }).promise();

    const item = {
      fileId: key,
      bucketName: bucket,
      fileSize: head.ContentLength,
      contentType: head.ContentType,
      lastModified: head.LastModified.toISOString(),
      uploadTime: record.eventTime
    };

    await dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise();
  }
  return { statusCode: 200, body: 'Metadata logged successfully.' };
};
```
---

## 📜 License

MIT License
