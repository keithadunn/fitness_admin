import AuthService from '@/services/AuthService.js';

export default {
    name: 'sidePanelComponent',
    methods: {
        logout: function () {
            AuthService.logout();
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
}