import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';
import { required, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'


export default {
    name: 'SignupModule',
    components: {
        adminLayout
    },
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            msg: '',
            submitted: false
        };
    },
    validations: {
        first_name: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(26)
        },
        last_name: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(26)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        password_confirmation: {
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        async signUp() {
            try {
                this.submitted = true;
                this.$v.$touch();
                if(this.$v.$invalid) {
                  return;
                }
                
                const credentials = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                };
                const response = await AuthService.signUp(credentials);
                this.msg = response.msg;
                this.$router.push('/login')
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
};