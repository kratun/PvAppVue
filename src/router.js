import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/components/Home.vue');
const SignIn = () => import('@/components/auth/SignIn.vue');
const SignUp = ()=> import ('@/components/auth/SignUp.vue');
const ProjectList = ()=> import ('@/components/projects/ProjectList.vue');
const ProjectCreate = ()=> import ('@/components/projects/ProjectCreate.vue');
const ProjectEdit = ()=> import ('@/components/projects/ProjectEdit.vue');
const ProjectDetail = ()=> import ('@/components/projects/ProjectDetail.vue');
const GridList = ()=> import ('@/components/grids/GridList.vue');
const NotFound = ()=> import ('@/components/shared/NotFound.vue');
// import ProjectList from '@/components/projects/ProjectList.vue'
// import ProjectCreate from '@/components/projects/ProjectCreate.vue'
// import ProjectEdit from '@/components/projects/ProjectEdit.vue'
// import ProjectDetail from '@/components/projects/ProjectDetail.vue'
// import GridList from '@/components/grids/GridList.vue'
// import NotFound from '@/components/shared/NotFound.vue'
import {authGuard, notAuthGuard, adminGuard} from './guards/routerGuards'
// import Test from '@/components/projects/Test.vue'


Vue.use(VueRouter);

// function authGuard(to, from, next) {
//     if (localStorage.getItem('token') !== null) {
//         next('/');
//     } else {
//         next();
//     }
// }

// function notAuthGuard(to, from, next) {
//     if (localStorage.getItem('token') !== null) {
//         next();
//     } else {
//         next('/');
//     }
// }

const routes = [
    { path: '/', component: Home },
    { path: '/sign-in', component: SignIn, beforeEnter: authGuard },
    { path: '/sign-up', component: SignUp, beforeEnter: authGuard },
    { path: '/projects/create', component: ProjectCreate, beforeEnter: adminGuard },
    { path: '/projects/edit/:id', component: ProjectEdit, beforeEnter: adminGuard },
    { path: '/projects/detail/:id', component: ProjectDetail},
    { path: '/projects', component: ProjectList, beforeEnter: notAuthGuard, children:[
        // { path: '/all', component: ProjectList, beforeEnter: notAuthGuard },
        // { path: '/create', component: ProjectCreate, beforeEnter: notAuthGuard },
        // { path: '/edit/:id', component: ProjectEdit, beforeEnter: notAuthGuard },
        
    ] },
    { path: '/grids', component: GridList, beforeEnter: notAuthGuard },
    // { path: '/test', component: Test, beforeEnter: notAuthGuard },
    { path: '*', component: NotFound }
];

export default new VueRouter({
    mode: 'history',
    routes
});