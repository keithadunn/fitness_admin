import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';
import axios from 'axios';

export default {
    name: 'StrengthTrainingCreateModule',
    components: {
        adminLayout
    },
    data: () => ({
        message: '',
        workout_length: '',
        workout_date: '',
        exercises: [],
        set_infos: [
        {
            exercise_id: '',
            sets: [{
            reps: '',
            weight_lifted: ''
            }]
        }
        ]
    }),
    async created() {
        if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
        }
    },
    async mounted() {
        axios.get('http://fitness.test/api/auth/exercises')
        .then(function (response) {
            this.exercises = response.data;
        }.bind(this));
    },
    methods: {
        addExercise () {
        this.set_infos.push({
            exercise_id: '',
            sets: [{
            reps: '',
            weight_lifted: ''
            }]
        })
        },
        addSets (id) {
            this.set_infos[id].sets.push({
                reps: '',
                weight_lifted: ''
            })
        },
        removeExercise (set_info) {
            let index = this.set_infos.indexOf(set_info)
            this.set_infos.splice(index, 1);
        },
        removeSet(set_info, set){
            let index = set_info.sets.indexOf(set)
            set_info.sets.splice(index, 1);
        },
        async postWorkout() {
        try {
            const data = {
                workout_date: this.workout_date,
                workout_length: this.workout_length,
                set_info: this.set_infos
            };
            const response = await AuthService.postWorkout(data);
            this.message = response.message;
            //this.$router.push('/workouts');
        } catch (error) {
            this.message = error.response.data.message;
        }
        }
    }
};
