const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
const { handler } = require('../index');


describe('Lambda Handler Tests', () => {
	beforeAll(() => {
		AWSMock.setSDKInstance(AWS);
	});

	afterEach(() => {
		AWSMock.restore('DynamoDB.DocumentClient');
	});

	it('should return players on /api/players', async () => {
		process.env.AWS_REGION = "us-east-1";

		AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			callback(null, { Items: [{ id: 'player1' }, { id: 'player2' }] });
		});

		const event = {
			rawPath: '/api/players',
			requestContext: { http: { method: 'GET' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(200);
		const body = JSON.parse(result.body);
		expect(body.length).toBe(2);
		expect(body[0].id).toBe('player1');
	});

	it('should return teams on /api/teams', async () => {
		
		AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			callback(null, { Items: [{ id: 'team1' }] });
		});

		const event = {
			path: '/api/teams',
			httpMethod: 'GET',
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(200);
		const body = JSON.parse(result.body);
		expect(body[0].id).toBe('team1');
	});

	it('should return games on /api/games', async () => {
		AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			callback(null, { Items: [{ id: 'game1' }, { id: 'game2' }] });
		});

		const event = {
			rawPath: '/api/games',
			requestContext: { http: { method: 'GET' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(200);
		const body = JSON.parse(result.body);
		expect(body.length).toBe(2);
		expect(body[0].id).toBe('game1');
	});

	it('should return empty list when Items not found', async () => {
		AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			callback(null, { noItems: [] });
		});

		const event = {
			rawPath: '/api/games',
			requestContext: { http: { method: 'GET' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(200);
		const body = JSON.parse(result.body);
		expect(body.length).toBe(0);
	});

	it('should return 405 on non-GET method', async () => {
		const event = {
			rawPath: '/api/players',
			requestContext: { http: { method: 'POST' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(405);
	});

	it('should return 404 on unknown path', async () => {
		const event = {
			rawPath: '/api/unknown',
			requestContext: { http: { method: 'GET' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(404);
	});

	it('should catch error and return empty list', async () => {
		AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			callback(new Error('DynamoDB error'), null);
		});

		const event = {
			rawPath: '/api/players',
			requestContext: { http: { method: 'GET' } },
		};

		const result = await handler(event);

		expect(result.statusCode).toBe(500);
		expect(result.body).toContain("Internal Server Error");
	});



});
