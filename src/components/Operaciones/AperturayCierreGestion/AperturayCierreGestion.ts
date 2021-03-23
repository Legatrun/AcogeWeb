import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmAperturayCierreGestionComponent extends Vue {
	private headers: any[] = [
		{ text: 'Gestion', align: 'left', sortable: true, value: 'gestion', width: '15%' },
		{ text: 'Mes', align: 'left', sortable: true, value: 'mes', width: '15%' },
		{ text: 'abierta', align: 'left', sortable: false, value: 'abierta', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private aperturaycierregestion = new services.clase_aperturaycierregestion();
	private lstaperturaycierregestion: services.clase_aperturaycierregestion[] = [];
	private lstaperturaycierregestioncargar: services.clase_aperturaycierregestion[] = [];
	private buscaraperturaycierregestion = '';
	private lstMeses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
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
		new services.Operaciones().Consultar(this.WebApi.ws_aperturaycierregestion_Consultar)
			.then((resaperturaycierregestion) => {
				if (resaperturaycierregestion.data._error.error === 0) {
					this.lstaperturaycierregestion = resaperturaycierregestion.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resaperturaycierregestion.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.aperturaycierregestion = new services.clase_aperturaycierregestion();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if(this.aperturaycierregestion.mes.toString() === 'Enero'){
			this.aperturaycierregestion.mes = 1
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Febrero'){
			this.aperturaycierregestion.mes = 2
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Marzo'){
			this.aperturaycierregestion.mes = 3
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Abril'){
			this.aperturaycierregestion.mes = 4
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Mayo'){
			this.aperturaycierregestion.mes = 5
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Junio'){
			this.aperturaycierregestion.mes = 6
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Julio'){
			this.aperturaycierregestion.mes = 7
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Agosto'){
			this.aperturaycierregestion.mes = 8
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Septiembre'){
			this.aperturaycierregestion.mes = 9
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Octubre'){
			this.aperturaycierregestion.mes = 10
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Noviembre'){
			this.aperturaycierregestion.mes = 11
		}else
		if(this.aperturaycierregestion.mes.toString() === 'Diciembre'){
			this.aperturaycierregestion.mes = 12
		}
		if (this.operacion === 'Update') {
			console.log(this.aperturaycierregestion)
			new services.Operaciones().Actualizar(this.WebApi.ws_aperturaycierregestion_Actualizar, this.aperturaycierregestion)
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
		new services.Operaciones().Insertar(this.WebApi.ws_aperturaycierregestion_Insertar, this.aperturaycierregestion)
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
	private Actualizar(data: services.clase_aperturaycierregestion): void {
		if(data.mesformat == 'Enero'){
			data.mes = 1
		}else if(data.mesformat == 'Febrero'){
			data.mes = 2
		}else if(data.mesformat == 'Marzo'){
			data.mes = 3
		}else if(data.mesformat == 'Abril'){
			data.mes = 4
		}else if(data.mesformat == 'Mayo'){
			data.mes = 5
		}else if(data.mesformat == 'Junio'){
			data.mes = 6
		}else if(data.mesformat == 'Julio'){
			data.mes = 7
		}else if(data.mesformat == 'Agosto'){
			data.mes = 8
		}else if(data.mesformat == 'Septiembre'){
			data.mes = 9
		}else if(data.mesformat == 'Octubre'){
			data.mes = 10
		}else if(data.mesformat == 'Noviembre'){
			data.mes = 11
		}else if(data.mesformat == 'Diciembre'){
			data.mes = 12
		}
		new services.Operaciones().Buscar(this.WebApi.ws_aperturaycierregestion_Buscar, data )
		.then((resaperturaycierregestion) => {	
				this.lstaperturaycierregestioncargar= resaperturaycierregestion.data._data;
				this.aperturaycierregestion = this.lstaperturaycierregestioncargar[0];
				console.log(this.aperturaycierregestion)
			}).catch((err) => {   
		});
		
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}

	private llenarValorParams(mes: number) {
		let scope = this;
		let isOpen: Boolean = true;
		this.lstaperturaycierregestion.forEach(function(params: any, i: number) {
		  if (params.mes === mes) {
			scope.lstaperturaformateados[i].abierta = true;
		  }
		  isOpen = scope.lstaperturaformateados[i].abierta;
		});
	  }

	  private renderChecklist(mes: string) {
		let scope = this;
		let parametroActual = this.lstaperturaformateados.filter(
		  (param) => param.mesformat === mes
		);
	  }

	private Eliminar(data: services.clase_aperturaycierregestion): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.gestion +'/'+ data.mesformat,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if(data.mesformat == 'Enero'){
				data.mes = 1
			}else if(data.mesformat == 'Febrero'){
				data.mes = 2
			}else if(data.mesformat == 'Marzo'){
				data.mes = 3
			}else if(data.mesformat == 'Abril'){
				data.mes = 4
			}else if(data.mesformat == 'Mayo'){
				data.mes = 5
			}else if(data.mesformat == 'Junio'){
				data.mes = 6
			}else if(data.mesformat == 'Julio'){
				data.mes = 7
			}else if(data.mesformat == 'Agosto'){
				data.mes = 8
			}else if(data.mesformat == 'Septiembre'){
				data.mes = 9
			}else if(data.mesformat == 'Octubre'){
				data.mes = 10
			}else if(data.mesformat == 'Noviembre'){
				data.mes = 11
			}else if(data.mesformat == 'Diciembre'){
				data.mes = 12
			}
			if (resultOfQuestion.value) {
			console.log(data)
			new services.Operaciones().Eliminar(this.WebApi.ws_aperturaycierregestion_Eliminar, data)
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
	//FORMATEO DE LOS ID POR LITERALES EN LISTA PRINCIPAL
	get lstaperturaformateados(){
		return this.lstaperturaycierregestion.map((aperturaycierregestion : services.clase_aperturaycierregestion)=>{
			return{
				gestion: aperturaycierregestion.gestion,
				mesformat: this.formatearMes(aperturaycierregestion.mes),
				abierta: aperturaycierregestion.abierta
			}
		})
	}
	private formatearMes(mes : Number){
		let mesLiteral: string = '';
			this.lstaperturaycierregestion.forEach(function(value){
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
	// private formatearTipoMovimiento(idtipomovimiento : Number){
	// 	let idtipomovimientoLiteral: string = '';
	// 		this.lsttipomovimientoinventario.forEach(function(value){
	// 			if(value.idtipomovimiento == idtipomovimiento){
	// 				idtipomovimientoLiteral = value.descripcion;
	// 			}
	// 		});
	// 	return idtipomovimientoLiteral;	
	// }
}
