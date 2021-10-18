import {createStore} from "vuex";
import {refreshUser} from "../../services/userService";

export const store = createStore({
    state: {
        user: null
    },
    mutations: {
        refreshUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        isAuth(state) {
            return !!state.user
        }
    },
    actions: {
        async refreshUser(state, token) {
            state.commit("refreshUser", await refreshUser(token))
        }
    }
});
