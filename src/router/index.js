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
        }
    ]
})

export default router