<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Almacenes</v-toolbar-title>
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
					<!--<td>{{ helper.showDataDescription(props.item.codigoalmacen,lstAlmacenes, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.codigoalmacen }}</td>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.idtipomovimiento }}</td>
					<td>{{ props.item.idciudad }}</td>
					<td>{{ FormatBoolean(props.item.virtual) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Almacén</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Almacenes</v-btn>
					</template>
					<span>Adicionar nuevo registro de Almacén</span>
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
					<v-toolbar-title>Datos de Almacenes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="almacenes.codigoalmacen"
												label="CodigoAlmacen"
												hint="Ingrese CodigoAlmacen"
												placeholder="CodigoAlmacen"
												clearable
												persistent-hint
												required
												:rules="validacion"
												
												@input="almacenes.codigoalmacen = updateText(almacenes.codigoalmacen)">
												
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="almacenes.codigoalmacen"
												label="CodigoAlmacen"
												placeholder="CodigoAlmacen"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="almacenes.descripcion"
											label="Descripcion"
											hint="Ingrese Descripcion"
											placeholder="Descripcion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											
											@input="almacenes.descripcion = updateText(almacenes.descripcion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="almacenes.idtipomovimiento"
											label="IDTipoMovimiento"
											hint="Ingrese IDTipoMovimiento"
											placeholder="IDTipoMovimiento"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="almacenes.idtipomovimiento = updateText(almacenes.idtipomovimiento)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="almacenes.idciudad"
											label="IDCiudad"
											hint="Ingrese IDCiudad"
											placeholder="IDCiudad"
											clearable
											persistent-hint
											required
											:rules="validacion"
											
											@input="almacenes.idciudad = updateText(almacenes.idciudad)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Virtual:</h4>
								<v-switch v-model="almacenes.virtual"
									color="indigo"
									hint="Seleccione Virtual"
									label="almacenes.Virtual"></v-switch>
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
