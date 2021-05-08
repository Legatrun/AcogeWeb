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
        new MenuItem('Apertura & Cierre Gestion', 'exit_to_app', '/AperturayCierreGestion'), 
        new MenuItem('Bancos', 'exit_to_app', '/Bancos'), 
        new MenuItem('Cajas', 'exit_to_app', '/Cajas'), 
        new MenuItem('Ciudades', 'exit_to_app', '/Ciudades'), 
        new MenuItem('Clase Items', 'exit_to_app', '/ClaseItems'), 
        new MenuItem('Clientes', 'exit_to_app', '/Clientes'), 
        new MenuItem('Cuentas', 'exit_to_app', '/Cuentas'), 
        new MenuItem('Cuentas Bancos', 'exit_to_app', '/CuentasBancos'),
        new MenuItem('Ctas Presup', 'exit_to_app', '/CtasPresup'), 
        new MenuItem('Items', 'exit_to_app', '/Items'), 
        new MenuItem('Lineas', 'exit_to_app', '/Lineas'), 
        new MenuItem('Monedas', 'exit_to_app', '/Monedas'), 
        new MenuItem('Pais', 'exit_to_app', '/Pais'), 
        new MenuItem('Proveedores', 'exit_to_app', '/Proveedores'), 
        new MenuItem('Sucursales', 'exit_to_app', '/Sucursales'), 
        new MenuItem('Tipod ePagos', 'exit_to_app', '/TipodePagos'), 
        new MenuItem('Unidad DeManejo', 'exit_to_app', '/UnidadDeManejo'), 
        new MenuItem('Tipo Documentos Identidad', 'exit_to_app', '/TipoDocumentosIdentidad'), 
        new MenuItem('Tipo Movimiento Inventario', 'exit_to_app', '/TipoMovimientoInventario'), 
        new MenuItem('Tipos Cliente', 'exit_to_app', '/TiposCliente'), 
        new MenuItem('Tipos Items', 'exit_to_app', '/TiposItems'), 
        new MenuItem('Tipo sProveedor', 'exit_to_app', '/TiposProveedor'), 
        new MenuItem('Zonas', 'exit_to_app', '/Zonas'), 
        new MenuItem('Insertar Tipos Comprobantes', 'exit_to_app', '/InserciontiposComp'), 
        new MenuItem('Tipo Comprobantes', 'exit_to_app', '/TiposComprobantes'), 
        new MenuItem('Correlativos Tipos Comprobantes', 'exit_to_app', '/CorrelativosTiposComprobantes'), 
        new MenuItem('Registros Diaios', 'exit_to_app', '/RegistrosDiarios'), 
        new MenuItem('AsientosDetalle', 'exit_to_app', '/AsientosDetalle'), 
        new MenuItem('AsientosEncabezado', 'exit_to_app', '/AsientosEncabezado'), 
        new MenuItem('TiposdeCambio', 'exit_to_app', '/TiposdeCambio'), 
        new MenuItem('Insertar Tipos Comprobantes', 'exit_to_app', '/InserciontiposComp'), 
        new MenuItem('Tipo Comprobantes', 'exit_to_app', '/TiposComprobantes'), 
        new MenuItem('Correlativos Tipos Comprobantes', 'exit_to_app', '/CorrelativosTiposComprobantes'), 
        new MenuItem('Registros Diarios', 'exit_to_app', '/RegistrosDiarios'),

        new MenuItem('Descuentos', 'exit_to_app', '/descuentos'),
        new MenuItem('Empleado', 'exit_to_app', '/empleado'),
        new MenuItem('Haberes', 'exit_to_app', '/haberes'),
        new MenuItem('Parametros', 'exit_to_app', '/parametros'),
        new MenuItem('Planilla', 'exit_to_app', '/planilla'),
        new MenuItem('Firmas', 'exit_to_app', '/Firmas'),

        new MenuItem('CreditoFiscal', 'exit_to_app', '/CreditoFiscal'),
        new MenuItem('Jerarquia', 'exit_to_app', '/jerarquia'),
        new MenuItem('Planilla esp', 'exit_to_app', '/planilla_esp'),
        new MenuItem('Tipo descuento', 'exit_to_app', '/tipo_descuento'),
        new MenuItem('Tipo empleado', 'exit_to_app', '/tipo_empleado'),
        new MenuItem('Tipo haber', 'exit_to_app', '/tipo_haber'),

        new MenuItem('Planilla descuentos', 'exit_to_app', '/planilla_descuentos'),
        new MenuItem('Planilla haberes', 'exit_to_app', '/planilla_haberes'),
        new MenuItem('Reporte Credito Fiscal', 'exit_to_app', '/ReporteCreditoFiscal'),

        new MenuItem('Empleado depto', 'exit_to_app', '/empleado_depto'),
        new MenuItem('Personal departamentos', 'exit_to_app', '/Personal_departamentos'),

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
