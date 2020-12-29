<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Items</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscaritems"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstitems" 
						:items-per-page="30"
						:search = "buscaritems" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.codigoitem,lstItems, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.codigoitem }}</td>
					<td>{{ props.item.modelonroparte }}</td>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ FormatDate(props.item.fechacreacion) }}</td>
					<td>{{ FormatDate(props.item.fechaultimomovimiento) }}</td>
					<td>{{ props.item.costoinicial }}</td>
					<td>{{ props.item.costoactual }}</td>
					<td>{{ props.item.saldoinicial }}</td>
					<td>{{ props.item.saldoactual }}</td>
					<td>{{ props.item.idclase }}</td>
					<td>{{ props.item.idtipoitem }}</td>
					<td>{{ props.item.idunidadmanejo }}</td>
					<td>{{ props.item.codigoitemsup }}</td>
					<td>{{ props.item.cantidadminima }}</td>
					<td>{{ props.item.cantidadmaxima }}</td>
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
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Items</v-btn>
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
					<v-toolbar-title>Datos de Items</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="items.codigoitem"
												label="CodigoItem"
												hint="Ingrese CodigoItem"
												placeholder="CodigoItem"
												clearable
												persistent-hint
												required
												@input="items.codigoitem = updateText(items.codigoitem)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="items.codigoitem"
												label="CodigoItem"
												placeholder="CodigoItem"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.modelonroparte"
											label="ModeloNroParte"
											hint="Ingrese ModeloNroParte"
											placeholder="ModeloNroParte"
											clearable
											persistent-hint
											required
											@input="items.modelonroparte = updateText(items.modelonroparte)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.descripcion"
											label="Descripcion"
											hint="Ingrese Descripcion"
											placeholder="Descripcion"
											clearable
											persistent-hint
											required
											@input="items.descripcion = updateText(items.descripcion)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
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
											v-model="items.fechacreacion"
											label="Ingrese fechacreacion"
											hint="Ingrese fechacreacion"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="items.fechacreacion" no-title @input="menu_fechacreacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechaultimomovimiento"
										v-model="menu_fechaultimomovimiento"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="items.fechaultimomovimiento"
											label="Ingrese fechaultimomovimiento"
											hint="Ingrese fechaultimomovimiento"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="items.fechaultimomovimiento" no-title @input="menu_fechaultimomovimiento = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.costoinicial"
											label="CostoInicial"
											hint="Ingrese CostoInicial"
											placeholder="CostoInicial"
											clearable
											persistent-hint
											required
											@input="items.costoinicial = updateText(items.costoinicial)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.costoactual"
											label="CostoActual"
											hint="Ingrese CostoActual"
											placeholder="CostoActual"
											clearable
											persistent-hint
											required
											@input="items.costoactual = updateText(items.costoactual)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.saldoinicial"
											label="SaldoInicial"
											hint="Ingrese SaldoInicial"
											placeholder="SaldoInicial"
											clearable
											persistent-hint
											required
											@input="items.saldoinicial = updateText(items.saldoinicial)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.saldoactual"
											label="SaldoActual"
											hint="Ingrese SaldoActual"
											placeholder="SaldoActual"
											clearable
											persistent-hint
											required
											@input="items.saldoactual = updateText(items.saldoactual)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.idclase"
											label="IDClase"
											hint="Ingrese IDClase"
											placeholder="IDClase"
											clearable
											persistent-hint
											required
											@input="items.idclase = updateText(items.idclase)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.idtipoitem"
											label="IDTipoItem"
											hint="Ingrese IDTipoItem"
											placeholder="IDTipoItem"
											clearable
											persistent-hint
											required
											@input="items.idtipoitem = updateText(items.idtipoitem)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.idunidadmanejo"
											label="IDUnidadManejo"
											hint="Ingrese IDUnidadManejo"
											placeholder="IDUnidadManejo"
											clearable
											persistent-hint
											required
											@input="items.idunidadmanejo = updateText(items.idunidadmanejo)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.codigoitemsup"
											label="CodigoItemSup"
											hint="Ingrese CodigoItemSup"
											placeholder="CodigoItemSup"
											clearable
											persistent-hint
											required
											@input="items.codigoitemsup = updateText(items.codigoitemsup)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.cantidadminima"
											label="CantidadMinima"
											hint="Ingrese CantidadMinima"
											placeholder="CantidadMinima"
											clearable
											persistent-hint
											required
											@input="items.cantidadminima = updateText(items.cantidadminima)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="items.cantidadmaxima"
											label="CantidadMaxima"
											hint="Ingrese CantidadMaxima"
											placeholder="CantidadMaxima"
											clearable
											persistent-hint
											required
											@input="items.cantidadmaxima = updateText(items.cantidadmaxima)">
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

<script src="./Items.ts"></script>
