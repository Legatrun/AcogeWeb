import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admplanilla_descuentosComponent extends Vue {
	private headers: any[] = [
	//	{text: 'Empleado', align: 'left', sortable: true, value: 'empleado', width: '15%'},
		{text: 'Mes', align: 'left', sortable: true, value: 'mes', width: '10%'},
		{text: 'Año', align: 'left', sortable: true, value: 'año', width: '10%'},
		//{text: 'Descuento', align: 'left', sortable: true, value: 'descuento', width: '15%'},
		{text: 'Correlativo', align: 'left', sortable: true, value: 'correlativo', width: '10%'},
		{text: 'Fecha', align: 'left', sortable: false, value: 'fecha', width: '15%'},
		{text: 'Valor', align: 'left', sortable: false, value: 'valor', width: '10%'},
		{text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%'},
	];
	// tslint:disable-next-line: variable-name
	private menu_fecha: boolean = false;
	private WebApi = new services.Endpoints();

	private planilla_descuentos = new services.clase_planilla_descuentos();
	private lstplanilla_descuentos: services.clase_planilla_descuentos[] = [];


	private empleadodeptos = new services.clase_empleado_depto();
	private lstempleadodeptos: services.clase_empleado_depto[] = [];
	private descuentos = new services.clase_descuentos();
	private lstdescuentos: services.clase_descuentos[] = [];
	private parametros = new services.clase_parametros();
	private lstparametros: services.clase_parametros[] = [];
	private buscarplanilla_descuentos = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;

	RulAuton = [
		(v: any) => !!v || "El campo es requiredo",
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	validacion = [
		(v: any) => !!v || "El campo es requiredo",
		(v: any) => (/^[0-9 .]*$/.test(v)) || "No se permiten letras o carcateres especiales"
	];

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
	private ForClie(data: any){

	}

	private FormatMes(data: any) {
		if (data == 1) {
			return 'ENERO';
		}
		if (data == 2) {
			return 'FEBRERO';
		}
		if (data == 3) {
			return 'MARZO';
		}
		if (data == 4) {
			return 'ABRIL';
		}
		if (data == 5) {
			return 'MAYO';
		}
		if (data == 6) {
			return 'JUNIO';
		}
		if (data == 7) {
			return 'JULIO';
		}
		if (data == 8) {
			return 'AGOSTO';
		}
		if (data == 9) {
			return 'SEPTIEMBRE';
		}
		if (data == 10) {
			return 'OCTUBRE';
		}
		if (data == 11) {
			return 'NOVIEMBRE';
		}
		if (data == 12) {
			return 'DICIEMBRE';
		}
	}
	private ForMes(data: any){
		const set:any = `${data.mes}`;
		if(set == 1){
			return  'ENERO';
		}
		if(set == 2){
			return 'FEBRERO';
		}
		if(set == 3){
			return 'MARZO';
		}
		if (set == 4){
			return 'ABRIL';
		}
		if(set == 5){
			return 'MAYO';
		}
		if(set == 6){
			return  'JUNIO';
		}
		if(set == 7){
			return 'JULIO';
		}
		if(set == 8){
			return 'AGOSTO';
		}
		if (set == 9){
			return 'SEPTIEMBRE';
		}
		if(set == 10){
			return 'OCTUBRE';
		}
		if(set == 11){
			return 'NOVIEMBRE';
		}
		if(set == 12){
			return 'DICIEMBRE';
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
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_planilla_descuentos_Consultar)
			.then((resplanilla_descuentos) => {
				if (resplanilla_descuentos.data._error.error === 0) {
					this.lstplanilla_descuentos = resplanilla_descuentos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resplanilla_descuentos.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
		this.cargarEmpleadosdepto();
		this.cargarDescuentos();
		this.cargarParametros();
	}

	private cargarEmpleadosdepto() {
		new services.Operaciones().Consultar(this.WebApi.ws_empleado_depto_Consultar)
			.then((resempleadodepto) => {
				if (resempleadodepto.data._error.error === 0) {
					this.lstempleadodeptos = resempleadodepto.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resempleadodepto.data._error.empleado);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}

	private cargarDescuentos() {
		new services.Operaciones().Consultar(this.WebApi.ws_descuentos_Consultar)
			.then((resdescuento) => {
				if (resdescuento.data._error.error === 0) {
					this.lstdescuentos = resdescuento.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdescuento.data._error.nombre);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}

	private cargarParametros() {
		new services.Operaciones().Consultar(this.WebApi.ws_parametros_Consultar)
			.then((resparametros) => {
				if (resparametros.data._error.error === 0) {
					this.lstparametros = resparametros.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resparametros.data._error.mes);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}

	private Insertar(): void {
		this.planilla_descuentos = new services.clase_planilla_descuentos();
		this.planilla_descuentos.fecha = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}

	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_planilla_descuentos_Actualizar, this.planilla_descuentos)
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
			new services.Operaciones().Insertar(this.WebApi.ws_planilla_descuentos_Insertar, this.planilla_descuentos)
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

	private Actualizar(data: services.clase_planilla_descuentos): void {
		this.planilla_descuentos = data;
		this.planilla_descuentos.fecha = this.FormatDate(Date.now());


		this.operacion = 'Update';
		this.dialog = true;
	}

	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}

	private Eliminar(data: services.clase_planilla_descuentos): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro' + data.empleado + data.mes + data.año + data.descuento + data.correlativo,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
				new services.Operaciones().Eliminar(this.WebApi.ws_planilla_descuentos_Eliminar, data)
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
}
