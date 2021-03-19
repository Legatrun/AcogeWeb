import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCajasComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDCaja', align: 'left', sortable: true, value: 'idcaja', width: '15%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'cuenta', align: 'left', sortable: false, value: 'cuenta', width: '15%' },
		{ text: 'monto', align: 'left', sortable: false, value: 'monto', width: '15%' },
		{ text: 'idmoneda', align: 'left', sortable: false, value: 'idmoneda', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private cajas = new services.clase_cajas();
	private lstcajas: services.clase_cajas[] = [];
	private lstcajasCargar: services.clase_cajas[] = [];
	private buscarcajas = '';
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
  MontoRules = [
	//(v: any) => !!v || "El campo es requerido",
	(v: any) => !(!/^[0-9]*$/.test(v)) || "El campo sólo permite números, hasta 10 dígitos",
];
MontosRules = [
	(v: any) => !!v || "El campo es requerido",
	(v: any) => !(!/^[0-9, .]*$/.test(v)) || "El campo sólo permite números",
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
		new services.Operaciones().Consultar(this.WebApi.ws_cajas_Consultar)
			.then((rescajas) => {
				if (rescajas.data._error.error === 0) {
					this.lstcajas = rescajas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescajas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarMonedas();
	}
	private cargarMonedas(){
		new services.Operaciones().Consultar(this.WebApi.ws_monedas_Consultar)
			.then((resmonedas) => {
				if (resmonedas.data._error.error === 0) {
					this.lstmonedas = resmonedas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resmonedas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.cajas = new services.clase_cajas();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_cajas_Actualizar, this.cajas)
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
		new services.Operaciones().Insertar(this.WebApi.ws_cajas_Insertar, this.cajas)
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
	private Actualizar(data: services.clase_cajas): void {
		new services.Operaciones().Buscar(this.WebApi.ws_cajas_Buscar, data )
		.then((resCajas) => {	
				this.lstcajasCargar= resCajas.data._data;
				this.cajas = this.lstcajasCargar[0];
			}).catch((err) => {   
		   });
   this.operacion = 'Update';
   this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_cajas): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_cajas_Eliminar, data)
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
	private newMoneda(){
		this.$router.push({​​​​ path: '/Monedas' }​​​​);​​​​
	}
	get lstcajasformateados(){
		return this.lstcajas.map((cajas : services.clase_cajas)=>{
			return{
				idcaja: cajas.idcaja,
				descripcion: cajas.descripcion,
				cuenta: cajas.cuenta,
				monto: cajas.monto,
				idmoneda: this.formatearMoneda(cajas.idmoneda)
			}
		})
	}
	private formatearMoneda(idmoneda: Number){
		let monedaLiteral: string = '';
			this.lstmonedas.forEach(function(value){
				if(value.idmoneda == idmoneda){
					monedaLiteral = value.descripcion;
				}
			});
		return monedaLiteral;	
	}
}
