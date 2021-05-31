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
        new MenuItem ('OTROS', 'exit_to_app', ''),
    ];

    public menuListaParametros: MenuItem[] = [
        new MenuItem('Apertura & Cierre Gestion', 'exit_to_app', '/AperturayCierreGestion'), 
        new MenuItem('Cajas', 'exit_to_app', '/Cajas'), 
        new MenuItem('Ctas Presup', 'exit_to_app', '/CtasPresup'), 
        new MenuItem('Sucursales', 'exit_to_app', '/Sucursales'), 
        new MenuItem('Tipo de Pagos', 'exit_to_app', '/TipodePagos'), 
        new MenuItem('Unidad DeManejo', 'exit_to_app', '/UnidadDeManejo'), 
        new MenuItem('Tipo Movimiento Inventario', 'exit_to_app', '/TipoMovimientoInventario'), 
    ];
/////////////////////////////////////compras
    public menuCompras: MenuItem[] = [
        new MenuItem ('Compras', 'exit_to_app', ''),
    ];
    public menuAdministracionCompras: MenuItem[] = [
        new MenuItem ('Administracion', 'exit_to_app', ''),
        //new MenuItem ('Prueba', 'exit_to_app', ''),

    ];
    public menuTransaccionCompras: MenuItem[] = [
        new MenuItem ('Transacciones', 'exit_to_app', ''),
    ];
    public menuReportesCompras: MenuItem[] = [
        new MenuItem ('Reportes', 'exit_to_app', ''),
    ];
    public menuListaCompras: MenuItem[] = [
        new MenuItem('Items', 'exit_to_app', '/Items'), 
        new MenuItem('Clase Items', 'exit_to_app', '/ClaseItems'), 
        new MenuItem('Lineas', 'exit_to_app', '/Lineas'),
        new MenuItem('Tipos Items', 'exit_to_app', '/TiposItems'), 
        new MenuItem('Tipos Proveedores', 'exit_to_app', '/TiposProveedor'),  
        new MenuItem('Proveedores', 'exit_to_app', '/Proveedores'), 
    ];
