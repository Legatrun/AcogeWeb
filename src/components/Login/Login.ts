import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import crypto from '@/encrypt';
import * as popup from '@/popup';
import * as services from '@/services';
import $store from '@/store';

@Component
export default class LoginComponent extends Vue {
    // ** Variables */
    public objcrypt: any;
    public cryptedLogin: any;
    public popup = new popup.Swal();
    public login = new services.ClaseAutenticacion();
    public WebApiLoginBd: string = $store.state.server + 'Api/Autenticacion/Login';
	public WebApiLoginAd: string = $store.state.server + 'Api/Autenticacion/LoginAD';
	public WebApiLogout: string = $store.state.server + 'Api/Autenticacion/Logout';
    public WebApiAuth: string = $store.state.server + 'Api/Autenticacion/Login';
    public valPas = true;
    public config = { headers: { 'Content-Type': 'application/json' } };
    public response = false;
    public valid = false;
    public user: any = [];
    public showPassword: boolean = false;
    public dominio: boolean = false;
    public loginResponse: any = [];
    public loading: boolean = false;
    // ** Reglas */
    public requiredRule: any = [];
    // ** Métodos */
    public mounted() {
        if (this.$store.state.auth) {
            this.$router.push({ path: '/usuarios-select' });
        }
        this.requiredRule = [(v: any) => !!v || 'Campo requerido'];
        this.login.usuario = '';
        this.login.password = '';
    }

    public cancelar(): void {
        this.$router.push({ path: '/' });
    }
    public ClearPass() {
        this.login.password = '';
    }

    public ClearUsername() {
        this.login.usuario = '';
    }

    public Aux() {
        (this.$refs.form as Vue & { validate: () => boolean }).validate();
    }

    public reset() {
        (this.$refs.form as Vue & { reset: () => boolean }).reset();
    }
    public ingresar(): void {
        if (this.login.usuario === '' || this.login.password === '') {
            this.popup.error('Campos Incompletos', 'Llene ambos campos por favor');
        } else {
            if(this.loading){
                return
            }
            // this.$store.commit('login', true);
            // this.$router.push({ path: '/Principal' });
            this.objcrypt = new crypto();
            this.cryptedLogin = new services.ClaseAutenticacion();
            this.cryptedLogin.usuario = this.objcrypt.EncryptAES(this.login.usuario.toString());
            this.cryptedLogin.password = this.objcrypt.EncryptAES(this.login.password.toString());
            this.WebApiAuth = this.WebApiLoginBd;
            this.loading = true;
            if (this.dominio) {
                this.WebApiAuth = this.WebApiLoginAd;
            }
            new services.Operaciones().Login(this.WebApiAuth, this.cryptedLogin)
            .then((res) => {
                console.log(res)
                this.loading = false;
                if (res.data._error.error === -1) {
                    this.popup.error('Error en la Autenticación', res.data._error.descripcion);
                    return;
                }
                if (res.data._error.error === -4) {
                    this.popup.error('Error en la Autenticación de dominio', res.data._error.descripcion);
                    return;
                }
                if (res.data._error.error === -3) {
                    this.popup.error('Error en la Autenticación de dominio', res.data._error.descripcion);
                    return;
                }
                if (res.data._error.error === 0) {
                    
                    if (res.data.length !== 0
                        && this.login.usuario.trim() !== '' && this.login.password.trim() !== '') {
                        this.loginResponse = res.data;
                        this.$store.commit('login', true);
                        this.$router.push({ path: '/Principal' });
                    } else {
                        this.popup.error('Error en la Autenticación', 'Datos Incorrectos, Intente de nuevo por favor');
                        this.$store.commit('logout', true);
                    }
                } else {
                    this.popup.error('Error en la Autenticación', res.data.error.descripcion);
                }
            })
            .catch((err) => {
                this.popup.error('Error en la Autenticación', err.response.data);
                this.loading = false;
            });
        }
    }
}
