import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admtipo_empleadoComponent extends Vue {
	private headers: any[] = [
	//	{ text: 'tipo_empleado', align: 'left', sortable: true, value: 'tipo_empleado', width: '15%' },
		{ text: 'Nombres de tipo empleados', align: 'left', sortable: false, value: 'nombre', width: '60%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '15%' },
	];
	private WebApi = new services.Endpoints();

	private tipo_empleado = new services.clase_tipo_empleado();
	private lsttipo_empleado: services.clase_tipo_empleado[] = [];
	private buscartipo_empleado = '';
	private dialog = false;
	private operacion = '';
	private activa = false;
	private helper: helpers = new helpers();
	private popup = new popup.Swal();

	RuleNombre = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[a-z A-Z]*$/.test(v)) || "No se permite numeros ni caracteres especiales"
	]
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
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_tipo_empleado_Consultar)
			.then((restipo_empleado) => {
				if (restipo_empleado.data._error.error === 0) {
					this.lsttipo_empleado = restipo_empleado.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipo_empleado.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.tipo_empleado = new services.clase_tipo_empleado();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tipo_empleado_Actualizar, this.tipo_empleado)
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
		new services.Operaciones().Insertar(this.WebApi.ws_tipo_empleado_Insertar, this.tipo_empleado)
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
	private Actualizar(data: services.clase_tipo_empleado): void {
		this.tipo_empleado = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_tipo_empleado): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminar' + ' ' + data.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_tipo_empleado_Eliminar, data)
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
