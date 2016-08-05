/**
 * Created by nikolaev on 04.08.16.
 */
import { createStore } from 'redux'
import rootReducer from '../reducers/mainReduser'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers/mainReduser', () => {
            const nextRootReducer = require('../reducers/mainReduser');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}