///////////////////////////////////planillas
    public menuPlanillas: MenuItem[] = [
        new MenuItem ('RRHH', 'exit_to_app', ''),
    ];
    public menuAdministracionPlanillas: MenuItem[] = [
        new MenuItem ('Administracion', 'exit_to_app', ''),
    ];
    public menuTransaccionPlanillas: MenuItem[] = [
        new MenuItem ('Transacciones', 'exit_to_app', ''),
    ];
    public menuReportesPlanillas: MenuItem[] = [
        new MenuItem ('Reportes', 'exit_to_app', ''),
    ];
    public menuListaPlanillas: MenuItem[] = [
        new MenuItem('Empleado', 'exit_to_app', '/empleado'),
        new MenuItem('Empleado departamento', 'exit_to_app', '/empleado_depto'),
        new MenuItem('Descuentos', 'exit_to_app', '/descuentos'),
        new MenuItem('Haberes', 'exit_to_app', '/haberes'),
        new MenuItem('Credito Fiscal', 'exit_to_app', '/CreditoFiscal'),
        new MenuItem('Firmas', 'exit_to_app', '/Firmas'),
        new MenuItem('departamentos', 'exit_to_app', '/Personal_departamentos'),
        new MenuItem('Tipo empleado', 'exit_to_app', '/tipo_empleado'),



        // new MenuItem('Parametros', 'exit_to_app', '/parametros'),
        // new MenuItem('Planilla', 'exit_to_app', '/planilla'),
        // new MenuItem('Jerarquia', 'exit_to_app', '/jerarquia'),
        // //new MenuItem('Planilla especial', 'exit_to_app', '/planilla_esp'),
        // new MenuItem('Tipo descuento', 'exit_to_app', '/tipo_descuento'),
        // new MenuItem('Tipo haber', 'exit_to_app', '/tipo_haber'),
        //new MenuItem('Planilla descuentos', 'exit_to_app', '/planilla_descuentos'),
       // new MenuItem('Planilla haberes', 'exit_to_app', '/planilla_haberes'),
       // new MenuItem('Reporte Credito Fiscal', 'exit_to_app', '/ReporteCreditoFiscal'),
    ];

    /////////////////////////////////////////Inventarios
    public menuInventarios: MenuItem[] = [
        new MenuItem ('Inventarios', 'exit_to_app', ''),
    ];
    public menuAdministracionInventarios: MenuItem[] = [
        new MenuItem ('Administracion', 'exit_to_app', ''),
    ];
    public menuTransaccionInventarios: MenuItem[] = [
        new MenuItem ('Transacciones', 'exit_to_app', ''),
    ];
    public menuReportesInventarios: MenuItem[] = [
        new MenuItem ('Reportes', 'exit_to_app', ''),
    ];
    public menuListaInventarios: MenuItem[] = [
        new MenuItem('Items', 'exit_to_app', '/Items'),
        new MenuItem('Clase Items', 'exit_to_app', '/ClaseItems'),  
        new MenuItem('Almacenes', 'exit_to_app', '/Almacenes'), 
    ];
    /////////////////////////////////////////ctas por cobrar
    public menuCtasXCobrar: MenuItem[] = [
        new MenuItem ('Cuentas por Cobrar', 'exit_to_app', ''),
    ];
    public menuAdministracionCtasXCobrar: MenuItem[] = [
        new MenuItem ('Administracion', 'exit_to_app', ''),
    ];
    public menuTransaccionCtasXCobrar: MenuItem[] = [
        new MenuItem ('Transacciones', 'exit_to_app', ''),
    ];
    public menuReportesCtasXCobrar: MenuItem[] = [
        new MenuItem ('Reportes', 'exit_to_app', ''),
    ];
    public menuListaCuetasPorCobrar: MenuItem[] = [
        new MenuItem('Clientes', 'exit_to_app', '/Clientes'), 

    ];
    public menuParametrosCuetasPorCobrar: MenuItem[] = [
        new MenuItem ('Parametros Ctas por cobrar', 'exit_to_app', ''),
    ];
    public menuListaParametrosCuetasPorCobrar: MenuItem[] = [
        new MenuItem('Tipo Documentos Identidad', 'exit_to_app', '/TipoDocumentosIdentidad'), 
        new MenuItem('Tipos Clientes', 'exit_to_app', '/TiposCliente'), 
    ];

    public menuBancos: MenuItem[] = [
        new MenuItem('Bancos', 'exit_to_app', ''),
    ];

    public menuListaBancos: MenuItem[] = [
        new MenuItem('Bancos', 'exit_to_app', '/Bancos'), 
        new MenuItem('Cuentas', 'exit_to_app', '/Cuentas'), 
        new MenuItem('Cuentas Bancos', 'exit_to_app', '/CuentasBancos'),
    ];
    /////////////////////////Contabilidad
    public menuContabilidad: MenuItem[] = [
        new MenuItem ('Contabilidad', 'exit_to_app', ''),
    ];
    public menuAdministracionContabilidad: MenuItem[] = [
        new MenuItem ('Administracion', 'exit_to_app', ''),
    ];
    public menuTransaccionContabilidad: MenuItem[] = [
        new MenuItem ('Transacciones', 'exit_to_app', ''),
        
    ];
    public menuReportesContabilidad: MenuItem[] = [
        new MenuItem ('Reportes', 'exit_to_app', ''),
    ];
    public menuListaContabilidad: MenuItem[] = [
        new MenuItem('Insertar Tipos Comprobantes', 'exit_to_app', '/InserciontiposComp'), 
        new MenuItem('Tipo Comprobantes', 'exit_to_app', '/TiposComprobantes'), 
        new MenuItem('Correlativos Tipos Comprobantes', 'exit_to_app', '/CorrelativosTiposComprobantes'), 
         
        new MenuItem('AsientosDetalle', 'exit_to_app', '/AsientosDetalle'), 
        new MenuItem('AsientosEncabezado', 'exit_to_app', '/AsientosEncabezado'), 
        new MenuItem('TiposdeCambio', 'exit_to_app', '/TiposdeCambio'),
    ];
    public menuListaTransaccionesContabilidad: MenuItem[] = [
        new MenuItem('Registros Diarios', 'exit_to_app', '/RegistrosDiarios'),
    ];
/////////////////////////////////parametros Generales
public menuParamsGenerales: MenuItem[] = [
    new MenuItem ('Parametros Generales', 'exit_to_app', ''),
];
public menuAdministracionParamsGenerales: MenuItem[] = [
    new MenuItem ('Administracion', 'exit_to_app', ''),
];
public menuTransaccionParamsGenerales: MenuItem[] = [
    new MenuItem ('Transacciones', 'exit_to_app', ''),
];
public menuReportesParamsGenerales: MenuItem[] = [
    new MenuItem ('Reportes', 'exit_to_app', ''),
];
    public menuListaParametrosGenerales: MenuItem[] = [
        new MenuItem('Monedas', 'exit_to_app', '/Monedas'), 
        new MenuItem('Pais', 'exit_to_app', '/Pais'), 
        new MenuItem('Zonas', 'exit_to_app', '/Zonas'),  
        new MenuItem('Ciudades', 'exit_to_app', '/Ciudades'), 
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
