import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js';

export default {
    name: 'WorkoutModule',
    components: {
        adminLayout
    },
    data() {
        return {
            workouts: [],
        };
    },
    methods: {
        combineWorkoutType(array) {
            return array.filter((v,i,a)=>a.findIndex(t=>(t.exercises.muscle_group === v.exercises.muscle_group && t.exercises.exercise_id === v.exercises.exercise_id))===i)

       },
    },
    async created() {
        try {
            this.workouts = await AuthService.getWorkouts();
        } catch(error) {
            console.log("error", error);
        }
    }
};