import axios from 'axios'

export class AutoMovilServices{
baseUrl = "https://springbootback2.herokuapp.com/";


getAllAutoMovil(){
    return axios.get(this.baseUrl+"allAutoMovil2").then(res=> res.data);
}

getAllTipoAutoMovil(){

    return axios.get(this.baseUrl+"allTipoVehiculo").then(res=> res.data);

}

getVehiculoById(id){
    return axios.get(this.baseUrl+"updateVehiculo/"+id).then(res=> res.data);
}

saveAutoMovil(autoMovil){
return axios.post(this.baseUrl+"saveAutoMovil",autoMovil).then(res=> res.data);
}

deleteeAutoMovil(id){
    return axios.get(this.baseUrl+"/deleteAuto/"+id).then(res=> res.data);
}



}