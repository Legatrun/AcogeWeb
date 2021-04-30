import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmparametrosComponent extends Vue {
	private headers: any[] = [
		{ text: 'Mes', align: 'left', sortable: true, value: 'mes', width: '15%' },
		{ text: 'Año', align: 'left', sortable: true, value: 'año', width: '15%' },
		{ text: 'Cotizacion', align: 'left', sortable: false, value: 'cotizacion', width: '15%' },
		{ text: 'Minimo nacional', align: 'left', sortable: false, value: 'minimo_nacional', width: '15%' },
		{ text: 'UFB', align: 'left', sortable: false, value: 'ufb', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private parametros = new services.clase_parametros();
	private lstparametros: services.clase_parametros[] = [];
	private lstaparametrosCargar: services.clase_parametros[] =  [];
	private buscarparametros = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;

	private listarMes: any[] = [
		{Mes:'ENERO',value:1},{Mes:'FEBRERO',value:2},	{Mes:'MARZO',value:3},{Mes:'ABRIL',value:4},{Mes:'MAYO',value:5},{Mes:'JUNIO',value:6},
		{Mes:'JULIO',value:7},{Mes:'AGUSTO',value:8}, {Mes:'SEPTIEMBRE',value:9},{Mes:'OCTUBRE',value:10},	{Mes:'NOVIEMBRE',value:11},{Mes:'DICIEMBRE',value:12}
	]
	private listarGestion: any[]=[
		{Gestion:2020},{Gestion:2021},{Gestion:2022},{Gestion:2023},{Gestion:2024},{Gestio:2025}
	]

	private validacion=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9,.]*$/.test(v)) || "El campo solo acepta letras",
	]
	private ruleSelec=[
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
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
		new services.Operaciones().Consultar(this.WebApi.ws_parametros_Consultar)
			.then((resparametros) => {
				if (resparametros.data._error.error === 0) {
					this.lstparametros = resparametros.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resparametros.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.parametros = new services.clase_parametros();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_parametros_Actualizar, this.parametros)
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
		new services.Operaciones().Insertar(this.WebApi.ws_parametros_Insertar, this.parametros)
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
	private Actualizar(data: services.clase_parametros): void {
		//this.parametros = data;
		new services.Operaciones().Buscar(this.WebApi.ws_parametros_Buscar, data )
			.then((resParametros) => {
				this.lstaparametrosCargar= resParametros.data._data;
				this.parametros = this.lstaparametrosCargar[0];
				console.log(this.parametros)
			}).catch((err) => {
		});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_parametros): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.mes + data.año,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_parametros_Eliminar, data)
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
