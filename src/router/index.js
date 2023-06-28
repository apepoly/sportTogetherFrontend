import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@/components/welcome/LoginPage.vue')
                }, {
                    path: '/register',
                    component: () => import('@/components/welcome/RegisterPage.vue')
                }, {
                    path: '/forget',
                    component: () => import('@/components/welcome/ForgetPage.vue')
                }
            ]
        },
        {
            path: '/manage',
            component: () => import('@/views/ManageView.vue'),
            children: [
                {
                    path: '/userList',
                    component: () => import('@/components/manage/userListPage.vue')
                }
            ]
        }
    ]
})

export default router