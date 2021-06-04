// Import
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Import Modules
const error404Module = () => import('@/modules/Error404Module')
const dashboardModule = () => import('@/modules/DashboardModule')
const loginModule = () => import('@/modules/LoginModule')
const routineModule = () => import('@/modules/RoutineModule')
const setModule = () => import('@/modules/SetModule')
const signupModule = () => import('@/modules/SignupModule')
const strengthTrainingCreateModule = () => import('@/modules/StrengthTrainingCreateModule')
const strengthTrainingIndexModule = () => import('@/modules/StrengthTrainingIndexModule')
const tdeeModule = () => import('@/modules/TdeeModule')
const userAccountModule = () => import('@/modules/UserAccountModule')
const workoutSelectModule = () => import('@/modules/WorkoutSelectModule')
const workoutIndexModule = () => import('@/modules/WorkoutIndexModule')

// Vue Router
Vue.use(VueRouter)

// Start vue router
const router = new VueRouter({
    mode: 'history',
    routes: [
        // Default route
        {
            path: '/',
            redirect: '/dashboard'
        },

        // Errors
        {
            path: '*',
            component: error404Module,
            name: 'error-404'
        },

        // Login
        {
            path: '/login',
            component: loginModule,
            name: 'login',
            beforeEnter: (to, from, next) => { 
                if (store.getters.isLoggedIn) {
                    next('/dashboard');
                }
                next();
            },
            meta: {
                requiresAuth: false
            }
        },

        // Dashboard
        {
            path: '/dashboard',
            component: dashboardModule,
            name: 'dashboard',
            meta: {
                requiresAuth: true
            }
        }, 

        // Routines
        {
            path: '/routines',
            component: routineModule,
            name: 'routines',
            meta: {
                requiresAuth: true
            }
        }, 

        // Set
        {
            path: '/workouts/:id(\\d+)',
            component: setModule,
            name: 'set',
            meta: {
                requiresAuth: true
            }
        },

        // Signup
        {
            path: '/signup',
            component: signupModule,
            name: 'signup',
            beforeEnter: (to, from, next) => { 
                if (store.getters.isLoggedIn) {
                    next('/dashboard');
                }
                next();
            },
            meta: {
                requiresAuth: false
            }
        },

        // Strength Training Create
        {
            path: '/strengthtraining/create',
            component: strengthTrainingCreateModule,
            name: 'strengthtrainingcreate',
            meta: {
                requiresAuth: true
            }
        },

        // Strength Training Index
        {
            path: '/strengthtraining',
            component: strengthTrainingIndexModule,
            name: 'strengthtrainingindex',
            meta: {
                requiresAuth: true
            }
        },

        // Tdee
        {
            path: '/tdee',
            component: tdeeModule,
            name: 'tdee',
            meta: {
                requiresAuth: true
            }
        },

        // User Account
        {
            path: '/user-account',
            component: userAccountModule,
            name: 'user-account',
            meta: {
                requiresAuth: true
            }
        },

        // Workouts
        {
            path: '/workouts',
            component: workoutSelectModule,
            name: 'workouts',
            meta: {
                requiresAuth: true
            }
        },

        // Workouts
        {
            path: '/workouts/select',
            component: workoutIndexModule,
            name: 'workoutsselect',
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

// Export
export default router