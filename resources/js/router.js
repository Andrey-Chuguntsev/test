import Vue from 'vue';
import VueRouter from 'vue-router';

import CatsTable  from './components/CatsTable';
import PostsTable from './components/PostsTable';
import PostEdit   from './components/PostEdit';
import IndexPage  from './components/IndexPage';
import PostPage   from './components/PostPage';

Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexPage
        },
        {
            path: '/manager',
            name: 'manager',
            component: PostsTable
        },
        {
            path: '/manager/categories',
            name: 'categories',
            component: CatsTable
        },
        {
            path: '/manager/post',
            name: 'post-create',
            component: PostEdit
        },
        {
            path: '/manager/post/:id',
            name: 'post-update',
            component: PostEdit
        },
        {
            path: '/post/:id',
            name: 'post-page',
            component: PostPage
        }
    ]
});

export default router;
