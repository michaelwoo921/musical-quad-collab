import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import { User } from '../user/user';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
	TableName: 'users',
};

const userSchema = {
	AttributeDefinitions: [
		{
			AttributeName: 'username',
			AttributeType: 'S',
		},
	],
	KeySchema: [
		{
			AttributeName: 'username',
			KeyType: 'HASH',
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	},
	TableName: 'users',
	StreamSpecification: {
		StreamEnabled: false,
	},
};

ddb.deleteTable(removeUsers, function (err: any, data: any) {
	if (err) {
		console.error(
			'Unable to delete table. Error JSON:',
			JSON.stringify(err, null, 2)
		);
	} else {
		console.log(
			'Deleted table. Table description JSON:',
			JSON.stringify(data, null, 2)
		);
	}
	setTimeout(() => {
		ddb.createTable(userSchema, (err, data) => {
			if (err) {
				// log the error
				console.log('Error', err);
			} else {
				// celebrate, I guess
				console.log('Table Created', data);
				setTimeout(() => {
					populateUserTable();
				}, 5000);
			}
		});
	}, 5000);
});

function populateUserTable() {
	userService
		.addUser(
			new User(
				'Cus',
				'pass',
				'customer',
				10,
				[
					{
						song_id: 10,
						title: 'Badfish',
						artist: 'Sublime',
						year: '1996',
						web_url: 'http://www.songnotes.cc/songs/21-sublime-badfish',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/Sublime.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 11,
						title: 'Banana Pancakes',
						artist: 'Jack Johnson',
						year: '2005',
						web_url:
							'http://www.songnotes.cc/songs/102-jack-johnson-banana-pancakes',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JackJohnson.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 12,
						title: 'Barefoot Children',
						artist: 'Jimmy Buffett',
						year: '1995',
						web_url:
							'http://www.songnotes.cc/songs/9-jimmy-buffett-barefoot-children',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JimmyBuffett.png',
						clicks: 0,
						price: 1,
					},
				],
				['Workout', 'Lo-fi'],
				[]
			)
		)
		.then(() => {});
	userService
		.addUser(
			new User(
				'Emp',
				'pass',
				'customer',
				10,
				[
					{
						song_id: 23,
						title: 'Darkness Between the Fireflies',
						artist: 'Mason Jennings',
						year: '1997',
						web_url:
							'http://www.songnotes.cc/songs/16-mason-jennings-darkness-between-the-fireflies',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/MasonJennings.jpg',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 24,
						title: 'Dead Sea',
						artist: 'The Lumineers',
						year: '2012',
						web_url: 'http://www.songnotes.cc/songs/98-the-lumineers-dead-sea',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/TheLumineers.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 25,
						title: 'Distantly in Love',
						artist: 'Jimmy Buffett',
						year: '1983',
						web_url:
							'http://www.songnotes.cc/songs/35-jimmy-buffett-distantly-in-love',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JimmyBuffett.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 26,
						title: 'Dont Leave Me (Ne Me Quitte Pas)',
						artist: 'Regina Spektor',
						year: '2012',
						web_url:
							'http://www.songnotes.cc/songs/77-regina-spektor-dont-leave-me-no-me-quitte-pas',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/ReginaSpektor.jpg',
						clicks: 0,
						price: 1,
					},
				],
				['Dance', 'Hype'],
				[]
			)
		)
		.then(() => {});
	userService
		.addUser(
			new User(
				'Adm',
				'pass',
				'admin',
				10,
				[
					{
						song_id: 29,
						title: 'Doomsday',
						artist: 'Elvis Perkins',
						year: '2009',
						web_url: 'http://www.songnotes.cc/songs/120-elvis-perkins-doomsday',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/ElvisPerkins.jpg',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 30,
						title: 'Do You Remember',
						artist: 'Jack Johnson',
						year: '2005',
						web_url:
							'http://www.songnotes.cc/songs/3-jack-johnson-do-you-remember',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JackJohnson.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 31,
						title: 'Drink the Water',
						artist: 'Jack Johnson',
						year: '2001',
						web_url:
							'http://www.songnotes.cc/songs/32-jack-johnson-drink-the-water',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JackJohnson.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 32,
						title: 'Emmylou',
						artist: 'First Aid Kit',
						year: '2012',
						web_url: 'http://www.songnotes.cc/songs/74-first-aid-kit-emmylou',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/FirstAidKit.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 33,
						title: 'Fall Line',
						artist: 'Jack Johnson',
						year: '2003',
						web_url: 'http://www.songnotes.cc/songs/30-jack-johnson-fall-line',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/JackJohnson.png',
						clicks: 0,
						price: 1,
					},
					{
						song_id: 34,
						title: 'Father and Son',
						artist: 'Cat Stevens',
						year: '1970',
						web_url:
							'http://www.songnotes.cc/songs/28-cat-stevens-father-and-son',
						img_url:
							'http://fireflygrove.com/songnotes/images/artists/CatStevens.jpg',
						clicks: 0,
						price: 1,
					},
				],
				['Jazz', 'Classical'],
				[]
			)
		)
		.then(() => {});
}
