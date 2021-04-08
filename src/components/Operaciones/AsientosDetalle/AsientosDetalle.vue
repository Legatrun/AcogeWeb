<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de AsientosDetalle</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarasientosdetalle"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstasientosdetalle" 
						:items-per-page="30"
						:search = "buscarasientosdetalle" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.nrolinea,lstAsientosDetalle, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.idtipocomprobante }}</td>
					<td>{{ props.item.numerocomprobante }}</td>
					<td>{{ props.item.nrolinea }}</td>
					<td>{{ props.item.cuenta }}</td>
					<td>{{ props.item.glosadetalle }}</td>
					<td>{{ props.item.tipomov }}</td>
					<td>{{ props.item.montobs }}</td>
					<td>{{ props.item.montosus }}</td>
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
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de AsientosDetalle</v-btn>
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
					<v-toolbar-title>Datos de AsientosDetalle</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.idtipocomprobante"
												label="IDTipoComprobante"
												hint="Ingrese IDTipoComprobante"
												placeholder="IDTipoComprobante"
												clearable
												persistent-hint
												required
												@input="asientosdetalle.idtipocomprobante = updateText(asientosdetalle.idtipocomprobante)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.numerocomprobante"
												label="NumeroComprobante"
												hint="Ingrese NumeroComprobante"
												placeholder="NumeroComprobante"
												clearable
												persistent-hint
												required
												@input="asientosdetalle.numerocomprobante = updateText(asientosdetalle.numerocomprobante)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.nrolinea"
												label="NroLinea"
												hint="Ingrese NroLinea"
												placeholder="NroLinea"
												clearable
												persistent-hint
												required
												@input="asientosdetalle.nrolinea = updateText(asientosdetalle.nrolinea)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.idtipocomprobante"
												label="IDTipoComprobante"
												placeholder="IDTipoComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.numerocomprobante"
												label="NumeroComprobante"
												placeholder="NumeroComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="asientosdetalle.nrolinea"
												label="NroLinea"
												placeholder="NroLinea"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosdetalle.cuenta"
											label="Cuenta"
											hint="Ingrese Cuenta"
											placeholder="Cuenta"
											clearable
											persistent-hint
											required
											@input="asientosdetalle.cuenta = updateText(asientosdetalle.cuenta)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosdetalle.glosadetalle"
											label="GlosaDetalle"
											hint="Ingrese GlosaDetalle"
											placeholder="GlosaDetalle"
											clearable
											persistent-hint
											required
											@input="asientosdetalle.glosadetalle = updateText(asientosdetalle.glosadetalle)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosdetalle.tipomov"
											label="TipoMov"
											hint="Ingrese TipoMov"
											placeholder="TipoMov"
											clearable
											persistent-hint
											required
											@input="asientosdetalle.tipomov = updateText(asientosdetalle.tipomov)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosdetalle.montobs"
											label="MontoBs"
											hint="Ingrese MontoBs"
											placeholder="MontoBs"
											clearable
											persistent-hint
											required
											@input="asientosdetalle.montobs = updateText(asientosdetalle.montobs)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="asientosdetalle.montosus"
											label="MontoSus"
											hint="Ingrese MontoSus"
											placeholder="MontoSus"
											clearable
											persistent-hint
											required
											@input="asientosdetalle.montosus = updateText(asientosdetalle.montosus)">
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

<script src="./AsientosDetalle.ts"></script>
