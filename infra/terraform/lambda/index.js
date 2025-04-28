const AWS = require("aws-sdk");


const TABLE_NAME = process.env.TABLE_NAME || "LeagueData";

exports.handler = async (event) => {
	console.log("Received event:", JSON.stringify(event));

	const path = event.rawPath || event.path;
	const method = event.requestContext?.http?.method || event.httpMethod;

	if (method !== "GET") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	if (path === "/api/players") {
		return await queryByType("PLAYER");
	}

	if (path === "/api/teams") {
		return await queryByType("TEAM");
	}

	if (path === "/api/games") {
		return await queryByType("GAME");
	}

	return {
		statusCode: 404,
		body: JSON.stringify({ message: "Not Found" }),
	};
};

// Helper function to query DynamoDB
async function queryByType(type) {

	const dynamodb = new AWS.DynamoDB.DocumentClient({
		region:  "us-east-1",
	});

	const params = {
		TableName: TABLE_NAME,
		KeyConditionExpression: "pk = :type",
		ExpressionAttributeValues: {
			":type": type,
		},
	};

	try {
		const result = await dynamodb.query(params).promise();
		const payload = result.Items || [];
		return {
			statusCode: 200,
			body: JSON.stringify(payload),
		};
	} catch (error) {
		console.error("Error querying DynamoDB:", error);
		return {
			statusCode: 500,
			body: "Internal Server Error :: " + error.message,
		};
	}
}
