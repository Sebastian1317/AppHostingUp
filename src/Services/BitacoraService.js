import axios from 'axios'

export class BitacoraService{
    baseUrl = "http://localhost:8089/";


    getAllBitacora(){
        return axios.get(this.baseUrl+"allBitacoras").then(res=> res.data);
    }
    
    getAllAutoMovil(){
    
        return axios.get(this.baseUrl+"allAutoMovilBit").then(res=> res.data);
    
    }
    
    getBitacoraById(id){
        return axios.get(this.baseUrl+"updateBitacora/"+id).then(res=> res.data);
    }
    
    saveBitacora(bitacora){
    return axios.post(this.baseUrl+"saveBitacora",bitacora).then(res=> res.data);
    }
    
    deleteBitacora(id){
        return axios.get(this.baseUrl+"deleteBitacora/"+id).then(res=> res.data);
    }



}
