import express from 'express';
import * as user from './user';
import logger from '../log';
import userService from './user.service';
import publicDir from '../constant';

const router = express.Router();

router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  //delete u.password;
  if(u.username) {
    res.send(JSON.stringify(u));
  } else {
    res.sendStatus(401); // unauthorized
  }
});

// needed this to get session
router.get('/login', function(req: any, res, next) {
  // If I'm already logged in, why would I log in again?
  if(req.session.user) {
    console.log(req.session.user);
    res.redirect('/');
  }
  res.send('<h1> Not logged in </h1>');
});

/* testing whether dynamo db connection works and set session*/
router.post('/', function(req: any, res) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    }
    else{
      req.session.user = user;
      res.send(JSON.stringify(user));
    }
  });
});


router.delete('/:username', function(req: any, res: any){
  const username = req.params.username;
  if( req.session && req.session.user && req.session.user.role === 'employee'){
    userService.deleteUser(username).then((data) => {
      logger.debug(username, ' : delete a user');
      res.send(JSON.stringify(data));
    }).catch((err) => res.send(JSON.stringify(err)) )

  }
  else {
    console.log('You are not authorized to delete ' + username);
    res.send('You are not authorized to delete ' + username);
  }
});


// Much more restful
router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})

// bad practice, let user register
router.post('/register', function(req: any, res: any){

  const username = req.body.username;
  const password = req.body.password;
  if(username && password){
    user.register(username, password).then(data => res.send(JSON.stringify(data)))
    .catch(err => res.send(JSON.stringify(err)));
  }
  else {
    res.sendFile('error.html', {root: publicDir});
  }

})

// bad practice, let user log in
router.post('/login', function(req: any, res: any){

  const username = req.body.username;
  const password = req.body.password;
  user.login(username, password).then(newUser =>  { 
    req.session.user = newUser;
    res.send(JSON.stringify(newUser))})
  .catch(err => res.send(JSON.stringify(err)));

})

// bad practice, check if the  user logged in 
router.get('/login', function(req: any, res, next) {
  if(req.session.user) {
    console.debug(req.session.user);
    res.redirect('/');
  }
  console.log('not logged in');
  res.sendFile('not logged in');
});

// let userlogout
router.get('/logout', (req, res, next) => {
  req.session.destroy((err)=> logger.error(err));
  res.redirect('/');
});


export default router;
