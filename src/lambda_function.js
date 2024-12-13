import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "SensorDataTable"; // Ändra till ditt tabellnamn om det är annorlunda

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
          id: rJson.station.key, // Lägg till "id" som krävs av din DynamoDB-tabell
          timestamp: rJson.value[0].date.toString(), // Konvertera timestamp till en sträng
          name: rJson.station.name,
          device_type: "weatherStation",
          temperature: parseFloat(rJson.value[0].value),
        },
      })
    );
  }

  return {};
};
