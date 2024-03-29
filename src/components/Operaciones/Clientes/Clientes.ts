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
		//{ text: 'CodigoCliente', align: 'left', sortable: true, value: 'codigocliente', width: '5%' },
		//{ text: 'codigoclienteprincipal', align: 'left', sortable: false, value: 'codigoclienteprincipal', width: '5%' },
		//{ text: 'iddocumentoidentidad', align: 'left', sortable: false, value: 'iddocumentoidentidad', width: '5%' },
		{ text: 'Número Documento', align: 'left', sortable: true, value: 'numerodocumento', width: '13%' },
		{ text: 'Razón Social', align: 'left', sortable: true, value: 'razonsocial', width: '13%' },
		{ text: 'Pais', align: 'left', sortable: true, value: 'idpais', width: '10%' },
		{ text: 'Ciudad', align: 'left', sortable: true, value: 'idciudad', width: '10%' },
		{ text: 'Zona', align: 'left', sortable: true, value: 'idzona', width: '10%' },
		{ text: 'Tipo Cliente', align: 'left', sortable: true, value: 'idtipocliente', width: '10%' },
		{ text: 'Descripción dirección', align: 'left', sortable: false, value: 'descripciondireccion', width: '15%' },
		//{ text: 'telefono', align: 'left', sortable: false, value: 'telefono', width: '5%' },
		//{ text: 'correoelectronico', align: 'left', sortable: false, value: 'correoelectronico', width: '5%' },
		//{ text: 'casillacorreo', align: 'left', sortable: false, value: 'casillacorreo', width: '5%' },
		//{ text: 'cuentacontable', align: 'left', sortable: false, value: 'cuentacontable', width: '5%' },
		//{ text: 'cuentacontableanticipos', align: 'left', sortable: false, value: 'cuentacontableanticipos', width: '5%' },
		//{ text: 'activo', align: 'left', sortable: false, value: 'activo', width: '5%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	private WebApi = new services.Endpoints();

	private clientes = new services.clase_clientes();
	private lstclientes: services.clase_clientes[] = [];
	private lstclientescargar: services.clase_clientes[] = [];
	private buscarclientes = '';
	private tipodocumentosidentidad = new services.clase_tipodocumentosidentidad();
	private lsttipodocumentosidentidad: services.clase_tipodocumentosidentidad[] = [];
	private tiposcliente = new services.clase_tiposcliente();
	private lsttiposcliente: services.clase_tiposcliente[] = [];
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private zonas = new services.clase_zonas();
	private lstzonas: services.clase_zonas[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	private dialogPrueba = true;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  	];
	correosRules = [
		(v: any) => !!v || 'El campo es requerido',
		(v:any) => (v && v.length<=30) || "No se permite mas de  30 caracteres",
		(v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Ingrese un correo válido. Ej: ejemplo@ejemplo.com",

	];
	correosCasilla = [
		(v: any) => !!v || 'El campo es requerido',
		(v:any) => (v && v.length<=10) || "No se permite mas de  10 caracteres",

	];
	ValCodClie = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length<=10) || "No se permite mas de  10 caracteres",
        (v:any) => (/^[0-9A-Z-]*$/.test(v)) || "No se permiten  carcteres especiales ni espacios vacios"
	];
	ValNumDoc = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length<=15) || "No se permite mas de  15 caracteres",
        (v:any) => (/^[0-9A-Z-]*$/.test(v)) || "No se permiten  carcteres especiales ni espacios vacios"
	];
	ValTel = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length>=7) || "Tiene que imgresar mas de  7 degitos",
		(v:any) => (v && v.length<=10) || "No se permite mas de  10 caracteres",
        (v:any) => (/^[0-9-]*$/.test(v)) || "No se permiten letras,  carcteres especiales ni espacios vacios"
	];
	VaCuenta = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (v && v.length<=20) || "No se permite mas de  20 caracteres",
        (v:any) => (/^[0-9-]*$/.test(v)) || "No se permiten letras  carcteres especiales ni espacios vacios"
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
			this.cargarDocumentoIdentidad();
			this.cargarPais();
			this.cargarCiudad();
			this.cargarZona();
			this.cargarTipoCliente();
			// console.log("pais:" , JSON.stringify(this.clientes.idpais))
	}
	private cargarPais(){
		new services.Operaciones().Consultar(this.WebApi.ws_pais_Consultar)
			.then((respais) => {
				if (respais.data._error.error === 0) {
					this.lstpais = respais.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', respais.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}

	private beforeUpdate() {
		console.log("se esta cambiando algo")
		if(this.clientes.idpais != undefined){
			this.cargarCiudad()
		}	
	}

	private cargarCiudad(){
		if(this.clientes.idpais === undefined){
			new services.Operaciones().Consultar(this.WebApi.ws_ciudades_Consultar)
				.then((resciudades) => {
					if (resciudades.data._error.error === 0) {
						this.lstciudades = resciudades.data._data;
						// this.dialog = false;
					} else {
						this.popup.error('Consultar', resciudades.data._error.descripcion);
					}
				}).catch((error) => {
						this.popup.error('Consultar', 'Error Inesperado: ' + error);
				});
		} else if(this.clientes.idpais != undefined){
			this.ciudades.idpais = this.clientes.idpais
			new services.Operaciones().Buscar(this.WebApi.ws_ciudades_Consultar, this.ciudades)
				.then((resciudades) => {
					if (resciudades.data._error.error === 0) {
						this.lstciudades = resciudades.data._data;
						// this.dialog = false;
					} else {
						this.popup.error('Consultar', resciudades.data._error.descripcion);
					}
				}).catch((error) => {
						this.popup.error('Consultar', 'Error Inesperado: ' + error);
				});
		}
	}
	getItemciudad(data : any){
		return ` ${this.formatearpais(data.idpais) } - ${data.descripcion}`;
	}
	private cargarZona(){
		new services.Operaciones().Consultar(this.WebApi.ws_zonas_Consultar)
			.then((reszonas) => {
				if (reszonas.data._error.error === 0) {
					this.lstzonas = reszonas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reszonas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	getItemZonas(data : any){
		return ` ${this.formatearCiudad(data.idciudad) } - ${data.descripcion}`;
	}
	private cargarDocumentoIdentidad(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipodocumentosidentidad_Consultar)
			.then((restipodocumentosidentidad) => {
				if (restipodocumentosidentidad.data._error.error === 0) {
					this.lsttipodocumentosidentidad = restipodocumentosidentidad.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipodocumentosidentidad.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarTipoCliente(){
		new services.Operaciones().Consultar(this.WebApi.ws_tiposcliente_Consultar)
			.then((restiposcliente) => {
				if (restiposcliente.data._error.error === 0) {
					this.lsttiposcliente = restiposcliente.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restiposcliente.data._error.nombres);
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
		if(!this.registroLibre(this.clientes))
		{
			return;
		}
		this.clientes.activo = true;
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
		new services.Operaciones().Buscar(this.WebApi.ws_clientes_Buscar, data )
			 .then((resClientes) => {	
					 this.lstclientescargar= resClientes.data._data;
					 this.clientes = this.lstclientescargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_clientes): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminación de Registro: ' + data.codigocliente,
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
	
	private newCiudad(){
		this.$router.push({​​​​ path: '/Ciudades' }​​​​);​​​​
	}
	private newPais(){
		this.$router.push({​​​​ path: '/Pais' }​​​​);​​​​
	}
	private newZona(){
		this.$router.push({​​​​ path: '/Zonas' }​​​​);​​​​
	}
	private newTipocliente(){
		this.$router.push({​​​​ path: '/TiposCliente' }​​​​);​​​​
	}

	get lstclientesformateados(){
		return this.lstclientes.map((clientes : services.clase_clientes)=>{
			return{
				codigocliente:clientes.codigocliente,
				codigoclienteprincipal:clientes.codigoclienteprincipal,
				iddocumentoidentidad:clientes.iddocumentoidentidad,
				numerodocumento:clientes.numerodocumento,
				razonsocial:clientes.razonsocial,
				idpais:this.formatearpais(clientes.idpais),
				idciudad:this.formatearCiudad(clientes.idciudad),
				idzona:this.formatearzona(clientes.idzona),
				idtipocliente:this.formateartipocliente(clientes.idtipocliente),
				descripciondireccion:clientes.descripciondireccion,
				telefono:clientes.telefono,
				correoelectronico:clientes.correoelectronico,
				casillacorreo:clientes.casillacorreo,
				cuentacontable:clientes.cuentacontable,
				cuentacontableanticipos:clientes.cuentacontableanticipos,
				activo: clientes.activo
			}
		})
	}
	private formatearpais(idpais : Number){
		let paisLiteral: string = '';
			this.lstpais.forEach(function(value){
				if(value.idpais == idpais){
					paisLiteral = value.descripcion;
				}
			});
		return paisLiteral;	
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
	
	private formatearzona(idzona : Number){
		let zonaLiteral: string = '';
			this.lstzonas.forEach(function(value){
				if(value.idzona == idzona){
					zonaLiteral = value.descripcion;
				}
			});
		return zonaLiteral;	
	}
	private formateartipocliente(idtipocliente : Number){
		let tipoclienteLiteral: string = '';
			this.lsttiposcliente.forEach(function(value){
				if(value.idtipocliente == idtipocliente){
					tipoclienteLiteral = value.descripcion;
				}
			});
		return tipoclienteLiteral;	
	}
	private registroLibre(data: services.clase_clientes):boolean{
		var estaLibre:boolean = true;
		this.lstclientes.forEach((elem: any) => {
            if (elem.codigocliente == data.codigocliente && this.operacion!="Update"){
				this.popup.error('Validación', "Código de Cliente en uso");
				estaLibre = false;
            }
			if (elem.razonsocial == data.razonsocial){
				this.popup.error('Validación', "Razón Social en uso");
				estaLibre = false;
		  	}
        });
		return estaLibre;
	}
}
