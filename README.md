# 📌 Pinterest Clone – AWS Cloud Project

A Pinterest-inspired full-stack web application built with **React** and deployed on **AWS Amplify**, featuring secure authentication, user-specific image storage, and a scalable, cloud-native backend powered by AWS services.

---

## 🚀 Features

* **User Authentication**

  * Secure sign-up, login, and session management using **Amazon Cognito**.

* **Frontend Hosting & CI/CD**

  * Continuous deployment and hosting via **AWS Amplify** integrated with GitHub.

* **User-Specific Image Storage**

  * Images stored in **Amazon S3**, accessible only to the authenticated user.

* **Metadata Management**

  * **AWS Lambda + DynamoDB** for logging and retrieving image metadata:

    * File size
    * File type
    * Upload timestamp
    * Last modified time

* **Relational Database Support**

  * **Amazon RDS (MySQL/PostgreSQL)** for structured data and complex queries.

* **Scalable & Secure Architecture**

  * Fully cloud-native design with **IAM-based role permissions** and best practices.

---

## 🛠️ Tech Stack

**Frontend**

* React
* React Router
* Tailwind CSS (optional)

**Backend**

* AWS Lambda
* Amazon DynamoDB
* Amazon RDS (MySQL / PostgreSQL)

**Authentication**

* Amazon Cognito

**Storage**

* Amazon S3

**Deployment & DevOps**

* AWS Amplify
* GitHub (CI/CD)
* AWS CloudShell (debugging with `nslookup`, `dig`, etc.)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/FirstP0P/Pinterest.git
cd Pinterest-main
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Locally

```bash
npm start
```

### 4️⃣ Build for Production

```bash
npm run build
```

---

## ☁️ AWS Deployment Guide

### 🔹 Amplify Hosting

1. Connect the GitHub repository to **AWS Amplify**.
2. Amplify automatically builds and deploys the app on every `git push`.

---

### 🔹 Cognito Authentication

1. Create a **Cognito User Pool** and **Identity Pool**.
2. Configure authentication in the React app using `aws-exports.js`.

---

### 🔹 S3 + Lambda + DynamoDB Integration

1. Create an **S3 bucket** for image uploads.
2. Configure an event trigger on `s3:ObjectCreated:*`.
3. Trigger a **Lambda function** to extract metadata.
4. Store metadata in **DynamoDB**.

#### Example Lambda Function (Node.js)

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'S3FileMetadata';

exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    const head = await s3.headObject({
      Bucket: bucket,
      Key: key
    }).promise();

    const item = {
      fileId: key,
      bucketName: bucket,
      fileSize: head.ContentLength,
      contentType: head.ContentType,
      lastModified: head.LastModified.toISOString(),
      uploadTime: record.eventTime
    };

    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();
  }

  return {
    statusCode: 200,
    body: 'Metadata logged successfully.'
  };
};
```

---

## 🔐 Security Best Practices

* IAM roles with least-privilege access
* User-isolated S3 object permissions
* Secure Cognito authentication flows
* Serverless architecture for reduced attack surface

---

## 📜 License

This project is licensed under the **MIT License**.
