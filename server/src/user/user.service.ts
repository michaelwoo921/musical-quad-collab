import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
	private doc: DocumentClient;
	constructor() {
		this.doc = dynamo;
	}

	async getUsers(): Promise<User[]> {
		const params = {
			TableName: 'users',
		};
		return await this.doc
			.scan(params)
			.promise()
			.then((data) => {
				logger.debug(`data Items: ${data.Items}`);
				return data.Items as User[];
			});
	}

	async getUserByName(username: string): Promise<User | null> {
		const params = {
			TableName: 'users',
			Key: {
				username: username,
			},
		};
		return await this.doc
			.get(params)
			.promise()
			.then((data) => {
				if (data && data.Item) {
					logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
					return data.Item as User;
				} else {
					return null;
				}
			});
	}

	async addUser(user: User): Promise<boolean> {
		// object to be sent to AWS.
		const params = {
			// TableName - the name of the table we are sending it to
			TableName: 'users',
			// Item - the object we are sending
			Item: user,
			ConditionExpression: '#username <> :username',
			ExpressionAttributeNames: {
				'#username': 'username',
				//'#role': 'role'
			},
			ExpressionAttributeValues: {
				':username': user.username,
				//':role': user.role
			},
		};

		return await this.doc
			.put(params)
			.promise()
			.then((result: any) => {
				logger.info('Successfully created user');
				return true;
			})
			.catch((error: any) => {
				logger.error(error);
				return false;
			});
	}

	async updateUser(user: User) {
		const params = {
			TableName: 'users',
			Key: {
				username: user.username,
			},
			UpdateExpression:
				'set #p = :pa, credits = :cr, favorites = :fa, playlist = :pl, bought = :bo',
			ExpressionAttributeNames: {
				'#p': 'password',
			},
			ExpressionAttributeValues: {
				':cr': user.credits,
				':fa': user.favorites,
				':pl': user.playlist,
				':pa': user.password,
				':bo': user.bought,
			},
			ReturnValues: 'UPDATED_NEW',
		};
		return await this.doc
			.update(params)
			.promise()
			.then((data: any) => {
				logger.debug(data);
				return true;
			})
			.catch((error: any) => {
				logger.error(error);
				return false;
			});
	}

	async deleteUser(username: string): Promise<boolean> {
		const params = {
			TableName: 'users',
			Key: {
				username: username,
			},
		};

		return await this.doc
			.delete(params)
			.promise()
			.then((data: any) => {
				return true;
			})
			.catch((err: any) => {
				logger.error(err);
				return false;
			});
	}
} //end of UserService

const userService = new UserService();
export default userService;
