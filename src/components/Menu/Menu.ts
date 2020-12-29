import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import swal from 'sweetalert2';

class MenuItem {
    constructor(
        public title: string,
        public icon: string,
        public path: string,
    ) { }
}

// tslint:disable-next-line: max-classes-per-file
@Component

export default class MenuComponent extends Vue {
    public menuItems: MenuItem[] = [
        new MenuItem ('Inicio', 'home', '/Principal'),
    ];

    public menuParametros: MenuItem[] = [
        new MenuItem ('Parametros', 'exit_to_app', ''),
    ];
    public menuListaParametros: MenuItem[] = [
        new MenuItem('Almacenes', 'exit_to_app', '/Almacenes'), 
        new MenuItem('AperturayCierreGestion', 'exit_to_app', '/AperturayCierreGestion'), 
        new MenuItem('Bancos', 'exit_to_app', '/Bancos'), 
        new MenuItem('Cajas', 'exit_to_app', '/Cajas'), 
        new MenuItem('Ciudades', 'exit_to_app', '/Ciudades'), 
        new MenuItem('ClaseItems', 'exit_to_app', '/ClaseItems'), 
        new MenuItem('Clientes', 'exit_to_app', '/Clientes'), 
        new MenuItem('Cuentas', 'exit_to_app', '/Cuentas'), 
        new MenuItem('CuentasBancos', 'exit_to_app', '/CuentasBancos'),
        new MenuItem('CtasPresup', 'exit_to_app', '/CtasPresup'), 
        new MenuItem('Items', 'exit_to_app', '/Items'), 
        new MenuItem('Lineas', 'exit_to_app', '/Lineas'), 
        new MenuItem('Monedas', 'exit_to_app', '/Monedas'), 
        new MenuItem('Pais', 'exit_to_app', '/Pais'), 
        new MenuItem('Proveedores', 'exit_to_app', '/Proveedores'), 
        new MenuItem('Sucursales', 'exit_to_app', '/Sucursales'), 
        new MenuItem('TipodePagos', 'exit_to_app', '/TipodePagos'), 
        new MenuItem('UnidadDeManejo', 'exit_to_app', '/UnidadDeManejo'), 
    ];

    public menuSalir: MenuItem[] = [
        new MenuItem ('Salir', 'exit_to_app', ''),
    ];

    public Logout() {
        swal.fire({
            title: 'Aplicacion',
            text: 'Esta seguro de salir del Sistema?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar!',
        }).then((result) => {
            if (result.value) {
                this.$store.commit('logout');
                localStorage.setItem('auth', this.$store.state.auth);
                this.$router.push({ path: '/' });
            }
        });
    }
}
