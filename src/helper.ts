import $store from '@/store';
import * as services from '@/services';

export default class Filter {
    private descFilter: any;
    public showDataDescription(idItem: any, lstData: any, nombreIdItemArray: string, nombreCampoRetorno: string) {
        this.descFilter = lstData.filter(
        (data: any) => data[nombreIdItemArray] === idItem,
        );
        return this.descFilter[0][nombreCampoRetorno];
    }

    public RetornaListaMeses(){
		let objEne = new services.mes(1,"Enero");
		let objFeb = new services.mes(2,"Febrero");
		let objMar = new services.mes(3,"Marzo");
		let objAbr = new services.mes(4,"Abril");
		let objMay = new services.mes(5,"Mayo");
		let objJun = new services.mes(6,"Junio");
		let objJul = new services.mes(7,"Julio");
		let objAgo = new services.mes(8,"Agosto");
		let objSep = new services.mes(9,"Septiembre");
		let objOct = new services.mes(10,"Octubre");
		let objNov = new services.mes(11,"Noviembre");
		let objDic = new services.mes(12,"Diciembre");
		let lstMeses: services.mes[] = [];
		lstMeses.push(objEne);
		lstMeses.push(objFeb);
		lstMeses.push(objMar);
		lstMeses.push(objAbr);
		lstMeses.push(objMay);
		lstMeses.push(objJun);
		lstMeses.push(objJul);
		lstMeses.push(objAgo);
		lstMeses.push(objSep);
		lstMeses.push(objOct);
		lstMeses.push(objNov);
		lstMeses.push(objDic);

		return lstMeses;
	}
	public RetornaListaAnios(){
		let obj2020 = new services.anio(2020);
		let obj2021 = new services.anio(2021);
		let obj2022 = new services.anio(2022);
		let obj2023 = new services.anio(2023);
		let obj2024 = new services.anio(2024);
		let obj2025 = new services.anio(2025);
		let obj2026 = new services.anio(2026);
		let obj2027 = new services.anio(2027);
		let obj2028 = new services.anio(2028);
		let obj2029 = new services.anio(2029);
		let obj2030 = new services.anio(2030);
		let obj2031 = new services.anio(2031);
		let lstAnios: services.anio[] = [];
		lstAnios.push(obj2020);
		lstAnios.push(obj2021);
		lstAnios.push(obj2022);
		lstAnios.push(obj2023);
		lstAnios.push(obj2024);
		lstAnios.push(obj2025);
		lstAnios.push(obj2026);
		lstAnios.push(obj2027);
		lstAnios.push(obj2028);
		lstAnios.push(obj2029);
		lstAnios.push(obj2030);
		lstAnios.push(obj2031);

		return lstAnios;
	}  
}
