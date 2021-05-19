import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';

export default {
    name: 'SetModule',
    components: {
        adminLayout
    },
    data() {
        return {
            sets: []
        };
    },
    async created() {
        this.sets = await AuthService.getSets(this.$route.params.id);
    }
};