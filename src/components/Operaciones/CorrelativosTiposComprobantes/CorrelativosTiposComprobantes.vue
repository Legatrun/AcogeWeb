<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de CorrelativosTiposComprobantes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarcorrelativostiposcomprobantes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstcorrelativostiposcomprobantesFormat" 
						:items-per-page="30"
						:search = "buscarcorrelativostiposcomprobantes" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!-- <td>{{ props.item.idtipocomprobante }}</td> -->
					<td>{{ props.item.anio }}</td>
					<td>{{ props.item.mes }}</td>
					<td>{{ props.item.correlativo }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro </span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Añadir Correlativo de Tipo de omprobante</v-btn>
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
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn color="botonActualizarTabla" dark fab small v-on="on" @click="cargar_data()"><v-icon>update</v-icon></v-btn>
			</template>
			<span>Actualizar Tabla</span>
		</v-tooltip>
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de CorrelativosTiposComprobantes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.idtipocomprobante"
												label="IDTipoComprobante"
												hint="Ingrese IDTipoComprobante"
												placeholder="IDTipoComprobante"
												clearable
												persistent-hint
												required
												@input="correlativostiposcomprobantes.idtipocomprobante = updateText(correlativostiposcomprobantes.idtipocomprobante)">
									</v-text-field>
								</v-flex> -->
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.anio"
												label="Año"
												clearable
												persistent-hint
												required
												@input="correlativostiposcomprobantes.anio = updateText(correlativostiposcomprobantes.anio)">
									</v-text-field>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="correlativostiposcomprobantes.mes"
												label="Mes"
												:items="lstMeses"
												item-text="nombre"
												item-value="numero"
												clearable
												outlined
												required
												@input="correlativostiposcomprobantes.mes = updateText(correlativostiposcomprobantes.mes)">
									</v-autocomplete>
								</v-flex>
							</template>
							<template v-else>
								<!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.idtipocomprobante"
												label="IDTipoComprobante"
												placeholder="IDTipoComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex> -->
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.anio"
												label="Año"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.mes"
												label="Mes"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="correlativostiposcomprobantes.correlativo"
											label="Correlativo"
											clearable
											required
											@input="correlativostiposcomprobantes.correlativo = updateText(correlativostiposcomprobantes.correlativo)">
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

<script src="./CorrelativosTiposComprobantes.ts"></script>
