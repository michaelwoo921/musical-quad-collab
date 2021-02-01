import logger from '../log';
import userService from './user.service';


// add more codes below. Testing dynamodb connection purpose only. 
export class User {
    constructor(
        public userId: number,
        public username: string, 
        public password: string, 
        public role: string, // "customer", "employee", "admin"
        public credits: number,
        public favorites: number[],
        public playlist: number[],
        ){
    };
}


export async function login(username: string, password: string): Promise<User|null> {
    logger.debug(`${username +' '+ password}`);
    return await userService.getUserByName(username).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}

export async function register(username: string, password: string){
    userService.getUserByName(username).then(user => {
        if(user){
            logger.info(username + ' already exists');
        }
        else{
            const user = new User(10, username, password, 'customer', 100,  [], []);    
            // problem with userId, credit set to 100
            userService.addUser(user).then(data => data).catch(err => {
                logger.debug(err);
            })
        }
    });



 
   
}

