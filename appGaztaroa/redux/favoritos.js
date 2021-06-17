import * as ActionTypes from './ActionTypes';
const initialState=[];
export const favoritos = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);

         case ActionTypes.BORRAR_FAVORITO:
            return state.filter(favorito => favorito !== action.payload) 

        default:
          return state;
      }
};
