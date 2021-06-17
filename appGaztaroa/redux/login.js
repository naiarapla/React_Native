import * as ActionTypes from './ActionTypes';


export const login = (state = { isLoading: true, errMess: null, login:[{email:"", password:"", stateLogin: false} ]}, action) => {

  switch (action.type) {
    case ActionTypes.POST_LOGIN:
        
        return {...state, isLoading: false, errMess: null, login: 
            [
              {email: action.email, password: action.password, stateLogin: action.stateLogin} 
            ]
          };
          
          
    default:
      return state;
  }
};