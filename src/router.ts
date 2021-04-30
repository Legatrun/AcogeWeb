import Vue from 'vue';
import Router from 'vue-router';
import Inicio from './components/Inicio/Inicio.vue';
import Login from './components/Login/Login.vue';
import Principal from './components/Principal/Principal.vue';
import Almacenes from './components/Operaciones/Almacenes/Almacenes.vue';
import AperturayCierreGestion from './components/Operaciones/AperturayCierreGestion/AperturayCierreGestion.vue';
import Bancos from './components/Operaciones/Bancos/Bancos.vue';
import Cajas from './components/Operaciones/Cajas/Cajas.vue';
import Ciudades from './components/Operaciones/Ciudades/Ciudades.vue';
import ClaseItems from './components/Operaciones/ClaseItems/ClaseItems.vue';
import Clientes from './components/Operaciones/Clientes/Clientes.vue';
import Cuentas from './components/Operaciones/Cuentas/Cuentas.vue';
import CuentasBancos from './components/Operaciones/CuentasBancos/CuentasBancos.vue';
import CtasPresup from './components/Operaciones/CtasPresup/CtasPresup.vue';
import Items from './components/Operaciones/Items/Items.vue';
import Lineas from './components/Operaciones/Lineas/Lineas.vue';
import Monedas from './components/Operaciones/Monedas/Monedas.vue';
import Pais from './components/Operaciones/Pais/Pais.vue';
import Proveedores from './components/Operaciones/Proveedores/Proveedores.vue';
import Sucursales from './components/Operaciones/Sucursales/Sucursales.vue';
import TipodePagos from './components/Operaciones/TipodePagos/TipodePagos.vue';
import UnidadDeManejo from './components/Operaciones/UnidadDeManejo/UnidadDeManejo.vue';
import TipoDocumentosIdentidad from './components/Operaciones/TipoDocumentosIdentidad/TipoDocumentosIdentidad.vue';
import TipoMovimientoInventario from './components/Operaciones/TipoMovimientoInventario/TipoMovimientoInventario.vue';
import TiposCliente from './components/Operaciones/TiposCliente/TiposCliente.vue';
import TiposItems from './components/Operaciones/TiposItems/TiposItems.vue';
import TiposProveedor from './components/Operaciones/TiposProveedor/TiposProveedor.vue';
import Zonas from './components/Operaciones/Zonas/Zonas.vue';
import CorrelativosTiposComprobantes from './components/Operaciones/CorrelativosTiposComprobantes/CorrelativosTiposComprobantes.vue';
import TiposComprobantes from './components/Operaciones/TiposComprobantes/TiposComprobantes.vue';
import InserciontiposComp from './components/Operaciones/InsercionTiposComp/InserciontiposComp.vue';
import RegistrosDiariosComp from './components/Operaciones/RegistrosDiarios/RegistrosDiarios.vue';
import AsientosDetalle from './components/Operaciones/AsientosDetalle/AsientosDetalle.vue';
import AsientosEncabezado from './components/Operaciones/AsientosEncabezado/AsientosEncabezado.vue';
import TiposdeCambio from './components/Operaciones/TiposdeCambio/TiposdeCambio.vue';

import descuentos from './components/Operaciones/descuentos/descuentos.vue';
import empleado from './components/Operaciones/empleado/empleado.vue';
import haberes from './components/Operaciones/haberes/haberes.vue';
import parametros from './components/Operaciones/parametros/parametros.vue';
import planilla from './components/Operaciones/planilla/planilla.vue';
import Firmas from './components/Operaciones/Firmas/Firmas.vue';

import CreditoFiscal from './components/Operaciones/CreditoFiscal/CreditoFiscal.vue';
import jerarquia from './components/Operaciones/jerarquia/jerarquia.vue';
import planilla_esp from './components/Operaciones/planilla_esp/planilla_esp.vue';
import tipo_descuento from './components/Operaciones/tipo_descuento/tipo_descuento.vue';
import tipo_empleado from './components/Operaciones/tipo_empleado/tipo_empleado.vue';
import tipo_haber from './components/Operaciones/tipo_haber/tipo_haber.vue';


Vue.use(Router);

