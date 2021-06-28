import { useMemo } from "react";
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./reduces/index";
// let store: any;
// const initialState = {};

// function initStore(preloadedState = initialState) {
//     return createStore(
//         reducer,
//         preloadedState,
//         composeWithDevTools(applyMiddleware())
//     );
// }

// export const initializeStore = (preloadedState: any) => {
//     let _store = store ?? initStore(preloadedState);
//     if (preloadedState && store) {
//         _store = initStore({
//             ...store.getState(),
//             ...preloadedState,
//         });
//         store = undefined;
//     }
//     if (typeof window === "undefined") return _store;
//     if (!store) store = _store;
//     return _store;
// };

// export function useStore(initialState: any) {
//     const store = useMemo(() => initializeStore(initialState), [initialState]);
//     return store;
// }
