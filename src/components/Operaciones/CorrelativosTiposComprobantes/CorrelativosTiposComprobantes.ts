import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '../../../services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import * as helper from '@/helper';
@Component
export default class AdmCorrelativosTiposComprobantesComponent extends Vue {
	private headers: any[] = [
		{ text: 'Tipo de Comprobante', align: 'left', sortable: true, value: 'idtipocomprobante', width: '15%' },
		{ text: 'Año', align: 'left', sortable: true, value: 'anio', width: '15%' },
		{ text: 'Mes', align: 'left', sortable: true, value: 'mes', width: '15%' },
		{ text: 'Correlativo', align: 'left', sortable: false, value: 'correlativo', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '5%' },
	];
	private WebApi = new services.Endpoints;

	private correlativostiposcomprobantes = new services.clase_correlativostiposcomprobantes();
	private lstcorrelativostiposcomprobantes: services.clase_correlativostiposcomprobantes[] = [];
	private lstMeses: services.mes[] = [];
	private lstAnios: services.anio[] = [];
	private helperObj = new helper.default();
	private buscarcorrelativostiposcomprobantes = '';
	// private lstMeses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	private dialog = false;
	private operacion = '';
	private popup = new popup.Swal();
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
		this.cargar_data();
	}
	private cargar_data() {
	// /*eslint no-shadow: 'error'*/
	// if (this.$store.state.auth !== true) {
	// this.$router.push({ path: '/Login' });
	// }
		new services.Operaciones().Consultar(this.WebApi.ws_correlativostiposcomprobantes_Consultar)
			.then((rescorrelativostiposcomprobantes) => {
				if (rescorrelativostiposcomprobantes.data._error.error === 0) {
					this.lstcorrelativostiposcomprobantes = rescorrelativostiposcomprobantes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescorrelativostiposcomprobantes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.correlativostiposcomprobantes = new services.clase_correlativostiposcomprobantes();
		this.lstMeses = this.helperObj.RetornaListaMeses();
		this.lstAnios = this.helperObj.RetornaListaAnios();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private InsertaCorrelativo(){
		
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			console.log("operacion actualizar")
			new services.Operaciones().Actualizar(this.WebApi.ws_correlativostiposcomprobantes_Actualizar, this.correlativostiposcomprobantes)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_data();
				this.dialog = false;
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		console.log("operacion insertar")
		// this.correlativostiposcomprobantes.idtipocomprobante = 1
		new services.Operaciones().Insertar(this.WebApi.ws_correlativostiposcomprobantes_Insertar, this.correlativostiposcomprobantes)
		.then((result) => {
			if (result.data.error === 0) {
			this.popup.success('Insertar', result.data.descripcion);
			this.cargar_data();
			this.dialog = false;
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
		this.cargar_data();
		this.dialog = false;
	}
	private Actualizar(data: services.clase_correlativostiposcomprobantes): void {
		this.correlativostiposcomprobantes = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_correlativostiposcomprobantes): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro' + data.idtipocomprobante + data.anio + data.mes,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((result) => {
			if (result.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_correlativostiposcomprobantes_Eliminar, data)
				// tslint:disable-next-line: no-shadowed-variable
				.then((result) => {
				if (result.data.error === 0) {
					swal.fire({
					type: 'success',
					title: 'Eliminar',
					text: result.data.descripcion,
					showConfirmButton: false,
					timer: 2000,
				});
				this.cargar_data();
				} else {
					swal.fire({
						type: 'error',
						title: 'Eliminar',
						text: result.data.descripcion,
						showConfirmButton: false,
						timer: 2000,
					});
				}
			}).catch((error) => {
				swal.fire({
					type: 'error',
					title: 'Eliminar',
					text: 'Error Inesperado',
					showConfirmButton: false,
					timer: 2000,
				});
			});
		}
		});
	}
	get lstcorrelativostiposcomprobantesFormat(){
		return this.lstcorrelativostiposcomprobantes.map((correlativostiposcomprobantes : services.clase_correlativostiposcomprobantes)=>{
			return{
				idtipocomprobante: correlativostiposcomprobantes.idtipocomprobante,
				mes: this.formatearMes(correlativostiposcomprobantes.mes),
				anio: correlativostiposcomprobantes.anio,
				correlativo: correlativostiposcomprobantes.correlativo
				
			}
		})
	}

	private formatearMes(mes : Number){
		let mesLiteral: string = '';
			this.lstcorrelativostiposcomprobantes.forEach(function(value){
				if(value.mes == mes){
					if(value.mes === 1){
						mesLiteral = 'Enero';
					}else if(value.mes === 2){
						mesLiteral = 'Febrero';
					}else if(value.mes === 3){
						mesLiteral = 'Marzo';
					}else if(value.mes === 4){
						mesLiteral = 'Abril';
					}else if(value.mes === 5){
						mesLiteral = 'Mayo';
					}else if(value.mes === 6){
						mesLiteral = 'Junio';
					}else if(value.mes === 7){
						mesLiteral = 'Julio';
					}else if(value.mes === 8){
						mesLiteral = 'Agosto';
					}else if(value.mes === 9){
						mesLiteral = 'Septiembre';
					}else if(value.mes === 10){
						mesLiteral = 'Octubre';
					}else if(value.mes === 11){
						mesLiteral = 'Noviembre';
					}else if(value.mes === 12){
						mesLiteral = 'Diciembre';
					}
				}
			});
		return mesLiteral;	
	}
}
