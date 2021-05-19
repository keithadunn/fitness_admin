import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';

export default {
    name: 'RoutineModule',
    components: {
        adminLayout
    },
    data() {
        return {
            routines: [],
        };
    },
    async created() {
        try {
            this.routines = await AuthService.getRoutines();
        } catch(error) {
            console.log("error", error);
        }
    }
};