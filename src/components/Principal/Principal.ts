import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class HomeComponent extends Vue {
    private created(){
        // if (!this.$store.state.authentication) {
        //     this.$router.push({ path: '/login' });
        // }
    }
}
