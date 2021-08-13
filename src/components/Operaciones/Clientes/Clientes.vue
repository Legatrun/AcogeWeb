

<template>

	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>CLIENTES</v-toolbar-title>
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
					<!-- <td>{{ props.item.codigocliente }}</td>
					<td>{{ props.item.codigoclienteprincipal }}</td>
					<td>{{ props.item.iddocumentoidentidad }}</td> -->
					<td>{{ props.item.numerodocumento }}</td>
					<td>{{ props.item.razonsocial }}</td>
					<td>{{ props.item.idpais }}</td>
					<td>{{ props.item.idciudad }}</td>
					<td>{{ props.item.idzona }}</td>
					<td>{{ props.item.idtipocliente }}</td>
					<td>{{ props.item.descripciondireccion }}</td>
					<!-- <td>{{ props.item.telefono }}</td>
					<td>{{ props.item.correoelectronico }}</td> -->
					<!-- <td>{{ props.item.casillacorreo }}</td>
					<td>{{ props.item.cuentacontable }}</td> -->
					<!-- <td>{{ props.item.cuentacontableanticipos }}</td> -->
					<!-- <td>{{ FormatBoolean(props.item.activo) }}</td> -->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Cliente</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Cliente</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Crear Cliente</v-btn>
					</template>
					<span>Adicionar Cliente</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newPais()">Añadir Pais</v-btn>
					</template>
					<span>Adicionar Pais</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newCiudad()">Añadir Ciudad</v-btn>
					</template>
					<span>Adicionar Ciudad</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newZona()">Añadir Zona</v-btn>
					</template>
					<span>Adicionar Zona</span>
				</v-tooltip>
				<!-- <v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="gray" v-on="on" @click="newTipocliente()">Adicionar Nuevo Registro de Tipo Cliente</v-btn>
					</template>
					<span>Adicionar nuevo registro de cliente</span>
				</v-tooltip> -->
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" persistent max-width="70%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Cliente</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm4 style="padding: 5px">
									<v-text-field v-model="clientes.codigocliente"
												label="Código de Cliente"
												hint="Alfanumérico"
												clearable
												persistent-hint
												required
												outlined
												:rules="ValCodClie"
												counter
												maxlength="10"
												@input="clientes.codigocliente = updateText(clientes.codigocliente)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm4 style="padding: 5px">
									<v-text-field v-model="clientes.codigocliente"
												label="Código de Cliente"
												hint="Solo lectura"
												outlined
												disabled
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="clientes.codigoclienteprincipal"
								label="Código Cliente Principal"
								:items="lstclientes"
								item-text="codigoclienteprincipal"
								item-value="codigoclienteprincipal"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
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
								></v-autocomplete>
							</v-col>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="clientes.numerodocumento"
											label="Número de Documento"
											hint="Alfanumérico. Ej: 1087393 LP"
											clearable
											persistent-hint
											required
											:rules="ValNumDoc"
											counter
											outlined
											maxlength="15"
											type="number"
											@input="clientes.numerodocumento = updateText(clientes.numerodocumento)">
								</v-text-field>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="clientes.razonsocial"
											label="Razon Social"
											hint="Nombre de la Empresa"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											outlined
											maxlength="100"
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
								:item-text="getItemciudad"
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
								:item-text="getItemZonas"
								item-value="idzona"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="clientes.idzona = updateText(clientes.idzona)"
								></v-autocomplete>
							</v-col>
							<v-flex sm6 style="padding: 5px">
								<v-textarea v-model="clientes.descripciondireccion"
											label="Dirección"
											hint="Avenida/Calle/Pasaje/Número"
											outlined
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="70"
											@input="clientes.descripciondireccion = updateText(clientes.descripciondireccion)">
								</v-textarea>
							</v-flex>
							<v-col cols="5" sm="6" class="pa-2">
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
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="clientes.telefono"
											label="Telefono"
											hint="Teléfono fijo o Celular"
											clearable
											persistent-hint
											required
											outlined
											:rules="ValTel"
											@input="clientes.telefono = updateText(clientes.telefono)"
											counter
											maxlength="15"
											>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="clientes.correoelectronico"
											label="Correo Electrónico"
											hint="Ej: ejemplo@ejemplo.com"
											clearable
											persistent-hint
											required
											outlined
											:rules="correosRules"
											counter
											maxlength="30"
										>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="clientes.casillacorreo"
											label="Casilla de Correo"
											hint="Número de Casilla"
											clearable
											persistent-hint
											required
											outlined
											:rules="correosCasilla"
											counter
											maxlength="10"
											@input="clientes.casillacorreo = updateText(clientes.casillacorreo)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="clientes.cuentacontable"
											label="Cuenta Contable"
											hint=""
											clearable
											persistent-hint
											required
											outlined
											:rules="VaCuenta"
											counter
											maxlength="20"
											@input="clientes.cuentacontable = updateText(clientes.cuentacontable)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="clientes.cuentacontableanticipos"
											label="Cuenta Contable Anticipos"
											hint=""
											clearable
											persistent-hint
											required
											outlined
											:rules="VaCuenta"
											counter
											maxlength="20"
											@input="clientes.cuentacontableanticipos = updateText(clientes.cuentacontableanticipos)">
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

<script src="./Clientes.ts"></script>
