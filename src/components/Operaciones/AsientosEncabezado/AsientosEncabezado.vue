<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Encabezados de Asiento</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarasientosencabezado"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstasientosencabezado" 
						:items-per-page="30"
						:search = "buscarasientosencabezado" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.numerocomprobante,lstAsientosEncabezado, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.numerocomprobante }}</td>
					<td>{{ FormatDate(props.item.fecha) }}</td>
					<td>{{ props.item.referencia }}</td>
					<td>{{ props.item.glosa }}</td>
					<td>{{ props.item.cotizacion }}</td>
					<td>{{ props.item.codigomodulo }}</td>
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
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Crear</v-btn>
					</template>
					<span>Crear nuevo encabezado de asiento</span>
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
					<v-toolbar-title>Datos de Encabezados de Asiento</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosencabezado.idtipocomprobante"
												label="IDTipoComprobante"
												hint="Ingrese IDTipoComprobante"
												placeholder="IDTipoComprobante"
												clearable
												persistent-hint
												required
												@input="asientosencabezado.idtipocomprobante = updateText(asientosencabezado.idtipocomprobante)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosencabezado.numerocomprobante"
												label="NumeroComprobante"
												hint="Ingrese NumeroComprobante"
												placeholder="NumeroComprobante"
												clearable
												persistent-hint
												required
												@input="asientosencabezado.numerocomprobante = updateText(asientosencabezado.numerocomprobante)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosencabezado.idtipocomprobante"
												label="IDTipoComprobante"
												placeholder="IDTipoComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosencabezado.numerocomprobante"
												label="NumeroComprobante"
												placeholder="NumeroComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fecha"
										v-model="menu_fecha"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="asientosencabezado.fecha"
											label="Ingrese fecha"
											hint="Ingrese fecha"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="asientosencabezado.fecha" no-title @input="menu_fecha = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosencabezado.referencia"
											label="Referencia"
											hint="Ingrese Referencia"
											placeholder="Referencia"
											clearable
											persistent-hint
											required
											@input="asientosencabezado.referencia = updateText(asientosencabezado.referencia)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosencabezado.glosa"
											label="Glosa"
											hint="Ingrese Glosa"
											placeholder="Glosa"
											clearable
											persistent-hint
											required
											@input="asientosencabezado.glosa = updateText(asientosencabezado.glosa)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosencabezado.cotizacion"
											label="Cotizacion"
											hint="Ingrese Cotizacion"
											placeholder="Cotizacion"
											clearable
											persistent-hint
											required
											@input="asientosencabezado.cotizacion = updateText(asientosencabezado.cotizacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosencabezado.codigomodulo"
											label="CodigoModulo"
											hint="Ingrese CodigoModulo"
											placeholder="CodigoModulo"
											clearable
											persistent-hint
											required
											@input="asientosencabezado.codigomodulo = updateText(asientosencabezado.codigomodulo)">
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

<script src="./AsientosEncabezado.ts"></script>
