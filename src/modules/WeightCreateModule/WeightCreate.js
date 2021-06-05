import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';
import { required } from 'vuelidate/lib/validators'


export default {
    name: 'WeightCreateModule',
    components: {
        adminLayout
    },
    data() {
        return {
            weight: '',
            date: '',
            error: '',
            message: '',
            submitted: false
        };
    },
    validations: {
        weight: {
            required,
        },
        date: {
            required,
        }
    },
    methods: {
        async createWeightEntry() {
            try {
                this.submitted = true;
                this.$v.$touch();
                if(this.$v.$invalid) {
                  return;
                }
                
                const weightEntry = {
                    weight: this.weight,
                    date: this.date
                };
                const response = await AuthService.postWeight(weightEntry);
                this.message = response.message;

            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};