export default new Router({
	routes: [
		{ path: '/', name: 'Inicio', component: Inicio },
		{ path: '/Login', name: 'Login', component: Login },
		{ path: '/Principal', name: 'Principal', component: Principal  },
		{ path: '/Almacenes', name: 'Almacenes', component: Almacenes },
		{ path: '/AperturayCierreGestion', name: 'AperturayCierreGestion', component: AperturayCierreGestion },
		{ path: '/Bancos', name: 'Bancos', component: Bancos },
		{ path: '/Cajas', name: 'Cajas', component: Cajas },
		{ path: '/Ciudades', name: 'Ciudades', component: Ciudades },
		{ path: '/ClaseItems', name: 'ClaseItems', component: ClaseItems },
		{ path: '/Clientes', name: 'Clientes', component: Clientes },
		{ path: '/Cuentas', name: 'Cuentas', component: Cuentas },
		{ path: '/CuentasBancos', name: 'CuentasBancos', component: CuentasBancos },
		{ path: '/CtasPresup', name: 'CtasPresup', component: CtasPresup },
		{ path: '/Items', name: 'Items', component: Items },
		{ path: '/Lineas', name: 'Lineas', component: Lineas },
		{ path: '/Monedas', name: 'Monedas', component: Monedas },
		{ path: '/Pais', name: 'Pais', component: Pais },
		{ path: '/Proveedores', name: 'Proveedores', component: Proveedores },
		{ path: '/Sucursales', name: 'Sucursales', component: Sucursales },
		{ path: '/TipodePagos', name: 'TipodePagos', component: TipodePagos },
		{ path: '/UnidadDeManejo', name: 'UnidadDeManejo', component: UnidadDeManejo },
		{ path: '/TipoDocumentosIdentidad', name: 'TipoDocumentosIdentidad', component: TipoDocumentosIdentidad },
		{ path: '/TipoMovimientoInventario', name: 'TipoMovimientoInventario', component: TipoMovimientoInventario },
		{ path: '/TiposCliente', name: 'TiposCliente', component: TiposCliente },
		{ path: '/TiposItems', name: 'TiposItems', component: TiposItems },
		{ path: '/TiposProveedor', name: 'TiposProveedor', component: TiposProveedor },
		{ path: '/Zonas', name: 'Zonas', component: Zonas },
		{ path: '/TiposComprobantes', name: 'TiposComprobantes', component: TiposComprobantes },
		{ path: '/CorrelativosTiposComprobantes', name: 'CorrelativosTiposComprobantes', component: CorrelativosTiposComprobantes },
		{ path: '/TiposComprobantes', name: 'TiposComprobantes', component: TiposComprobantes },
		{ path: '/InserciontiposComp', name: 'InserciontiposComp', component: InserciontiposComp },
		{ path: '/RegistrosDiarios', name: 'RegistrosDiariosComp', component: RegistrosDiariosComp },
		{ path: '/Principal', name: 'Principal', component: Principal  },
		{ path: '/AsientosDetalle', name: 'AsientosDetalle', component: AsientosDetalle },
		{ path: '/AsientosEncabezado', name: 'AsientosEncabezado', component: AsientosEncabezado },
		{ path: '/TiposdeCambio', name: 'TiposdeCambio', component: TiposdeCambio },


		{ path: '/descuentos', name: 'descuentos', component: descuentos },
		{ path: '/empleado', name: 'empleado', component: empleado },
		{ path: '/haberes', name: 'haberes', component: haberes },
		{ path: '/parametros', name: 'parametros', component: parametros },
		{ path: '/planilla', name: 'planilla', component: planilla },
		{ path: '/Firmas', name: 'Firmas', component: Firmas },

		{ path: '/CreditoFiscal', name: 'CreditoFiscal', component: CreditoFiscal },
		{ path: '/jerarquia', name: 'jerarquia', component: jerarquia },
		{ path: '/planilla_esp', name: 'planilla_esp', component: planilla_esp },
		{ path: '/tipo_descuento', name: 'tipo_descuento', component: tipo_descuento },
		{ path: '/tipo_empleado', name: 'tipo_empleado', component: tipo_empleado },
		{ path: '/tipo_haber', name: 'tipo_haber', component: tipo_haber },

	],
});

