import axios from 'axios'

export class PersonaServices{
baseUrl = "http://localhost:8089/";


getAll(){

    return axios.get(this.baseUrl+"all").then(res=> res.data);

}
save(persona){
return axios.post(this.baseUrl+"save",persona).then(res=> res.data);
}

}