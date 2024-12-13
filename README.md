# IoT-Data-Visualization
This project is part of an IoT course assignment to design a simple IoT architecture, retrieve data from a sensor or external API, process it using AWS services, and visualize the data using a cloud-based tool.
Project Overview
This project retrieves weather data from the SMHI API, processes it via an AWS Lambda function, stores it in DynamoDB, and visualizes the data in Grafana. The system is automated using AWS EventBridge to trigger the Lambda function periodically.

Features
Retrieves data from an external API (SMHI).
Stores processed data in an AWS DynamoDB table.
Visualizes the data in Grafana.
Includes an automated scheduling system via AWS EventBridge.
Demonstrates secure IoT architecture using AWS services.
Architecture
(Add your architecture diagram here)

The project consists of the following components:

Sensor/External API: SMHI's weather data API.
Gateway: AWS Lambda function that processes the data.
Data Storage: AWS DynamoDB table for storing processed data.
Visualization: Grafana dashboard displaying data from CloudWatch metrics.
Prerequisites
AWS account
Grafana Cloud account
Basic knowledge of AWS Lambda, EventBridge, and DynamoDB
Setup Instructions
1. Clone the Repository
bash
Kopiera kod
git clone https://github.com/username/IoT-Data-Visualization.git
cd IoT-Data-Visualization
2. Deploy AWS Resources
Create a DynamoDB table:

Table name: SensorDataTable
Primary key: id (String)
Deploy a Lambda function:

Use the provided lambda_function.js script.
Add the necessary permissions to access DynamoDB.
Set up an EventBridge schedule:

Use a cron expression to trigger the Lambda function every 5 minutes.
3. Set Up Grafana
Create a Grafana Cloud account.
Add AWS CloudWatch as a data source.
Create a new dashboard to visualize Lambda metrics.
Lambda Function Code
Here's the code used in the Lambda function:

javascript
Kopiera kod
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "SensorDataTable";

export const handler = async (event) => {
  const r = await fetch(
    "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/72420/period/latest-hour/data.json"
  );
  const rJson = await r.json();

  if (r.status === 200) {
    console.log(JSON.stringify(rJson));
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: rJson.station.key,
          timestamp: rJson.value[0].date.toString(),
          name: rJson.station.name,
          device_type: "weatherStation",
          temperature: parseFloat(rJson.value[0].value),
        },
      })
    );
  }

  return {};
};
How It Works
Data Retrieval: The Lambda function fetches weather data from SMHI's API.
Data Processing: The data is processed and stored in a DynamoDB table.
Data Visualization: Grafana visualizes the stored data using CloudWatch metrics.
Challenges Faced
Setting up the correct IAM permissions for AWS services.
Debugging the EventBridge schedule to ensure periodic Lambda triggers.
Configuring Grafana to display real-time data.
Conclusion
This project demonstrates a complete IoT architecture from data retrieval to visualization, fulfilling the assignment's requirements.
