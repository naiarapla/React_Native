import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { login } from './login';

const rootReducer = combineReducers({
    excursiones,
    comentarios,
    cabeceras,
    actividades,
    favoritos,
    login
});

export const ConfigureStore = () => {
const persistConfig = {
    key: 'favoritos',
    storage: AsyncStorage,
    //whitelist: ['favoritos'],
    //blacklist: ['excursiones','comentarios','cabeceras','actividades'],
    blacklist: ['login'],
  };
  
const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk); //logger

let store = createStore(pReducer, middleware);
let persistor = persistStore(store);
     return {store, persistor};
 }

//export { persistor, store };

// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             excursiones,
//             comentarios,
//             cabeceras,
//             actividades,
//             favoritos
//         }),
//         applyMiddleware(thunk) //(thunk, logger)
//     );

//     return store;
// }