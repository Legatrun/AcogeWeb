<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Sucursales</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarsucursales"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstSucursalesFormat" 
						:items-per-page="30"
						:search = "buscarsucursales" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.idsucursal,lstSucursales, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!-- <td>{{ props.item.idsucursal }}</td> -->
					<td>{{ props.item.idempresa }}</td>
					<td>{{ props.item.idzona }}</td>
					<td>{{ props.item.nombre }}</td>
					<td>{{ props.item.direccion }}</td>
					<td>{{ props.item.numero }}</td>
					<td>{{ props.item.telefonos }}</td>
					<td>{{ props.item.email }}</td>
					<td>{{ props.item.codigopostal }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Sucursal</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Sucursal</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Sucursales</v-btn>
					</template>
					<span>Adicionar nuevo registro de Sucursal</span>
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
					<v-toolbar-title>Datos de Sucursales</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="sucursales.idsucursal"
												label="IDSucursal"
												hint="Ingrese IDSucursal"
												placeholder="IDSucursal"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="sucursales.idsucursal = updateText(sucursales.idsucursal)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="sucursales.idsucursal"
												label="IDSucursal"
												placeholder="IDSucursal"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.nombre"
											label="Nombre"
											hint="Ingrese Nombre"
											placeholder="Nombre"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="sucursales.nombre = updateText(sucursales.nombre)">
								</v-text-field>
							</v-flex>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="sucursales.idempresa"
								label="Empresa"
								:items="lstempresa"
								item-text="descripcion"
								item-value="idempresa"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="sucursales.idzona"
								label="Zona"
								:items="lstzonas"
								item-text="descripcion"
								item-value="idzona"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="sucursales.idzona = updateText(sucursales.idzona)"
								></v-autocomplete>
							</v-col>
							
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.direccion"
											label="Direccion"
											hint="Ingrese Direccion"
											placeholder="Direccion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="sucursales.direccion = updateText(sucursales.direccion)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.numero"
											label="Numero"
											hint="Ingrese Numero"
											placeholder="Numero"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="sucursales.numero = updateText(sucursales.numero)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.telefonos"
											label="Telefonos"
											hint="Ingrese Telefonos"
											placeholder="Telefonos"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="sucursales.telefonos = updateText(sucursales.telefonos)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.email"
											label="Email"
											hint="Ingrese Email"
											placeholder="Email"
											clearable
											persistent-hint
											required
											:rules="correosRules"
											>
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="sucursales.codigopostal"
											label="Codigo de Postal"
											hint="Ingrese Codigo de Postal"
											placeholder="Codigo de Postal"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="sucursales.codigopostal = updateText(sucursales.codigopostal)">
								</v-text-field>
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

<script src="./Sucursales.ts"></script>
