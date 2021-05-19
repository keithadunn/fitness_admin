import adminLayout from '@/layouts/AdminLayout'
import { required, numeric, maxValue } from 'vuelidate/lib/validators'

export default {
    name: 'TdeeModule',
    components: {
        adminLayout
    },
    data() {
        return {
            gender: 'male',
            age: '',
            weight: '',
            feet: '',
            inches: '',
            activity: '1.55',
            tdee: '',
            bmr: '',
            visible: false,
            submitted: false
        }
    },
    validations: {
        age: {
            required,
            numeric
        },
        weight: {
            required,
            numeric
        },
        feet: {
            required,
            numeric
        },
        inches: {
            required,
            numeric,
            maxValue: maxValue(11)
        }
    },
    methods: {
        reset () {
            this.submitted = false;
            Object.assign(this.$data, this.$options.data.call(this));
        },
        calculateTdee: function() {
            this.submitted = true;
            this.$v.$touch();
            if(this.$v.$invalid) {
              return;
            }
            
            window.scrollTo(0,0);
            this.visible = true;
            var inchesToCm = this.feet * 30.48 + this.inches * 2.54; 
            var lbsToKg = this.weight * 0.45359237;
            var maleBmr = 10 * lbsToKg + 6.25 * inchesToCm - 5 * this.age + 5;
            var femaleBmr = 10 * lbsToKg + 6.25 * inchesToCm - 5 * this.age - 161;

            if(this.gender == "male") {
                return this.tdee = Math.round(maleBmr * this.activity), 
                this.bmr = Math.round(maleBmr);
            }
            else {
                return this.tdee = Math.round(femaleBmr * this.activity),
                this.bmr = Math.round(femaleBmr);
            }
            
        }
    }
}
