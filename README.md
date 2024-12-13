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
git clone https://github.com/username/IoT-Data-Visualization.git
cd IoT-Data-Visualization
```

