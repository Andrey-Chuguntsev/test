import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import axios from 'axios';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const init = store => {
    let userId = document.head.querySelector('meta[name="user-id"]');
    if (userId) {
        store.dispatch('LOAD_DATA_MANAGER');
    } else {
        store.dispatch('LOAD_DATA');
    }
  // вызывается после инициализации хранилища
  // store.subscribe((mutation, state) => {
  //   // вызывается после каждой мутации
  //   // мутация передаётся в формате `{ type, payload }`.
  // });
};

var store = new Vuex.Store({
    state: {
        cats:        [],
        categoryId:  null,
        loaded:      null,
        loading:     false,
        catsLoading: false,
        posts:       []
    },
    getters: {
        getCats(state) {
            return state.cats;
        },
        getCatsLoadind(state) {
            return state.catsLoading;
        },
        getLoaded(state) {
            return state.loaded;
        },
        getPosts(state) {
            return state.posts.sort(compareFunc);
        },
        getFilteredPosts (state) {
            let catId = state.categoryId;
            return state.posts.filter(p => {
                return !catId || p.category_id == catId;
            }).sort(compareFunc);
        }
    },
    actions: {
        CREATE_CATEGORY({commit}, cat) {
            return new Promise((resolve, reject) => {
                window.axios.post('/api/category', cat).then(({data}) => {
                    commit('addCategory', data.data);
                    resolve(data.data);
                }).catch(error => {
                    if (error.response && error.response.status == 422) {
                        reject(error.response.data.errors);
                    } else {
                        console.error(error);
                    }
                })
            });
        },
        CREATE_POST({commit}, post) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/post`, post).then(({data}) => {
                    commit('addPost', data.data);
                    resolve(data.data);
                }).catch(error => {
                    if (error.response && error.response.status == 422) {
                        reject(error.response.data.errors);
                    } else {
                        console.error(error);
                    }
                })
            });
        },
        DELETE_CATEGORY({commit}, catId) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/category/${catId}`).then(() => {
                    commit('deleteCat', catId);
                    resolve(catId);
                });
            });
        },
        DELETE_POST({commit}, postId) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/post/${postId}`).then(() => {
                    commit('deletePost', postId);
                    resolve(postId);
                });
            });
        },
        LOAD_DATA({commit}) {
            let prom = new Promise(function(resolve, reject) {
                axios.get('/api/init-data').then(({data}) => {
                    commit('setCategories', data.categories);
                    commit('setPosts', data.posts);
                    resolve();
                });
            });
            commit('setLoaded', prom);
            return prom;
        },
        LOAD_DATA_MANAGER({commit}) {
            let prom = new Promise(function(resolve, reject) {
                axios.get('/api/init-data-manager').then(({data}) => {
                    commit('setCategories', data.categories);
                    commit('setPosts', data.posts);
                    resolve();
                });
            });
            commit('setLoaded', prom);
            return prom;
        },
        UPDATE_CATEGORY({commit}, cat) {
            return new Promise((resolve, reject) => {
                window.axios.put(`/api/category/${cat.id}`, cat).then(({data}) => {
                    commit('updateCategory', data.data);
                    resolve(data.data);
                }).catch(error => {
                    if (error.response && error.response.status == 422) {
                        reject(error.response.data.errors);
                    } else {
                        console.error(error);
                    }
                })
            });
        },
        UPDATE_POST({commit}, post) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/post/${post.id}`, post).then(({data}) => {
                    commit('updatePost', data.data);
                    resolve(data.data);
                }).catch(error => {
                    if (error.response && error.response.status == 422) {
                        reject(error.response.data.errors);
                    } else {
                        console.error(error);
                    }
                })
            });
        },
    },
    mutations: {
        addCategory(state, payload) {
            state.cats.push(payload);
        },
        addPost(state, payload) {
            state.posts.push(payload);
        },
        deleteCat(state, catId) {
            var index = state.cats.findIndex(i => i.id == catId);
            if (index != -1) {
                state.cats.splice(index, 1);
            }
        },
        deletePost(state, postId) {
            var index = state.posts.findIndex(i => i.id == postId);
            if (index != -1) {
                state.posts.splice(index, 1);
            }
        },
        setCategories(state, payload) {
            state.cats = payload;
        },
        setCategoryId(state, payload) {
            state.categoryId = payload;
        },
        setLoaded(state, payload) {
            state.loaded = payload
        },
        setPosts(state, payload) {
            state.posts = payload;
        },
        updateCategory(state, payload) {
            var index = state.cats.findIndex(c => c.id == payload.id);
            if (index != -1){
                state.cats.splice(index, 1, payload);
            }
        },
        updatePost(state, payload) {
            var index = state.posts.findIndex(c => c.id == payload.id);
            if (index != -1) {
                state.posts.splice(index, 1, payload);
            }
        }
    },
    plugins: [init]
});

export default store;

function compareFunc(a, b) {
    return b.created_at - a.created_at;
}
