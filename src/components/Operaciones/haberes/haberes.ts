import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmhaberesComponent extends Vue {
	private headers: any[] = [
	//	{ text: 'haber', align: 'left', sortable: true, value: 'haber', width: '15%' },
		{ text: 'Nombre', align: 'left', sortable: false, value: 'nombre', width: '15%' },
		{ text: 'Calculo', align: 'left', sortable: false, value: 'calculo', width: '10%' },
		{ text: 'Retencion', align: 'left', sortable: false, value: 'retencion', width: '10%' },
		{ text: 'Tipo', align: 'left', sortable: false, value: 'tipo', width: '5%' },
		{ text: 'Valor', align: 'left', sortable: false, value: 'valor', width: '10%' },
		{ text: 'Tipo haber', align: 'left', sortable: false, value: 'tipo_haber', width: '15%' },
		{ text: 'Basico', align: 'left', sortable: false, value: 'basico', width: '10%' },
		{ text: 'Extra', align: 'left', sortable: false, value: 'extra', width: '5%' },
		{ text: 'Eventual', align: 'left', sortable: false, value: 'eventual', width: '10%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private haberes = new services.clase_haberes();
	private lsthaberes: services.clase_haberes[] = [];
	private lstahaberesCargar: services.clase_haberes[] = [];
	private tipohaberes = new services.clase_tipo_haber();
	private lsttipohaberes: services.clase_tipo_haber[] = [];

	private buscarhaberes = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	public activa  = false;
	private HaberNom  =[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length>=2) || "Minimo 2 numeros",
		(v:any) => (/^[a-zA-Z]*$/.test(v)) || "El campo solo acepta letras",
	]
	private validacion  =[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9,.]*$/.test(v)) || "El campo solo acepta numeros",

	]
	private rulSelec= [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	private HaberEvento = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9]*$/.test(v)) || "El campo solo acepta numeros",
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
		new services.Operaciones().Consultar(this.WebApi.ws_haberes_Consultar)
			.then((reshaberes) => {
				if (reshaberes.data._error.error === 0) {
					this.lsthaberes = reshaberes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reshaberes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarTipoHaber();
	}

	private cargarTipoHaber(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipo_haber_Consultar)
			.then((restipohaber) => {
				if (restipohaber.data._error.error === 0) {
					this.lsttipohaberes = restipohaber.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipohaber.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private Insertar(): void {
		this.haberes = new services.clase_haberes();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_haberes_Actualizar, this.haberes)
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
		new services.Operaciones().Insertar(this.WebApi.ws_haberes_Insertar, this.haberes)
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
	private Actualizar(data: services.clase_haberes): void {
		//this.haberes = data;
		new services.Operaciones().Buscar(this.WebApi.ws_haberes_Buscar, data )
			.then((resHaber) => {
				this.lstahaberesCargar= resHaber.data._data;
				this.haberes = this.lstahaberesCargar[0];
				console.log(this.haberes)
			}).catch((err) => {
		});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_haberes): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.haber,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_haberes_Eliminar, data)
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

	private newtipoHaberes(){
		this.$router.push({​​​​ path: '/tipo_haber' }​​​​);​​​​
	}

	get lstatipohaberformateados(){
		return this.lsthaberes.map((haberes : services.clase_haberes)=>{
			return{
				haber: haberes.haber,
				nombre: haberes.nombre,
				calculo: haberes.calculo,
				retencion: haberes.retencion,
				tipo: haberes.tipo,
				valor: haberes.valor,
				tipo_haber: this.formatearTipohaber(haberes.tipo_haber),
				basico: haberes.basico,
				extra: haberes.extra,
				eventual: haberes.eventual
			}
		})
	}

	private formatearTipohaber(haber : Number){
		let tipohaberLiteral: string = '';
		this.lsttipohaberes.forEach(function(value){
			if(value.tipo_haber == haber){
				tipohaberLiteral = value.nombre;
			}
		});
		return tipohaberLiteral;
	}
}
