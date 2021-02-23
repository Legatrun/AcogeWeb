<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Cajas</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarcajas"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstcajasformateados" 
						:items-per-page="30"
						:search = "buscarcajas" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.idcaja,lstCajas, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.idcaja }}</td>
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.cuenta }}</td>
					<td>{{ props.item.monto }}</td>
					<td>{{ props.item.idmoneda }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Caja</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Caja</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Cajas</v-btn>
					</template>
					<span>Adicionar nuevo registro de Caja</span>
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
					<v-toolbar-title>Datos de Cajas</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<!--<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cajas.idcaja"
												label="IDCaja"
												hint="Ingrese IDCaja"
												placeholder="IDCaja"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="cajas.idcaja = updateText(cajas.idcaja)">
									</v-text-field>
								</v-flex>-->
							</template>
							<template v-else>
							<!--	<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cajas.idcaja"
												label="IDCaja"
												placeholder="IDCaja"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>-->
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cajas.descripcion"
											label="Descripcion"
											hint="Ingrese Descripcion"
											placeholder="Descripcion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cajas.descripcion = updateText(cajas.descripcion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cajas.cuenta"
											label="Cuenta"
											hint="Ingrese Cuenta"
											placeholder="Cuenta"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cajas.cuenta = updateText(cajas.cuenta)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cajas.monto"
											label="Monto"
											hint="Ingrese Monto"
											placeholder="Monto"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cajas.monto = updateText(cajas.monto)">
								</v-text-field>
							</v-flex>
							<v-col cols="5" sm="4" class="pa-2">
								<v-autocomplete
								v-model="cajas.idmoneda"
								label="Moneda"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="cajas.idmoneda = updateText(cajas.idmoneda)"
								></v-autocomplete>
							</v-col>
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

<script src="./Cajas.ts"></script>
