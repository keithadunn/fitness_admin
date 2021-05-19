
export default {
    name: 'headerComponent',
    data() {
      return {
          active: true
      };
    },
    computed: {
      name() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
}
