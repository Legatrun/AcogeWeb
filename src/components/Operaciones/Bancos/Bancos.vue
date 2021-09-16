<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Bancos</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarbancos"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstbancosormateados" 
						:items-per-page="30"
						:search = "buscarbancos" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.idbanco,lstBancos, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!-- <td>{{ props.item.idbanco }}</td> -->
					<td>{{ props.item.nit }}</td>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ FormatBoolean(props.item.bancopropio) }}</td>
					<td>{{ props.item.idpais }}</td>
					<td>{{ props.item.idciudad }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Banco</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de banco</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Añadir Bancos</v-btn>
					
					</template>
					<span>Adicionar nuevo registro de Banco</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newPais()">Añadir Pais</v-btn>
					</template>
					<span>Adicionar nuevo registro de Pais</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newCiudad()">Añadir Ciudad</v-btn>
					</template>
					<span>Adicionar nuevo registro de Ciudad</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn color="botonActualizarTabla" dark fab small v-on="on" @click="cargar_data()"><v-icon>update</v-icon></v-btn>
			</template>
			<span>Actualizar Tabla</span>
		</v-tooltip>
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Bancos</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
							<!--	<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="bancos.idbanco"
												label="IDBanco"
												hint="Ingrese IDBanco"
												placeholder="IDBanco"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="bancos.idbanco = updateText(bancos.idbanco)">
									</v-text-field>
								</v-flex>-->
							</template>
							<template v-else>
								<!--<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="bancos.idbanco"
												label="IDBanco"
												placeholder="IDBanco"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>-->
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="bancos.nit"
											label="NIT"
											clearable
											persistent-hint
											required
											maxlength="10"
											counter
											:rules="validacionNIT">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="bancos.descripcion"
											label="Descripcion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="bancos.descripcion = updateText(bancos.descripcion)">
								</v-text-field>
							</v-flex>
							
							<v-col cols="6" sm="4" class="pa-2">
								<v-autocomplete
								v-model="bancos.idpais"
								label="Pais"
								:items="lstpais"
								item-text="descripcion"
								item-value="idpais"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@change="cargarCiudad()"
								></v-autocomplete>
							</v-col>
							<v-col cols="6" sm="4" class="pa-2">
								<v-autocomplete
								v-model="bancos.idciudad"
								label="Ciudad"
								:items="lstciudades"
								item-text="descripcion"
								item-value="idciudad"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
							<v-flex sm12 style="padding: 5px">
								<v-col cols="7" sm="5">
									<p class="text-sm-left"><b>Banco Propio: </b></p>
									<v-switch
									v-model="BancoPropio"
									color="success"
									:label="`Estado: ${BancoPropio ? 'Si' : 'No'}`"
									>

									</v-switch>
									</v-col>
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

<script src="./Bancos.ts"></script>
