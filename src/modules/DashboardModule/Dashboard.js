import adminLayout from '@/layouts/AdminLayout'
import AuthService from '@/services/AuthService.js'
import LineChart from '@/components/Charts/LineChart.vue'
import axios from 'axios';

export default {
  name: 'DashboardModule',
  components: {
    adminLayout,
    LineChart
  },
  data() {
    return {
      workout_stats: '',
      loaded: false,
      chartdata: null,
      options: null
    };
  },
  async created() {
    this.workout_stats = await AuthService.userStats();
    console.log(this.workout_stats)
  },
  async mounted () {
    this.loaded = false
    try {
      const { data } = await axios.get('http://fitness.test/api/auth/chart-weight');
      this.chartdata = {
        labels: data.dates,
        datasets: [{
          fill: false,
          borderColor: '#c20000',
          data: data.weights
        }]
      }
      this.options = {
        scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
        },
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false
    }
    this.loaded = true

    } catch (e) {
      console.error(e)
    }
  }
}
