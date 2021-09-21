<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Tipos de Comprobantes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscartiposcomprobantes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttiposcomprobanteformateados" 
						:items-per-page="30"
						:search = "buscartiposcomprobantes" 
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
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.sigla }}</td>
					<td>{{ FormatBoolean(props.item.automatico) }}</td>
					<td>{{ props.item.idsucursal }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Demo</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Demo</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Añadir Tipo de Comprobante</v-btn>
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
					<v-toolbar-title>Tipos de Comprobantes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="tiposcomprobantes.idtipocomprobante"
												label="Tipo Comprobante"
												clearable
												persistent-hint
												required
												@input="tiposcomprobantes.idtipocomprobante = updateText(tiposcomprobantes.idtipocomprobante)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="tiposcomprobantes.idtipocomprobante"
												label="Tipo Comprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposcomprobantes.descripcion"
											label="Descripcion"
											clearable
											persistent-hint
											required
											@input="tiposcomprobantes.descripcion = updateText(tiposcomprobantes.descripcion)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposcomprobantes.sigla"
											label="Sigla"
											clearable
											persistent-hint
											required
											@input="tiposcomprobantes.sigla = updateText(tiposcomprobantes.sigla)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Automatico:</h4>
								<v-switch v-model="tiposcomprobantes.automatico"
									color="indigo"
									:label="`Estado: ${tiposcomprobantes.automatico ? 'Si' : 'No'}`"
									>
									</v-switch>
							</v-flex>
							<!-- <v-flex sm6 style="padding: 5px">
								<v-text-field v-model="tiposcomprobantes.idsucursal"
											label="Sucursal"
											clearable
											persistent-hint
											required
											@input="tiposcomprobantes.idsucursal = updateText(tiposcomprobantes.idsucursal)">
								</v-text-field>
							</v-flex> -->
							<v-col cols="6" sm6 class="pa-5">
								<v-autocomplete
								v-model="tiposcomprobantes.idsucursal"
								label="Sucursal"
								:items="lstsucursales"
								item-text="nombre"
								item-value="idsucursal"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
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

<script src="./TiposComprobantes.ts"></script>
