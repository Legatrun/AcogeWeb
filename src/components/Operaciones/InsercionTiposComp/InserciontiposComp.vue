<template>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Creación de Tipo Comprobante
      </v-stepper-step>

      <v-divider></v-divider>
            <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Creación de Correlativo tipo Comprobante
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
			 <v-toolbar style="padding:10px" dark class="primary">
				<v-toolbar-title>Datos de Tipos de Comprobantes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<!--<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="tiposcomprobantes.idtipocomprobante"
												label="IDTipoComprobante"
												hint="Ingrese IDTipoComprobante"
												placeholder="IDTipoComprobante"
												clearable
												persistent-hint
												required
												@input="tiposcomprobantes.idtipocomprobante = updateText(tiposcomprobantes.idtipocomprobante)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="tiposcomprobantes.idtipocomprobante"
												label="IDTipoComprobante"
												placeholder="IDTipoComprobante"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>-->
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
							<v-col cols="6" sm="6" class="pa-2">
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
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Automatico:</h4>
								<v-switch v-model="tiposcomprobantes.automatico"
									color="success"
									:label="`Estado: ${tiposcomprobantes.automatico ? 'Si' : 'No'}`"
									>
								</v-switch>
							</v-flex>
							<!-- <v-flex sm4 style="padding: 5px">
								<v-col cols="7" sm="5">
									<p class="text-sm-left"><b>Automatico: </b></p>
									<v-switch 
										v-model="claseitems.ingresainventario"
										color="success"
										:label="`Estado: ${claseitems.ingresainventario ? 'Si' : 'No'}`">
									</v-switch>
								</v-col>
							</v-flex> -->
							
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="GrabarTipoComp()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
      </v-stepper-content>

<v-stepper-content step="2">

           <v-card>
				<v-toolbar style="padding:10px" dark class="primary">
				<v-toolbar-title>Datos de Correlativos Tipos Comprobantes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-col cols="6" sm="6" class="pa-2">
								<v-autocomplete
								v-model="correlativostiposcomprobantes.idtipocomprobante"
								label="Tipo Comprobante"
								:items="lsttiposcomprobantes"
								item-text="descripcion"
								item-value="idtipocomprobante"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="correlativostiposcomprobantes.anio"
												label="Año"
												clearable
												persistent-hint
												required
												@input="correlativostiposcomprobantes.anio = updateText(correlativostiposcomprobantes.anio)">
									</v-text-field>
								</v-flex>
							<v-col cols="5" sm="6" class="pa-2">	
										<v-autocomplete v-model="correlativostiposcomprobantes.mes"
												:rules="validacion"
												:items="lstMeses"
												label="Mes"
												outlined
												autocomplete="off"
												color="#1A237E">
										</v-autocomplete>
							</v-col>
							</template>
							<template v-else>
								<v-col cols="6" sm="6" class="pa-2">
								<v-autocomplete
								v-model="correlativostiposcomprobantes.idtipocomprobante"
								label="Tipo Comprobante"
								:items="lsttiposcomprobantes"
								item-text="descripcion"
								item-value="idtipocomprobante"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								></v-autocomplete>
							</v-col>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model.number="correlativostiposcomprobantes.anio"
												label="Año"
												persistent-hint
												type="number"
												counter
												maxlength="4"
												clearable
												outlined
												>
									</v-text-field>
								</v-flex>

							
								<!-- <v-col cols="5" sm="6" class="pa-2">	
										<v-autocomplete v-model="correlativostiposcomprobantes.mes"
												:rules="validacion"
												:items="lstMeses"
												label="Mes"
												outlined
												autocomplete="off"
												color="#1A237E">
										</v-autocomplete>
								</v-col> -->
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="correlativostiposcomprobantes.correlativo"
											label="Correlativo"
											clearable
											persistent-hint
											required
											@input="correlativostiposcomprobantes.correlativo = updateText(correlativostiposcomprobantes.correlativo)">
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="GrabarCorrelativos()">Grabar</v-btn>
					
				</v-card-actions>
			</v-card>
       
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script src="./InserciontiposComp.ts"></script>
