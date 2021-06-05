import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';
import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'WeightIndexModule',
    components: {
        adminLayout
    },
    data() {
        return {
            email: '',
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
            message: '',
            submitted: false,
        };
    },
    validations: {
        email: {
            email,
            required
        },
        current_password: {
            required,
            minLength: minLength(6)
        },
        new_password: {
            required,
            minLength: minLength(6)
        },
        new_password_confirmation: {
            sameAsPassword: sameAs('new_password')
        }
    },
    methods: {
        async update() {
            try {
                this.submitted = true;
                this.$v.$touch();
                if(this.$v.$invalid) {
                    return;
                }

                const data = {
                    id: this.$store.getters.getUser.id,
                    email: this.email,
                    current_password: this.current_password,
                    new_password: this.new_password
                };
                const response = await AuthService.putUserAccount(data);
                this.message = response.message;
                this.error = response.error;
                
            }
            catch (error) {
                this.error = error.response.data.error;
            }
        }
    },
    computed: {
        user() {
            this.email = this.$store.getters.getUser.email;
            return this.$store.getters.getUser;
        }
    }
};