<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de ClaseItems</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarclaseitems"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstclaseitems" 
						:items-per-page="30"
						:search = "buscarclaseitems" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.idclase,lstClaseItems, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.idclase }}</td>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.sigla }}</td>
					<td>{{ props.item.cuentaventa }}</td>
					<td>{{ props.item.cuentacosto }}</td>
					<td>{{ props.item.cuentagasto }}</td>
					<td>{{ props.item.cuentainventario }}</td>
					<td>{{ FormatBoolean(props.item.ingresainventario) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Clase Item</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Clase Item</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de ClaseItems</v-btn>
					</template>
					<span>Adicionar nuevo registro de Clase Item</span>
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
					<v-toolbar-title>Datos de ClaseItems</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="claseitems.idclase"
												label="IDClase"
												hint="Ingrese IDClase"
												placeholder="IDClase"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="claseitems.idclase = updateText(claseitems.idclase)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="claseitems.idclase"
												label="IDClase"
												placeholder="IDClase"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.descripcion"
											label="Descripcion"
											hint="Ingrese Descripcion"
											placeholder="Descripcion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.descripcion = updateText(claseitems.descripcion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.sigla"
											label="Sigla"
											hint="Ingrese Sigla"
											placeholder="Sigla"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.sigla = updateText(claseitems.sigla)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.cuentaventa"
											label="CuentaVenta"
											hint="Ingrese CuentaVenta"
											placeholder="CuentaVenta"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.cuentaventa = updateText(claseitems.cuentaventa)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.cuentacosto"
											label="CuentaCosto"
											hint="Ingrese CuentaCosto"
											placeholder="CuentaCosto"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.cuentacosto = updateText(claseitems.cuentacosto)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.cuentagasto"
											label="CuentaGasto"
											hint="Ingrese CuentaGasto"
											placeholder="CuentaGasto"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.cuentagasto = updateText(claseitems.cuentagasto)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="claseitems.cuentainventario"
											label="CuentaInventario"
											hint="Ingrese CuentaInventario"
											placeholder="CuentaInventario"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="claseitems.cuentainventario = updateText(claseitems.cuentainventario)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">IngresaInventario:</h4>
								<v-switch v-model="claseitems.ingresainventario"
									color="indigo"
									hint="Seleccione IngresaInventario"
									label="claseitems.IngresaInventario"></v-switch>
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

<script src="./ClaseItems.ts"></script>
