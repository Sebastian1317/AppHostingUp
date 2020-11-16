import React, { Component, Fragment } from 'react';
import './App.css';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { PersonaServices } from './Services/PersonaService'
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Growl} from 'primereact/growl';
import { AutoMovilServices } from './Services/AutoMovilService'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { browserHistory } from 'react-router';

import { AppAutoMovilForm } from './App/AppAutoMovilForm';
import { withRouter } from 'react-router-dom';

export default class App extends Component {

  constructor() {
    super();
   
    this.state = {
      visible:false,
      autoMovil1: {
            idVehiculo: '',
            strNumEconomico: '',
            dtFechaIngreso: '',
            numSerie: '',
            numMotor: '',
            strCapacidadVehicular: '',
            strColor: '',
            anio: '',
            precioCompra: '',
            propietario: '',
            numLlantas: '',
            strMedida: '',
            strCombustible: '',
            dceKmlitros: '',
            capacidadCombustible: '',
            dceRendimiento: '',
            placas: '',
            idTipoVehiculo: {
                idTipoVehiculo:'',
                strValor:''
            }
        
      },
      autMovil:{},
      selectedAuto:{
         idVehiculo:''
      },
      tipoVehiculo : [{
          idTipoVehiculo:'',
          strValor:''
      }],
      autoMoviles:[]
   
    };
    this.items = [{
      label:'Vehiculos',
      icon:'pi pi-fw pi-file',
      command:()=> {this.RedireccionarVehiculos()}
    },
    {
       label:'Bitacoras',
       icon:'pi pi-fw pi-pencil',
       command:()=> {this.RedireccionarBitacoras()}
    },
    {
       label:'Users',
       icon:'pi pi-fw pi-user',
       
    }, 
    ];
    this.items2 = [{
        label:'Nuevo',
         icon:'pi pi-fw pi-file',
         command:()=> {this.showDismiss()}
      },
      {
         label:'Editar',
         icon:'pi pi-fw pi-pencil',
         command:()=> {this.updateMovil()}
      },
      {
         label:'Eliminar',
         icon:'pi pi-fw pi-user',
         command:()=> {this.deleteAutomovil()}
      }, 
      ];
   
    this.autoMovilService = new AutoMovilServices();
    this.SaveAutoMovil= this.SaveAutoMovil.bind(this);
    this.deleteAutomovil= this.deleteAutomovil.bind(this);
    this.updateMovil=this.updateMovil.bind(this);
    this.showDismiss=this.showDismiss.bind(this);
    this.RedireccionarVehiculos=this.RedireccionarVehiculos.bind(this);
    this.RedireccionarBitacoras=this.RedireccionarBitacoras.bind(this);
    this.end=(
        <div>
            <li>
                <a href='/Auto'></a>
            </li>
        </div>
    )
    this.footer=(
      <div>
        <Button label="Eliminar" type="submit" className="p-button-raised p-button-rounded" onClick={this.deleteAutomovil}/>
        <Button label="Actualizar" type="submit" className="p-button-raised p-button-rounded" onClick={this.updateMovil}/>  
      </div>
    );
   this.footer2=(
       <div>
       <Button label="Agregar" className="p-button-raised p-button-rounded" onClick={this.SaveAutoMovil}/> 
       </div>
   )

  }
  componentDidMount() {
   this.autoMovilService.getAllAutoMovil().then(data=> { 
      this.setState({
  
      autoMoviles:data
  })
   });

   this.autoMovilService.getAllTipoAutoMovil().then(data => 
    {
       
    this.setState({
   tipoVehiculo:data
   
})

});
  }
  render() {

    return (

      <>
 <Menubar model={this.items}>
<a href='/Auto'>Auto</a>   
</Menubar>
        <br />
        <Router>
       
        <div>
          <Switch>
            <Route
              path="/Auto">
            <AppAutoMovilForm/>
               </Route>
               <Route
               path='/'>
               <Menubar model={this.items2}></Menubar>
      <br></br>
      <DataTable value={this.state.autoMoviles} selectionMode='single' selection={this.state.selectedAuto}
      onSelectionChange={e => this.setState({
        selectedAuto:e.value
      })}footer={this.footer}>
               <Column field="idVehiculo" header='Num vehiculo'/>
                <Column field="propietario" header='Propietario'/>
                <Column field="strNumEconomico" header='strNumEconomico'/>
                <Column field="dtFechaIngreso" header='Fecha de Ingreso'/>
                <Column field="idTipoVehiculo.strValor" header='Tipo de vehiculo'/>
               
            </DataTable>
               </Route>
          </Switch>
        </div>
      </Router>
     
        <Dialog header="Actualizar vehiculo"  visible={this.state.visible} 
        footer={this.footer2}
        style={{ width: '700px'}} modal={true} onHide={() => this.setState({ visible: false })}>
        
        <form id="autoMovil-form">
        <div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.anio} id="anio" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.anio = val

                return { autoMovil1 };
            })
        }} />
        <label htmlFor="Anio">Anio</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.capacidadCombustible} id="capacidadCombustible" onChange={(e) => {
            let val2 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.capacidadCombustible = val2;

                return { autoMovil1 };
            })
        }} />
        <label htmlFor="capacidadCombustible">capacidad de Combustible</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.dceKmlitros} id="dceKmlitros" onChange={(e) => {
            let val2 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.dceKmlitros = val2;

                return { autoMovil1 };
            })
        }} />
        <label htmlFor="dceKmlitros">Km/litros:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">

