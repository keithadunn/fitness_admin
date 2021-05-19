export default {
    name: 'AppModule',
    mounted() {
        let popper = document.createElement('script');
        let bootstrap = document.createElement('script');
        bootstrap.setAttribute('src', 'https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.min.js');
        popper.setAttribute('src', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js');

        document.head.appendChild(popper);
        document.head.appendChild(bootstrap);
    }
}