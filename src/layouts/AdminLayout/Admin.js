import '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/portal.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import sidePanelComponent from '@/components/SidePanelComponent'
import headerComponent from '@/components/HeaderComponent'

export default {
    name: 'AdminLayout',
    components: {
        sidePanelComponent,
        headerComponent
    },
    mounted() {
        this.portalThemeSetup();
    },
    methods: {
        portalThemeSetup() {
            const sidePanelToggler = document.getElementById('sidepanel-toggler');
            const sidePanel = document.getElementById('app-sidepanel');
            const sidePanelDrop = document.getElementById('sidepanel-drop');
            const sidePanelClose = document.getElementById('sidepanel-close');

            let w = window.innerWidth;
            if (w >= 1200) {
                sidePanel.classList.remove('sidepanel-hidden');
                sidePanel.classList.add('sidepanel-visible');
            } else {
                sidePanel.classList.remove('sidepanel-visible');
                sidePanel.classList.add('sidepanel-hidden');
            }

            sidePanelToggler.addEventListener('click', () => {
                if (sidePanel.classList.contains('sidepanel-visible')) {
                    sidePanel.classList.remove('sidepanel-visible');
                    sidePanel.classList.add('sidepanel-hidden');
                } else {
                    sidePanel.classList.remove('sidepanel-hidden');
                    sidePanel.classList.add('sidepanel-visible');
                }
            });
            
            sidePanelClose.addEventListener('click', (e) => {
                e.preventDefault();
                sidePanelToggler.click();
            });
            
            sidePanelDrop.addEventListener('click', () => {
                sidePanelToggler.click();
            });
        }
    }
}