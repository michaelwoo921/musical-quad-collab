import express from 'express';
import * as user from './user';
import logger from '../log';
import userService from './user.service';
import publicDir from '../constant';

const router = express.Router();

router.get('/', (req: any, res, next) => {
	let u = { ...req.session.user };
	logger.debug(u);
	//delete u.password;
	if (u.username) {
		res.send(JSON.stringify(u));
	} else {
		res.sendStatus(401); // unauthorized
	}
});

// needed this to get session
router.get('/login', function (req: any, res, next) {
	// If I'm already logged in, why would I log in again?
	if (req.session.user) {
		console.log(req.session.user);
		res.redirect('/');
	}
	res.send('<h1> Not logged in </h1>');
});

/* testing whether dynamo db connection works and set session*/
router.post('/', function (req: any, res) {
	logger.debug(req.body);
	user.login(req.body.username, req.body.password).then((user) => {
		if (user === null) {
			res.sendStatus(401);
		} else {
			req.session.user = user;
			res.send(JSON.stringify(user));
		}
	});
});

router.put('/', (req: any, res, next) => {
	logger.debug(req.body);
	userService.updateUser(req.body).then((result) => {
		if (result) {
			res.status(204).send('User updated');
		} else {
			res.status(400).send('Failed to update user');
		}
	});
});

router.delete('/:username', function (req: any, res: any) {
	const username = req.params.username;
	if (req.session && req.session.user && req.session.user.role === 'employee') {
		userService
			.deleteUser(username)
			.then((data) => {
				logger.debug(username, ' : delete a user');
				res.send(JSON.stringify(data));
			})
			.catch((err) => res.send(JSON.stringify(err)));
	} else if (
		req.session &&
		req.session.user &&
		req.session.user.role === 'admin'
	) {
		userService
			.deleteUser(username)
			.then((data) => {
				logger.debug(username, ' : delete an employee');
				res.send(JSON.stringify(data));
			})
			.catch((err) => res.send(JSON.stringify(err)));
	} else {
		console.log('You are not authorized to delete ' + username);
		res.send('You are not authorized to delete ' + username);
	}
});

// Much more restful
router.delete('/', (req, res, next) => {
	req.session.destroy((err) => logger.error(err));
	res.sendStatus(204);
});

// bad practice, let user register
router.post('/register', function (req: any, res: any) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		user
			.register(username, password)
			.then((data) => res.status(200).send(JSON.stringify(data)))
			.catch((err) => res.status(400).send(JSON.stringify(err)));
	} else {
		res.sendFile('error.html', { root: publicDir });
	}
});

// how do we register employee as an admin? How does browser know I am admin?
// the following route doesn't work at all.
router.post('/eregister', function (req: any, res: any) {
	let loggedUser = req.session.user;
	if (loggedUser && loggedUser.role === 'adm') {
		const username = req.body.username;
		const password = req.body.password;
		if (username) {
			user
				.eregister(username, password)
				.then((data: any) => res.status(200).send(JSON.stringify(data)))
				.catch((err: any) => res.status(400).send(JSON.stringify(err)));
		} else {
			res.sendFile('error.html', { root: publicDir });
		}
	} else {
		res.send('you are not authorized');
	}
});

function addEmployee(req: any, res: any, next: Function) {
	let u: any = req.session.user;
	// only admin can go to the next step
	if (u && u.role === 'admin') {
		return next;
	}
}

// bad practice, let user log in
router.post('/login', function (req: any, res: any) {
	const username = req.body.username;
	const password = req.body.password;
	user
		.login(username, password)
		.then((newUser) => {
			req.session.user = newUser;
			res.send(JSON.stringify(newUser));
		})
		.catch((err) => res.send(JSON.stringify(err)));
});

// bad practice, check if the  user logged in
router.get('/login', function (req: any, res, next) {
	if (req.session.user) {
		console.debug(req.session.user);
		res.redirect('/');
	}
	console.log('not logged in');
	res.sendFile('not logged in');
});

// let userlogout
router.get('/logout', (req, res, next) => {
	req.session.destroy((err) => logger.error(err));
	res.redirect('/');
});

export default router;