<div className="p-field p-col">
<label htmlFor="tipoVehiculo">Tipo de Vehiculo:</label>
<br></br>
<select value={this.state.autoMovil1.idTipoVehiculo.idTipoVehiculo} className="p-button-danger" style={{width:'100%'}}  onChange={(e) => {
                                    let val16 = e.target.value;
                                    
                                    this.setState(prevState => {
                                        let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                                        autoMovil1.idTipoVehiculo.idTipoVehiculo = val16;
                                        console.log(autoMovil1.idTipoVehiculo.idTipoVehiculo)
                                        return { autoMovil1 };
                                    })
                                }}>
              { 
                this.state.tipoVehiculo.map((schema) => {
                  return (<option key={schema.strValor} value={schema.idTipoVehiculo}> {schema.strValor}</option>);
                })
              }
              </select>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.dceRendimiento} id="dceRendimiento" onChange={(e) => {
            let val3 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.dceRendimiento = val3;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="dceRendimiento">Rendimiento:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.dtFechaIngreso} id="dtFechaIngreso" onChange={(e) => {
            let val4 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.dtFechaIngreso = val4;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="dtFechaIngreso">Fecha de Ingreso:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.numLlantas} id="numLlantas" onChange={(e) => {
            let val5 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.numLlantas = val5;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="numLlantas">Numero de Llantas:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.numMotor} id="numMotor" onChange={(e) => {
            let val6 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.numMotor = val6;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="numMotor">Numero de Motor</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.numSerie} id="numSerie" onChange={(e) => {
            let val7 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.numSerie = val7;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="numSerie">Numero de Serie</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.placas} id="placas" onChange={(e) => {
            let val8 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.placas = val8;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="placas">Placas:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.precioCompra} id="precioCompra" onChange={(e) => {
            let val9 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.precioCompra = val9;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="precioCompra">Precio de Compra:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.propietario} id="propietario" onChange={(e) => {
            let val10 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.propietario = val10;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="propietario">Propietario:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.strCapacidadVehicular} id="strCapacidadVehicular" onChange={(e) => {
            let val11 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.strCapacidadVehicular = val11;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="strCapacidadVehicular">Capacidad Vehicular:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.strColor} id="strColor" onChange={(e) => {
            let val12 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.strColor = val12;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="strColor">Color:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
    <div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.strCombustible} id="strCombustible" onChange={(e) => {
            let val13 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.strCombustible = val13;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="strCombustible">Combustible:</label>
    </span>
    </div>
    <div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.strMedida} id="strMedida" onChange={(e) => {
            let val14 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.strMedida = val14;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="strMedida">Medida:</label>
    </span>
    </div>
</div>
<div className="p-fluid p-formgrid p-grid">
    <div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.autoMovil1.strNumEconomico} id="strNumEconomico" onChange={(e) => {
            let val15 = e.target.value;
            this.setState(prevState => {
                let autoMovil1 = Object.assign({}, prevState.autoMovil1)
                autoMovil1.strNumEconomico = val15;
                return { autoMovil1 };
            })
        }} />
        <label htmlFor="strNumEconomico">Numero Economico:</label>
    </span>
    </div>
    
</div>
                       
                </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </>
    )
   
  }
  
 
showDismiss(){
  this.setState({
visible:true,
autoMovil1:{
    idVehiculo: '',
    strNumEconomico: '',
    dtFechaIngreso: '',
    numSerie: '',
    numMotor: '',
    strCapacidadVehicular: '',
    strColor: '',
    anio: '',
    precioCompra: '',
    propietario: '',
    numLlantas: '',
    strMedida: '',
    strCombustible: '',
    dceKmlitros: '',
    capacidadCombustible: '',
    dceRendimiento: '',
    placas: '',
   idTipoVehiculo:{
       idTipoVehiculo:'',
       strValor:''
   }
}
  });
}

SaveAutoMovil(){
    console.log(this.state.autoMovil1);

    this.autoMovilService.saveAutoMovil(this.state.autoMovil1)
    .then(data => {
      this.setState({
        visible:false,
        autoMovil1:{
    idVehiculo: '',
    strNumEconomico: '',
    dtFechaIngreso: '',
    numSerie: '',
    numMotor: '',
    strCapacidadVehicular: '',
    strColor: '',
    anio: '',
    precioCompra: '',
    propietario: '',
    numLlantas: '',
    strMedida: '',
    strCombustible: '',
    dceKmlitros: '',
    capacidadCombustible: '',
    dceRendimiento: '',
    placas: '',
   idTipoVehiculo:{
       idTipoVehiculo:'',
       strValor:''
   }
        }
      });
      
      this.growl.show({severity: 'success', summary: 'Guardado correctamente', detail: 'Se creo el registro correctamente'});
    });
    this.autoMovilService.getAllAutoMovil().then(data=> { 
        this.setState({autoMoviles:data})
     });
    document.getElementById('autoMovil-form').reset();
    document.location.reload();
}

deleteAutomovil(){
   let res=false; 
 this.growl.show({severity: 'error', summary: 'Eliminado correctamente', detail: 'Se elimino el regiistro correctamente'});
   this.autoMovilService.deleteeAutoMovil(this.state.selectedAuto.idVehiculo).then(e=> console.log(e));
   this.autoMovilService.getAllAutoMovil().then(data=> { 
    this.setState({autoMoviles:data})
 });
 document.location.reload();
}

updateMovil(){
    
    this.autoMovilService.getVehiculoById(this.state.selectedAuto.idVehiculo).then(data=> { 
        this.setState({
    visible:true,
    autoMovil1:data
    })
     });
}

RedireccionarVehiculos(){

    window.location.href = "/";

}

RedireccionarBitacoras(){

    window.location.href = "/Auto";

}

}
