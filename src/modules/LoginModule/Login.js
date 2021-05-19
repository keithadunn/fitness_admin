import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';
import { required, email } from 'vuelidate/lib/validators'


export default {
  name: 'LoginModule',
  components: {
    adminLayout
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      submitted: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
    }
  },
  methods: {
    async login() {
      try {

        this.submitted = true;
        this.$v.$touch();
        if(this.$v.$invalid) {
          return;
        }

        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.error = response.error;

        const access_token = response.access_token;
        const user = response.user;

        this.$store.dispatch('login', { access_token, user });

        this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};