import * as ActionTypes from './ActionTypes';


export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  //console.log(JSON.stringify(state.comentarios));
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO:
     let id=state.comentarios.length;
     fetch('https://dsm-react-native-default-rtdb.europe-west1.firebasedatabase.app/comentarios/' + id + '.json', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        id: id, excursionId: action.excursionId, valoracion: action.valoracion, autor: action.autor, comentario: action.comentario,dia: action.dia
      })
    });
     return {...state,errMess: null, comentarios: 
      [...state.comentarios, 
        {id: id, excursionId: action.excursionId, valoracion: action.valoracion, autor: action.autor, comentario: action.comentario,dia: action.dia} 
      ]
    }; 

    default:
      return state;
  }
};