import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment, { relativeTimeThreshold } from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmAlmacenesComponent extends Vue {
	private headers: any[] = [
		{ text: 'Nombre de Almacén', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'Código', align: 'left', sortable: false, value: 'codigoalmacen', width: '15%' },
		{ text: 'Tipo de Movimiento', align: 'left', sortable: false, value: 'idtipomovimientoformat', width: '15%' },
		{ text: 'Ciudad', align: 'left', sortable: false, value: 'idciudadFormat', width: '15%' },
		{ text: 'Virtual', align: 'left', sortable: false, value: 'virtual', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private almacenes = new services.clase_almacenes();
	private lstalmacenes: services.clase_almacenes[] = [];
	private lstalmacenesCargar: services.clase_almacenes[] = [];
	private buscaralmacenes = '';
	private tipomovimientoinventario = new services.clase_tipomovimientoinventario();
	private lsttipomovimientoinventario: services.clase_tipomovimientoinventario[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
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
	private FormatDatetime(data: any) {
		return moment(data).format('DD-MM-YYYY HH:mm');
	}
	private FormatBoolean(data: any) {
		if (data) {
			return 'SI';
		} else {
			return 'NO';
		}
	}
	private formatearCiudad(idciudad : Number){
		let ciudadLiteral: string = '';
			this.lstciudades.forEach(function(value){
				if(value.idciudad == idciudad){
					ciudadLiteral = value.descripcion;
				}
			});
		return ciudadLiteral;	
	}
	private formatearTipoMovimiento(idtipomovimiento : Number){
		let idtipomovimientoLiteral: string = '';
			this.lsttipomovimientoinventario.forEach(function(value){
				if(value.idtipomovimiento == idtipomovimiento){
					idtipomovimientoLiteral = value.descripcion;
				}
			});
		return idtipomovimientoLiteral;	
	}
	private registroLibre(data: services.clase_almacenes):boolean{
		var estaLibre:boolean = true;
		this.lstalmacenes.forEach((elem: any) => {
            if (elem.codigoalmacen == data.codigoalmacen && this.operacion!="Update"){
				this.popup.error('Validación', "Código en uso");
				estaLibre = false;
            }
			if (elem.descripcion == data.descripcion){
				this.popup.error('Validación', "Nombre en uso");
				estaLibre = false;
		  	}
        });
		return estaLibre;
	}

	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private beforeUpdate(){
		if(this.almacenes.descripcion != "" && this.operacion!="Update"){
			this.almacenes.codigoalmacen = this.almacenes.descripcion.substr(0,5) 
		}
	}
	private mounted() {
		this.cargar_data();
		this.cargarTipoMovimientoInventario();
		this.cargarCiudades();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_almacenes_Consultar)
			.then((resalmacenes) => {
				if (resalmacenes.data._error.error === 0) {
					this.lstalmacenes = resalmacenes.data._data;
					
					this.dialog = false;
					console.log("rev: " + JSON.stringify(this.lstalmacenes))
				} else {
					this.popup.error('Consultar', resalmacenes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			
	}
	private cargarTipoMovimientoInventario(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipomovimientoinventario_Consultar)
			.then((restipomovimientoinventario) => {
				if (restipomovimientoinventario.data._error.error === 0) {
					this.lsttipomovimientoinventario = restipomovimientoinventario.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipomovimientoinventario.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarCiudades(){
		new services.Operaciones().Consultar(this.WebApi.ws_ciudades_Consultar)
			.then((resciudades) => {
				if (resciudades.data._error.error === 0) {
					this.lstciudades = resciudades.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resciudades.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.almacenes = new services.clase_almacenes();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if(!this.registroLibre(this.almacenes))
		{
			return;
		}
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_almacenes_Actualizar, this.almacenes)
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
		new services.Operaciones().Insertar(this.WebApi.ws_almacenes_Insertar, this.almacenes)
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
	private Actualizar(data: services.clase_almacenes): void {
		new services.Operaciones().Buscar(this.WebApi.ws_almacenes_Buscar, data )
		.then((resAlmacenes) => {	
				this.lstalmacenesCargar= resAlmacenes.data._data;
				this.almacenes = this.lstalmacenesCargar[0];
				console.log(this.almacenes)
			}).catch((err) => {   
		   });
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_almacenes): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro: ' + data.descripcion,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_almacenes_Eliminar, data)
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
	private newtipoMovimiento(){
		this.$router.push({​​​​ path: '/TipoMovimientoInventario' }​​​​);​​​​
	}
	private newCiudad(){
		this.$router.push({​​​​ path: '/Ciudades' }​​​​);​​​​
	}
	//FORMATEO DE LOS ID POR LITERALES EN LISTA PRINCIPAL
	// get lstalmacenesformateados(){
	// 	debugger
	// 	return this.lstalmacenes.map((almacenes : services.clase_almacenes)=>{
	// 		return{
	// 			codigoalmacen: almacenes.codigoalmacen,
	// 			descripcion: almacenes.descripcion,
	// 			idtipomovimientoformat: this.formatearTipoMovimiento(almacenes.idtipomovimiento),
	// 			idciudadFormat: this.formatearCiudad(almacenes.idciudad),
	// 			virtual: almacenes.virtual,
	// 		}
	// 	})
	// }
}
