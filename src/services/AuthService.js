import axios from 'axios';

const url = process.env.VUE_APP_ROOT_API;

export default {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'register/', credentials)
      .then(response => response.data);
  },
  logout() {
    return axios.post(url + 'logout');
  },
  userInfo() {
    return axios.get(url + 'user-profile/').then(response => response.data);
  },
  userStats() {
    return axios.get(url + 'user-stats/').then(response => response.data);
  },
  getCalories() {
    return axios.get(url + 'calories/').then(response => response.data);
  },
  getRoutines() {
    return axios.get(url + 'routines/').then(response => response.data);
  },
  getSets(id) {
    return axios.get(url + 'sets/' + id).then(response=> response.data);
  },
  getWeight() {
    return axios.get(url + 'weight/').then(response=> response.data);
  },
  getWorkouts() {
    return axios.get(url + 'workouts/').then(response => response.data);
  },
  postCalories(data) {
    return axios.post(url + 'store-calories/', data).then(response => response.data);
  },
  postWeight(data) {
    return axios.post(url + 'weight/create', data).then(response => response.data);
  },
  postWorkout(data) {
    return axios.post(url + 'store-workout/', data).then(response => response.data);
  },
  putUserAccount(data) {
    return axios.put(url + 'user-profile/update/', data).then(response => response.data);
  },
};