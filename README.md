# IoT Data Visualization with AWS and Grafana

This project is part of an IoT course assignment to design a simple IoT architecture, retrieve data from a sensor or external API, process it using AWS services, and visualize the data using a cloud-based tool.

---

## Project Overview

This project retrieves weather data from the SMHI API, processes it via an AWS Lambda function, stores it in DynamoDB, and visualizes the data in Grafana. The system is automated using AWS EventBridge to trigger the Lambda function periodically.

---

## Features

- **Retrieve data** from an external API (SMHI).
- **Store processed data** in an AWS DynamoDB table.
- **Visualize the data** in Grafana.
- **Automated scheduling** using AWS EventBridge.
- Demonstrates **secure IoT architecture** using AWS services.

---

## Architecture

*(Add your architecture diagram here - for example, a flow diagram showing SMHI API → AWS Lambda → DynamoDB → Grafana.)*

The project consists of the following components:

1. **Sensor/External API**: SMHI's weather data API.
2. **Gateway**: AWS Lambda function that processes the data.
3. **Data Storage**: AWS DynamoDB table for storing processed data.
4. **Visualization**: Grafana dashboard displaying data from CloudWatch metrics.

---

## Prerequisites

- AWS account
- Grafana Cloud account
- Basic knowledge of AWS Lambda, EventBridge, and DynamoDB

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/JEPPE9103/IoT-Data-Visualization.git
cd IoT-Data-Visualization
```

### 2. Deploy AWS Resources

#### a. Create a DynamoDB Table

1. Navigate to the **DynamoDB** service in the AWS Management Console.
2. Click **Create Table** and configure the following:
   - **Table Name**: `SensorDataTable`
   - **Primary Key**: `id` (String)
3. Click **Create** to save the table.

---

#### b. Deploy the Lambda Function

1. Navigate to the **Lambda** service in the AWS Management Console.
2. Click **Create Function** and configure:
   - **Function Name**: `MyFunction` (or any name of your choice)
   - **Runtime**: Node.js
   - **Execution Role**: Create or attach an IAM role with permissions to:
     - Access DynamoDB (`PutItem` action on your table).
     - Make HTTP requests.
3. Upload the `lambda_function.js` file:
   - Under **Code source**, click **Upload from > .zip file** or paste the provided code directly into the code editor.
   - Ensure you update the **table name** in the code to match your DynamoDB table.
4. Save and test the function by providing mock data or invoking it manually.

---

#### c. Configure an EventBridge Schedule

1. Navigate to **EventBridge** in the AWS Management Console.
2. Create a new **Rule** and configure:
   - **Rule Name**: `SMHI_Data_Poller`
   - **Event Source**: Schedule
   - **Schedule Expression**: Use `rate(5 minutes)` or `cron(*/5 * * * ? *)` to run every 5 minutes.
3. Add the Lambda function as the target:
   - Choose your Lambda function from the dropdown menu.
   - Leave the payload empty unless specific input is needed.

