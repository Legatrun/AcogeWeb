import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '../../../services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';

@Component
export default class AdmCorrelativosTiposComprobantesComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDTipoComprobante', align: 'left', sortable: true, value: 'idtipocomprobante', width: '15%' },
		{ text: 'Año', align: 'left', sortable: true, value: 'anio', width: '15%' },
		{ text: 'Mes', align: 'left', sortable: true, value: 'mes', width: '15%' },
		{ text: 'Correlativo', align: 'left', sortable: false, value: 'correlativo', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints;
	private correlativostiposcomprobantes = new services.clase_correlativostiposcomprobantes();
	private lstcorrelativostiposcomprobantes: services.clase_correlativostiposcomprobantes[] = [];
	private buscarcorrelativostiposcomprobantes = '';
	private dialogCorrelativo = false;
	private sucursales = new services.clase_sucursales();
	private lstsucursales: services.clase_sucursales[] = [];
    private tiposcomprobantes = new services.clase_tiposcomprobantes();
	private lsttiposcomprobantes: services.clase_tiposcomprobantes[] = [];
	private buscartiposcomprobantes = '';
	private operacion = '';
	private popup = new popup.Swal();
    private e1= 1;
	private lstMeses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
	}
	private FormatBoolean(data: any) {
		if (data) {
			return 'SI';
		} else {
			return 'NO';
		}
	}
	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private mounted() {
		this.cargar_dataCorrelativos();
        this.cargar_dataTipoComp();
		this.cargarSucursal();
	}
    private cargar_dataTipoComp() {
        // /*eslint no-shadow: 'error'*/
        // if (this.$store.state.auth !== true) {
        // this.$router.push({ path: '/Login' });
        // }
            new services.Operaciones().Consultar(this.WebApi.ws_tiposcomprobantes_Consultar)
                .then((restiposcomprobantes) => {
                    if (restiposcomprobantes.data._error.error === 0) {
                        this.lsttiposcomprobantes = restiposcomprobantes.data._data;
                        
                    } else {
                        this.popup.error('Consultar', restiposcomprobantes.data._error.descripcion);
                    }
                }).catch((error) => {
                        this.popup.error('Consultar', 'Error Inesperado: ' + error);
                });
        }
	private cargar_dataCorrelativos() {
	// /*eslint no-shadow: 'error'*/
	// if (this.$store.state.auth !== true) {
	// this.$router.push({ path: '/Login' });
	// }
		new services.Operaciones().Consultar(this.WebApi.ws_correlativostiposcomprobantes_Consultar)
			.then((rescorrelativostiposcomprobantes) => {
				if (rescorrelativostiposcomprobantes.data._error.error === 0) {
					this.lstcorrelativostiposcomprobantes = rescorrelativostiposcomprobantes.data._data;
					
				} else {
					this.popup.error('Consultar', rescorrelativostiposcomprobantes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.correlativostiposcomprobantes = new services.clase_correlativostiposcomprobantes();
		this.operacion = 'Insert';
		
	}
	private cargarSucursal(){
		new services.Operaciones().Consultar(this.WebApi.ws_sucursales_Consultar)
			.then((ressucursales) => {
				if (ressucursales.data._error.error === 0) {
					this.lstsucursales = ressucursales.data._data;
					
				} else {
					this.popup.error('Consultar', ressucursales.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private GrabarCorrelativos() {
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Enero'){
		// 	this.correlativostiposcomprobantes.mes = 1
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Febrero'){
		// 	this.correlativostiposcomprobantes.mes = 2
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Marzo'){
		// 	this.correlativostiposcomprobantes.mes = 3
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Abril'){
		// 	this.correlativostiposcomprobantes.mes = 4
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Mayo'){
		// 	this.correlativostiposcomprobantes.mes = 5
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Junio'){
		// 	this.correlativostiposcomprobantes.mes = 6
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Julio'){
		// 	this.correlativostiposcomprobantes.mes = 7
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Agosto'){
		// 	this.correlativostiposcomprobantes.mes = 8
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Septiembre'){
		// 	this.correlativostiposcomprobantes.mes = 9
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Octubre'){
		// 	this.correlativostiposcomprobantes.mes = 10
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Noviembre'){
		// 	this.correlativostiposcomprobantes.mes = 11
		// }else
		// if(this.correlativostiposcomprobantes.mes.toString() === 'Diciembre'){
		// 	this.correlativostiposcomprobantes.mes = 12
		// }
		this.correlativostiposcomprobantes.mes=1;
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_correlativostiposcomprobantes_Actualizar, this.correlativostiposcomprobantes)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_dataCorrelativos();
				
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_correlativostiposcomprobantes_Insertar, this.correlativostiposcomprobantes)
		.then((result) => {
			if (result.data.error === 0) {
			this.popup.success('Insertar', result.data.descripcion);
			this.cargar_dataCorrelativos();
			this.$router.push({ path: '/TiposComprobantes'});
			} else {
			this.popup.error('Insertar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Insertar', 'Error Inesperado: ' + error);
			});
		}
	}
    private GrabarTipoComp() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tiposcomprobantes_Actualizar, this.tiposcomprobantes)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_dataTipoComp();
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_tiposcomprobantes_Insertar, this.tiposcomprobantes)
		.then((result) => {
			if (result.data.error === 0) {
			this.popup.success('Insertar', result.data.descripcion);
			this.cargar_dataTipoComp();
			this.e1=2;
			} else {
			this.popup.error('Insertar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Insertar', 'Error Inesperado: ' + error);
			});
		}
	}
	private Cancelar() {
		this.$router.push({ path: '/TiposComprobantes'});
	}
	
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	
}
