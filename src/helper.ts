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
}
