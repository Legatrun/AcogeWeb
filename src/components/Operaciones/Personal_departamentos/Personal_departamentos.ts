import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmPersonal_departamentosComponent extends Vue {
	private headers: any[] = [
		{ text: 'Cod departamento', align: 'left', sortable: true, value: 'personal_departamento', width: '15%' },
		{ text: 'Nombre', align: 'left', sortable: false, value: 'nombre', width: '15%' },
		{ text: 'Minimo', align: 'left', sortable: false, value: 'minimo', width: '10%' },
		{ text: 'Maximo', align: 'left', sortable: false, value: 'maximo', width: '10%' },
		//{ text: 'Empresa', align: 'left', sortable: false, value: 'empresa', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private personal_departamentos = new services.clase_personal_departamentos();
	private lstpersonal_departamentos: services.clase_personal_departamentos[] = [];
	private empresas = new services.clase_empresa();
	private lstempresas: services.clase_empresa[] = [];
	private buscarpersonal_departamentos = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;
	coddepartamento=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9]*$/.test(v)) || "No se permite letras  caracteres especiales",
	];
	validacion = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9,.]*$/.test(v)) || "No se permite letras  caracteres especiales",
	];
	ruleValida = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
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
		new services.Operaciones().Consultar(this.WebApi.ws_personal_departamentos_Consultar)
			.then((respersonal_departamentos) => {
				if (respersonal_departamentos.data._error.error === 0) {
					this.lstpersonal_departamentos = respersonal_departamentos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', respersonal_departamentos.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarEmpresa();
	}
	private cargarEmpresa(){
		new services.Operaciones().Consultar(this.WebApi.ws_empresa_Consultar)
			.then((resempresa) => {
				if (resempresa.data._error.error === 0) {
					this.lstempresas = resempresa.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resempresa.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}
	private Insertar(): void {
		this.personal_departamentos = new services.clase_personal_departamentos();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_personal_departamentos_Actualizar, this.personal_departamentos)
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
		new services.Operaciones().Insertar(this.WebApi.ws_personal_departamentos_Insertar, this.personal_departamentos)
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
	private Actualizar(data: services.clase_personal_departamentos): void {
		this.personal_departamentos = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_personal_departamentos): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.personal_departamento,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_personal_departamentos_Eliminar, data)
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
	private formatearEmpresa(idempresa : any){
		let empresaLiteral: string = '';
		this.lstempresas.forEach(function(value){
			if(value.idempresa == idempresa){
				empresaLiteral = value.descripcion;
			}
		});
		return empresaLiteral;
	}
}
