<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Tipos de Cambio</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscartiposdecambio"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttiposdecambio" 
						:items-per-page="30"
						:search = "buscartiposdecambio" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.fecha,lstTiposdeCambio, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ FormatDate(props.item.fecha) }}</td>
					<td>{{ formatearMoneda(props.item.idmonedaorigen) }}</td>
					<td>{{ formatearMoneda(props.item.idmonedadestino) }}</td>
					<td>{{ props.item.cotizacionoficial }}</td>
					<td>{{ props.item.cotizacioncompra }}</td>
					<td>{{ props.item.cotizacionventa }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro</span>
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
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Añadir Tipo de Cambio</v-btn>
					</template>
					<span>Adicionar nuevo registro</span>
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
					<v-toolbar-title>Datos de TiposdeCambio</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<!-- v-if="operacion == 'Insert'" -->
							<template >
								<v-flex sm6 class="hidden-xs-only" style="padding: 5px">
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
												v-model="tiposdecambio.fecha"
												label="Fecha de creacion"
												prepend-icon="event"
												v-on="on">
											</v-text-field>
										</template>
										<v-date-picker v-model="tiposdecambio.fecha" no-title @input="menu_fechacreacion = false"></v-date-picker>
									</v-menu>
								</v-flex>
								<!-- <v-flex sm6 style="padding: 5px">
									<v-text-field v-model="tiposdecambio.fecha"
												label="Fecha"
												clearable
												required
												@input="tiposdecambio.fecha = updateText(tiposdecambio.fecha)">
									</v-text-field>
								</v-flex> -->
							</template>
							<!-- <template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="tiposdecambio.fecha"
												label="Fecha"
												readonly
												>
									</v-text-field>
								</v-flex>
							</template> -->
							<v-flex sm6 style="padding: 5px">
								<!-- <v-text-field v-model="tiposdecambio.idmonedaorigen"
											label="Moneda de Origen"
											clearable
											persistent-hint
											required
											@input="tiposdecambio.idmonedaorigen = updateText(tiposdecambio.idmonedaorigen)">
								</v-text-field> -->
								<v-autocomplete
								v-model="tiposdecambio.idmonedaorigen"
								label="Moneda de origen"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="proveedores.idmoneda = updateText(proveedores.idmoneda)"
								></v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<!-- <v-text-field v-model="tiposdecambio.idmonedadestino"
											label="Moneda Destino"
											clearable
											persistent-hint
											required
											@input="tiposdecambio.idmonedadestino = updateText(tiposdecambio.idmonedadestino)">
								</v-text-field> -->
								<v-autocomplete
								v-model="tiposdecambio.idmonedadestino"
								label="Moneda de destino"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="tiposdecambio.idmonedadestino = updateText(tiposdecambio.idmonedadestino)"
								></v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposdecambio.cotizacionoficial"
											label="Cotizacion Oficial"
											clearable
											persistent-hint
											required
											@input="tiposdecambio.cotizacionoficial = updateText(tiposdecambio.cotizacionoficial)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposdecambio.cotizacioncompra"
											label="Cotizacion Compra"
											clearable
											persistent-hint
											required
											@input="tiposdecambio.cotizacioncompra = updateText(tiposdecambio.cotizacioncompra)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposdecambio.cotizacionventa"
											label="Cotizacion Venta"
											clearable
											persistent-hint
											required
											@input="tiposdecambio.cotizacionventa = updateText(tiposdecambio.cotizacionventa)">
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./TiposdeCambio.ts"></script>
