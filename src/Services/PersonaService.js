import axios from 'axios'

export class PersonaServices{
baseUrl = "https://springbootback2.herokuapp.com/";


getAll(){

    return axios.get(this.baseUrl+"all").then(res=> res.data);

}
save(persona){
return axios.post(this.baseUrl+"save",persona).then(res=> res.data);
}

}