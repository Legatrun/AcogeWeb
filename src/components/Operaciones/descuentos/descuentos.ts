import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdescuentosComponent extends Vue {
	private headers: any[] = [
		//{ text: 'descuento', align: 'left', sortable: true, value: 'descuento', width: '15%' },
		{ text: 'Nombre', align: 'left', sortable: false, value: 'nombre', width: '15%' },
		{ text: 'Calculo', align: 'left', sortable: false, value: 'calculo', width: '10%' },
		{ text: 'Valor', align: 'left', sortable: false, value: 'valor', width: '15%' },
		{ text: 'Tipo', align: 'left', sortable: false, value: 'tipo', width: '10%' },
		{ text: 'Tipo descuento', align: 'left', sortable: false, value: 'idtipodescuentoFormat', width: '15%' },
		{ text: 'Basico', align: 'left', sortable: false, value: 'basico', width: '10%' },
		{ text: 'Eventual', align: 'left', sortable: false, value: 'eventual', width: '10%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();


	private descuentos = new services.clase_descuentos();
	private lstdescuentos: services.clase_descuentos[] = [];
	private lstdescuentocargar:services.clase_descuentos[] = [];
	private tipodescuentos = new services.clase_tipo_descuento();
	private lsttipodescuento: services.clase_descuentos[] = [];
	private buscardescuentos = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	public validacion = false;

	private RuleDeNo=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length>=3) || "Minimo 3 caracteres",
		(v:any) => (/^[a-z A-Z]*$/.test(v)) || "No se permiten numeros o carcteres especiales"
	]
	private RuleDeValor=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9.]*$/.test(v)) || "No se permiten letras o carcteres especiales"
	]
	private RuleTipoDes = [
		(v:any) => !!v || "El campo es requiredo",
	]
	private RuleEven=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9]*$/.test(v)) || "No se permiten letras o carcteres especiales"
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
		this.cargarTipoDescuento();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_descuentos_Consultar)
			.then((resdescuentos) => {
				if (resdescuentos.data._error.error === 0) {
					this.lstdescuentos = resdescuentos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdescuentos.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		

	}
	private Insertar(): void {
		this.descuentos = new services.clase_descuentos();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_descuentos_Actualizar, this.descuentos)
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
		new services.Operaciones().Insertar(this.WebApi.ws_descuentos_Insertar, this.descuentos)
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
	private Actualizar(data: services.clase_descuentos): void {
		//this.descuentos = data;
		new services.Operaciones().Buscar(this.WebApi.ws_descuentos_Buscar, data )
			.then((resDescuentos) => {
				this.lstdescuentocargar= resDescuentos.data._data;
				this.descuentos = this.lstdescuentocargar[0];
			}).catch((err) => {
		});

		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_descuentos): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_descuentos_Eliminar, data)
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

	private cargarTipoDescuento(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipo_descuento_Consultar)
			.then((restipodescuento) => {
				if (restipodescuento.data._error.error === 0) {
					this.lsttipodescuento = restipodescuento.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipodescuento.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}

	private newTipodescuento(){
		this.$router.push({​​​​ path: '/tipo_descuento' }​​​​);​​​​
	}
	get lstdescuentosformateados(){
		return this.lstdescuentos.map((descuentos : services.clase_descuentos)=>{
			return{
				descuento: descuentos.descuento,
				nombre: descuentos.nombre,
				calculo: descuentos.calculo,
				valor: descuentos.valor,
				tipo:descuentos.tipo,
				idtipodescuentoFormat: this.formatearTipodescuento(descuentos.tipo_descuento),
				basico: descuentos.basico,
				eventual: descuentos.eventual
			}
		})
	}
	private formatearTipodescuento(tipo_descuento : Number){
		let tipodescuentoLiteral: string = '';
		this.lsttipodescuento.forEach(function(value){
			if(value.tipo_descuento == tipo_descuento){
				tipodescuentoLiteral = value.nombre;
			}
		});
		return tipodescuentoLiteral;
	}
}
