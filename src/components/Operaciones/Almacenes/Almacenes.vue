<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>ALMACENES</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscaralmacenes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstalmacenes" 
						:items-per-page="30"
						:search = "buscaralmacenes" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.codigoalmacen }}</td>
					<td>{{ formatearTipoMovimiento(props.item.idtipomovimiento) }}</td>
					<td>{{ formatearCiudad(props.item.idciudad) }}</td>
					<td>{{ FormatBoolean(props.item.Virtual) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Almacén </span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Almacén </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">CREAR ALMACÉN</v-btn> 
					</template>
					<span>Adicionar Almacén</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newCiudad()">Añadir Ciudad</v-btn>
					</template>
					<span>Adicionar Ciudad</span>
				</v-tooltip>
				<v-spacer></v-spacer>
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
					<v-toolbar-title>Datos de Almacenes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm8 style="padding: 10px">
								<v-textarea v-model="almacenes.descripcion"
											label="Nombre del Almacén"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											outlined
											maxlength="70"
											@input="almacenes.descripcion = updateText(almacenes.descripcion)">
								</v-textarea>
							</v-flex>
							<template v-if="operacion == 'Insert'">
								<v-flex sm4 style="padding: 10px">
									<v-text-field v-model="almacenes.codigoalmacen"
												label="Código Almacén"
												hint="Alfanumérico"
												counter
												maxlength="5"
												clearable
												persistent-hint
												required
												outlined
												:rules="validacion"
												@input="almacenes.codigoalmacen = updateText(almacenes.codigoalmacen)">
												
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm4 style="padding: 10px">
									<v-text-field v-model="almacenes.codigoalmacen"
												label="Codigo Almacen"
												hint="Solo lectura"
												disabled
												outlined
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">	
										<v-autocomplete v-model="almacenes.idtipomovimiento"
												:rules="validacion"
												:items="lsttipomovimientoinventario"
												item-text="descripcion"
												item-value="idtipomovimiento"
												label="Tipo Movimiento"
												outlined
												autocomplete="off"
												color="#1A237E"
												@input="almacenes.idtipomovimiento = updateText(almacenes.idtipomovimiento)">
										</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">	
										<v-autocomplete v-model="almacenes.idciudad"
												:rules="validacion"
												:items="lstciudades"
												item-text="descripcion"
												item-value="idciudad"
												label="Ciudad"
												outlined
												autocomplete="off"
												color="#1A237E"
												@input="almacenes.idciudad = updateText(almacenes.idciudad)">
										</v-autocomplete>
							</v-flex>
								<v-flex sm12 style="padding: 5px">
								<h4 class="mb-0 ">Virtual:</h4>
								<v-switch v-model="almacenes.virtual"
									color="success"
                                    :label="`Estado: ${almacenes.virtual ? 'Si' : 'No Virtual'}`"
									></v-switch>
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

<script src="./Almacenes.ts"></script>
