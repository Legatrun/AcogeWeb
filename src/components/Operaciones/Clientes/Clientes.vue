<template>

	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Clientes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarclientes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstclientesformateados" 
						:items-per-page="30"
						:search = "buscarclientes" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.codigocliente,lstClientes, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.codigocliente }}</td>
					<td>{{ props.item.codigoclienteprincipal }}</td>
					<td>{{ props.item.iddocumentoidentidad }}</td>
					<td>{{ props.item.numerodocumento }}</td>
					<td>{{ props.item.razonsocial }}</td>
					<td>{{ props.item.idpais }}</td>
					<td>{{ props.item.idciudad }}</td>
					<td>{{ props.item.idzona }}</td>
					<td>{{ props.item.idtipocliente }}</td>
					<td>{{ props.item.descripciondireccion }}</td>
					<td>{{ props.item.telefono }}</td>
					<td>{{ props.item.correoelectronico }}</td>
					<td>{{ props.item.casillacorreo }}</td>
					<td>{{ props.item.cuentacontable }}</td>
					<td>{{ props.item.cuentacontableanticipos }}</td>
					<td>{{ FormatBoolean(props.item.activo) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro del Cliente</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro del Cliente</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Clientes</v-btn>
					</template>
					<span>Adicionar nuevo registro de cliente</span>
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
					<v-toolbar-title>Datos de Clientes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="clientes.codigocliente"
												label="CodigoCliente"
												hint="Ingrese CodigoCliente"
												placeholder="CodigoCliente"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="clientes.codigocliente = updateText(clientes.codigocliente)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="clientes.codigocliente"
												label="CodigoCliente"
												placeholder="CodigoCliente"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.codigoclienteprincipal"
											label="CodigoClientePrincipal"
											hint="Ingrese CodigoClientePrincipal"
											placeholder="CodigoClientePrincipal"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.codigoclienteprincipal = updateText(clientes.codigoclienteprincipal)">
								</v-text-field>
							</v-flex>
							
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.iddocumentoidentidad"
								label="Documento de Identidad"
								:items="lsttipodocumentosidentidad"
								item-text="descripcion"
								item-value="iddocumentoidentidad"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.iddocumentoidentidad = updateText(clientes.iddocumentoidentidad)"
								></v-autocomplete>
							</v-col>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.numerodocumento"
											label="NumeroDocumento"
											hint="Ingrese NumeroDocumento"
											placeholder="NumeroDocumento"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.numerodocumento = updateText(clientes.numerodocumento)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.razonsocial"
											label="RazonSocial"
											hint="Ingrese RazonSocial"
											placeholder="RazonSocial"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.razonsocial = updateText(clientes.razonsocial)">
								</v-text-field>
							</v-flex>
							
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.idpais"
								label="Pais"
								:items="lstpais"
								item-text="descripcion"
								item-value="idpais"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.idpais = updateText(clientes.idpais)"
								></v-autocomplete>
							</v-col>
						
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.idciudad"
								label="Ciudad"
								:items="lstciudades"
								item-text="descripcion"
								item-value="idciudad"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.idciudad = updateText(clientes.idciudad)"
								></v-autocomplete>
							</v-col>
							
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.idzona"
								label="Zona"
								:items="lstzonas"
								item-text="descripcion"
								item-value="idzona"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.idzona = updateText(clientes.idzona)"
								></v-autocomplete>
							</v-col>
							
								<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.idtipocliente"
								label="Tipo Cliente"
								:items="lsttiposcliente"
								item-text="descripcion"
								item-value="idtipocliente"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.idtipocliente = updateText(clientes.idtipocliente)"
								></v-autocomplete>
							</v-col>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.descripciondireccion"
											label="DescripcionDireccion"
											hint="Ingrese DescripcionDireccion"
											placeholder="DescripcionDireccion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.descripciondireccion = updateText(clientes.descripciondireccion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.telefono"
											label="Telefono"
											hint="Ingrese Telefono"
											placeholder="Telefono"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.telefono = updateText(clientes.telefono)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.correoelectronico"
											label="CorreoElectronico"
											hint="Ingrese CorreoElectronico"
											placeholder="CorreoElectronico"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.correoelectronico = updateText(clientes.correoelectronico)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.casillacorreo"
											label="CasillaCorreo"
											hint="Ingrese CasillaCorreo"
											placeholder="CasillaCorreo"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.casillacorreo = updateText(clientes.casillacorreo)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.cuentacontable"
											label="CuentaContable"
											hint="Ingrese CuentaContable"
											placeholder="CuentaContable"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.cuentacontable = updateText(clientes.cuentacontable)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="clientes.cuentacontableanticipos"
											label="CuentaContableAnticipos"
											hint="Ingrese CuentaContableAnticipos"
											placeholder="CuentaContableAnticipos"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="clientes.cuentacontableanticipos = updateText(clientes.cuentacontableanticipos)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Activo:</h4>
								<v-switch v-model="clientes.activo"
									color="indigo"
									hint="Seleccione Activo"
									label="clientes.Activo"></v-switch>
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

<script src="./Clientes.ts"></script>
