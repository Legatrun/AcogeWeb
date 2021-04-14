<template>
	<v-card width='100%' >
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Proveedores</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarproveedores"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstproveedoresformateados" 
						:items-per-page="30"
						:search = "buscarproveedores" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.codigoproveedor,lstProveedores, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.codigoproveedor }}</td>
					<td>{{ props.item.iddocumentoidentidad }}</td>
					<td>{{ props.item.numerodocumento }}</td>
					<td>{{ props.item.razonsocial }}</td>
					<td>{{ props.item.direccion }}</td>
					<td>{{ props.item.idpais }}</td>
					<td>{{ props.item.idciudad }}</td>
					<td>{{ props.item.idmoneda }}</td>
					<td>{{ props.item.contacto }}</td>
					<td>{{ props.item.telefonos }}</td>
					<td>{{ props.item.fax }}</td>
					<td>{{ props.item.cuenta }}</td>
					<td>{{ props.item.idtipoproveedor }}</td>
					<td>{{ FormatDate(props.item.fechacreacion) }}</td>
					<td>{{ props.item.codaduana }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Proveedor</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Proveedor</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="gray" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Proveedores</v-btn>
					</template>
					<span>Adicionar nuevo registro de Proveedor</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Proveedores</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="proveedores.codigoproveedor"
												label="Codigo de Proveedor"
												hint="Ingrese Codigo de Proveedor"
												placeholder="Codigo de Proveedor"
												clearable
												persistent-hint
												required
												:rules="Codigorules"
												@input="proveedores.codigoproveedor = updateText(proveedores.codigoproveedor)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="proveedores.codigoproveedor"
												label="Codigo de Proveedor"
												placeholder="Codigo de Proveedor"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
						
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="proveedores.iddocumentoidentidad"
								label="Documento de Identidad"
								:items="lsttipodocumentosidentidad"
								item-text="descripcion"
								item-value="iddocumentoidentidad"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.iddocumentoidentidad = updateText(proveedores.iddocumentoidentidad)"
								></v-autocomplete>
							</v-col>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.numerodocumento"
											label="Numero de Documento"
											hint="Ingrese Numero de Documento"
											placeholder="Numero de Documento"
											clearable
											persistent-hint
											required
											:rules="NumeroDocrules"
											@input="proveedores.numerodocumento = updateText(proveedores.numerodocumento)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.razonsocial"
											label="RazonSocial"
											hint="Ingrese Razon Social"
											placeholder="Razon Social"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="proveedores.razonsocial = updateText(proveedores.razonsocial)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="proveedores.direccion"
											label="Direccion"
											hint="Ingrese Direccion"
											placeholder="Direccion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="proveedores.direccion = updateText(proveedores.direccion)">
								</v-text-field>
							</v-flex>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="proveedores.idpais"
								label="Pais"
								:items="lstpais"
								item-text="descripcion"
								item-value="idpais"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.idpais = updateText(proveedores.idpais)"
								></v-autocomplete>
							</v-col>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="proveedores.idciudad"
								label="Ciudad"
								:items="lstciudades"
								item-text="descripcion"
								item-value="idciudad"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.idciudad = updateText(proveedores.idciudad)"
								></v-autocomplete>
							</v-col>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="proveedores.idmoneda"
								label="Moneda"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.idmoneda = updateText(proveedores.idmoneda)"
								></v-autocomplete>
							</v-col>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.contacto"
											label="Contacto"
											hint="Ingrese Contacto"
											placeholder="Contacto"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="proveedores.contacto = updateText(proveedores.contacto)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.telefonos"
											label="Telefonos"
											hint="Ingrese Telefonos"
											placeholder="Telefonos"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="proveedores.telefonos = updateText(proveedores.telefonos)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.fax"
											label="Fax"
											hint="Ingrese Fax"
											placeholder="Fax"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="proveedores.fax = updateText(proveedores.fax)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.cuenta"
											label="Cuenta"
											hint="Ingrese Cuenta"
											placeholder="Cuenta"
											clearable
											persistent-hint
											required
											:rules="cuentasrules"
											@input="proveedores.cuenta = updateText(proveedores.cuenta)">
								</v-text-field>
							</v-flex>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="proveedores.idtipoproveedor"
								label="Tipo de proveedor"
								:items="lsttiposproveedor"
								item-text="descripcion"
								item-value="idtipoproveedor"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.idtipoproveedor = updateText(proveedores.idtipoproveedor)"
								></v-autocomplete>
							</v-col>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechacreacion"
										v-model="menu_fechacreacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="proveedores.fechacreacion"
											label="Ingrese fecha de creacion"
											hint="Ingrese fecha de creacion"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="proveedores.fechacreacion" no-title @input="menu_fechacreacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="proveedores.codaduana"
											label="Codigo de Aduana"
											hint="Ingrese Codigo de Aduana"
											placeholder="Codigo de Aduana"
											clearable
											persistent-hint
											required
											:rules="validacion"
											>
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activo" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./Proveedores.ts"></script>
