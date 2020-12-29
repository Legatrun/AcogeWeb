import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmClientesComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoCliente', align: 'left', sortable: true, value: 'codigocliente', width: '15%' },
		{ text: 'codigoclienteprincipal', align: 'left', sortable: false, value: 'codigoclienteprincipal', width: '15%' },
		{ text: 'iddocumentoidentidad', align: 'left', sortable: false, value: 'iddocumentoidentidad', width: '15%' },
		{ text: 'numerodocumento', align: 'left', sortable: false, value: 'numerodocumento', width: '15%' },
		{ text: 'razonsocial', align: 'left', sortable: false, value: 'razonsocial', width: '15%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '15%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '15%' },
		{ text: 'idzona', align: 'left', sortable: false, value: 'idzona', width: '15%' },
		{ text: 'idtipocliente', align: 'left', sortable: false, value: 'idtipocliente', width: '15%' },
		{ text: 'descripciondireccion', align: 'left', sortable: false, value: 'descripciondireccion', width: '15%' },
		{ text: 'telefono', align: 'left', sortable: false, value: 'telefono', width: '15%' },
		{ text: 'correoelectronico', align: 'left', sortable: false, value: 'correoelectronico', width: '15%' },
		{ text: 'casillacorreo', align: 'left', sortable: false, value: 'casillacorreo', width: '15%' },
		{ text: 'cuentacontable', align: 'left', sortable: false, value: 'cuentacontable', width: '15%' },
		{ text: 'cuentacontableanticipos', align: 'left', sortable: false, value: 'cuentacontableanticipos', width: '15%' },
		{ text: 'activo', align: 'left', sortable: false, value: 'activo', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private clientes = new services.clase_clientes();
	private lstclientes: services.clase_clientes[] = [];
	private buscarclientes = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
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
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_clientes_Consultar)
			.then((resclientes) => {
				if (resclientes.data._error.error === 0) {
					this.lstclientes = resclientes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resclientes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.clientes = new services.clase_clientes();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_clientes_Actualizar, this.clientes)
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
		new services.Operaciones().Insertar(this.WebApi.ws_clientes_Insertar, this.clientes)
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
	private Actualizar(data: services.clase_clientes): void {
		this.clientes = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_clientes): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.codigocliente,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_clientes_Eliminar, data)
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
