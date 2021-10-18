import {createStore} from "vuex";

export const store = createStore({
    state: {
        user: null
    },
    mutations: {
        refreshUser(state, user) {
            state.user = user;
        }
    }
});
