import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmItemsComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoItem', align: 'left', sortable: true, value: 'codigoitem', width: '5%' },
		{ text: 'modelonroparte', align: 'left', sortable: false, value: 'modelonroparte', width: '5%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '5%' },
		{ text: 'fechacreacion', align: 'left', sortable: false, value: 'fechacreacion', width: '10%' },
		{ text: 'fechaultimomovimiento', align: 'left', sortable: false, value: 'fechaultimomovimiento', width: '10%' },
		{ text: 'costoinicial', align: 'left', sortable: false, value: 'costoinicial', width: '5%' },
		{ text: 'costoactual', align: 'left', sortable: false, value: 'costoactual', width: '5%' },
		{ text: 'saldoinicial', align: 'left', sortable: false, value: 'saldoinicial', width: '5%' },
		{ text: 'saldoactual', align: 'left', sortable: false, value: 'saldoactual', width: '5%' },
		{ text: 'idclase', align: 'left', sortable: false, value: 'idclase', width: '5%' },
		{ text: 'idtipoitem', align: 'left', sortable: false, value: 'idtipoitem', width: '5%' },
		{ text: 'idunidadmanejo', align: 'left', sortable: false, value: 'idunidadmanejo', width: '5%' },
		{ text: 'codigoitemsup', align: 'left', sortable: false, value: 'codigoitemsup', width: '5%' },
		{ text: 'cantidadminima', align: 'left', sortable: false, value: 'cantidadminima', width: '5%' },
		{ text: 'cantidadmaxima', align: 'left', sortable: false, value: 'cantidadmaxima', width: '5%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechacreacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fechaultimomovimiento: boolean = false;
	private WebApi = new services.Endpoints();
	private items = new services.clase_items();
	private lstitems: services.clase_items[] = [];
	private claseitems = new services.clase_claseitems();
	private lstclaseitems: services.clase_claseitems[] = [];
	private lstclaseitemscargar: services.clase_items[] = [];
	private tipositems = new services.clase_tipositems();
	private lsttipositems: services.clase_tipositems[] = [];
	private unidaddemanejo = new services.clase_unidaddemanejo();
	private lstunidaddemanejo: services.clase_unidaddemanejo[] = [];
	private buscaritems = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
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
		new services.Operaciones().Consultar(this.WebApi.ws_items_Consultar)
			.then((resitems) => {
				if (resitems.data._error.error === 0) {
					this.lstitems = resitems.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resitems.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarClaseItem();
			this.cargarUnidadManejo();
			this.cargartipoItem();
	}
	private cargarClaseItem(){
		new services.Operaciones().Consultar(this.WebApi.ws_claseitems_Consultar)
			.then((resclaseitems) => {
				if (resclaseitems.data._error.error === 0) {
					this.lstclaseitems = resclaseitems.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resclaseitems.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargartipoItem(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipositems_Consultar)
			.then((restipositems) => {
				if (restipositems.data._error.error === 0) {
					this.lsttipositems = restipositems.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipositems.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarUnidadManejo(){
		new services.Operaciones().Consultar(this.WebApi.ws_unidaddemanejo_Consultar)
			.then((resunidaddemanejo) => {
				if (resunidaddemanejo.data._error.error === 0) {
					this.lstunidaddemanejo = resunidaddemanejo.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resunidaddemanejo.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.items = new services.clase_items();
		this.items.fechacreacion = this.FormatDate(Date.now());
		this.items.fechaultimomovimiento = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_items_Actualizar, this.items)
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
		new services.Operaciones().Insertar(this.WebApi.ws_items_Insertar, this.items)
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
	private Actualizar(data: services.clase_items): void {

		new services.Operaciones().Buscar(this.WebApi.ws_items_Buscar, data )
			 .then((resBanco) => {	
					 this.lstclaseitemscargar= resBanco.data._data;
					 this.items = this.lstclaseitemscargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
		this.items.fechacreacion = this.FormatDate(Date.now());
		this.items.fechaultimomovimiento = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_items): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.descripcion,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_items_Eliminar, data)
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
	get lstItemformateados(){
		return this.lstitems.map((item : services.clase_items)=>{
			return{
				codigoitem: item.codigoitem,
				modelonroparte: item.modelonroparte,
				descripcion: item.descripcion,
				fechacreacion: item.fechacreacion,
				fechaultimomovimiento: item.fechaultimomovimiento,
				costoinicial: item.costoinicial,
				costoactual: item.costoactual,
				saldoinicial: item.saldoinicial,
				saldoactual: item.saldoactual,
				idclase: this.formatearclase(item.idclase),
				idtipoitem: this.formateartipoitem(item.idtipoitem),
				idunidadmanejo: this.formatearuniddmanejo(item.idunidadmanejo),
				codigoitemsup: item.codigoitemsup,
				cantidadminima: item.cantidadminima,
				cantidadmaxima: item.cantidadmaxima
			}
		})
	}
	private formatearclase(idclase : Number){
		let claseLiteral: string = '';
			this.lstclaseitems.forEach(function(value){
				if(value.idclase == idclase){
					claseLiteral = value.descripcion;
				}
			});
		return claseLiteral;	
	}
	private formateartipoitem(idtipoitem : Number){
		let tipoitemLiteral: string = '';
			this.lsttipositems.forEach(function(value){
				if(value.idtipoitem == idtipoitem){
					tipoitemLiteral = value.descripcion;
				}
			});
		return tipoitemLiteral;	
	}
	private formatearuniddmanejo(idunidadmanejo : Number){
		let unidadmanejoliteral: string = '';
			this.lstunidaddemanejo.forEach(function(value){
				if(value.idunidadmanejo == idunidadmanejo){
					unidadmanejoliteral = value.descripcion;
				}
			});
		return unidadmanejoliteral;	
	}
}
