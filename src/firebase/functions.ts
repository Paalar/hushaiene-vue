import UserFunctions from './functions/user';
import LoginFunctions from './functions/login';
import StandardFunctions from './functions/standard';


export default {
    ...UserFunctions,
    ...LoginFunctions,
    ...StandardFunctions,
};
