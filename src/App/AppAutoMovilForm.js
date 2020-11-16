import React, { Component, Fragment } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Growl } from 'primereact/growl';
import 'primeflex/primeflex.css';
import { Panel } from 'primereact/panel';
import { BitacoraService } from '../Services/BitacoraService'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'



export class AppAutoMovilForm extends Component {
    constructor() {
        super();

        this.state = {
            visible:false,
            bitacora:{
        idBitacora:' ',
        dtefecha:' ',
        strClasificacion:' ',
        strKilometrajeAlMomento:' ',
        strTrabajoRealizado:' ',
        strMecanico:' ',
        dceCosto:' ',
        fechaAprox:' ',
        strNotas:' ',
        idvehiculo:{
            idVehiculo:''
        },
            },
            bitacoras:[],
            vehiculos :[{
                idVehiculo:'',
                placas:''
            }],
            selectBitacora:{
                idBitacora:''
            }    
        };
          this.items2 = [{
              label:'Nuevo',
               icon:'pi pi-fw pi-file',
               command:()=> {this.showDismiss()}
            },
            {
               label:'Editar',
               icon:'pi pi-fw pi-pencil',
               command:()=> {this.updateBitacora()}
            },
            {
               label:'Eliminar',
               icon:'pi pi-fw pi-user',
               command:()=> {this.deleteBitacora()}
            }, 
            ];
            this.bitacoraService = new BitacoraService();
            this.SaveBitacora= this.SaveBitacora.bind(this);
            this.deleteBitacora= this.deleteBitacora.bind(this);
            this.updateBitacora=this.updateBitacora.bind(this);
            this.showDismiss=this.showDismiss.bind(this);
            this.footer2=(
                <div>
                <Button label="Agregar" className="p-button-raised p-button-rounded" onClick={this.SaveBitacora}/> 
                </div>
            )   
    }
    
componentDidMount() {
    
   this.bitacoraService.getAllBitacora().then(data=> {
    console.log('aqui'+data)
    this.setState({

    bitacoras:data
})

   });


    this.bitacoraService.getAllAutoMovil().then(data => 
        {
           
        this.setState({
            vehiculos:data 
    })  
});
  }
    render() {
        const { tipoVehiculo } = this.props;

        return (
           <>
    <Menubar model={this.items2}></Menubar>
      <br></br>
      <DataTable value={this.state.bitacoras} selectionMode='single' selection={this.state.selectBitacora}
      onSelectionChange={e => this.setState({
        selectBitacora:e.value
      })}footer={this.footer}>
               <Column field="idBitacora" header='Num bitacora'/>
                <Column field="dtefecha" header='Fecha'/>
                <Column field="strClasificacion" header='Clasificacion'/>
                <Column field="strKilometrajeAlMomento" header='Kilometraje'/>
                <Column field="strTrabajoRealizado" header='Trabajo realizado'/>
                <Column field="dceCosto" header='Costo'/>
                <Column field="idvehiculo.Placas" header='PLacas del vehiculo'/>
                <Column field="strMecanico" header='Mecanico'/>   
            </DataTable>

        <Dialog header="Bitacora"  visible={this.state.visible} 
        footer={this.footer2}
        style={{ width: '700px' }} modal={true} onHide={() => this.setState({ visible: false })}>
        <form id='form-Bitacora'>
        <div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.dtefecha} id="dtefecha" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.dtefecha = val

                return { bitacora };
            })
        }} />
        <label htmlFor="dtefecha">Fecha</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.strClasificacion} id="strClasificacion" onChange={(e) => {
            let val2 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.strClasificacion = val2;

                return { bitacora };
            })
        }} />
        <label htmlFor="strClasificacion">Clasificacion</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.strKilometrajeAlMomento} id="strKilometrajeAlMomento" onChange={(e) => {
            let val2 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.strKilometrajeAlMomento = val2;

                return { bitacora };
            })
        }} />
        <label htmlFor="strKilometrajeAlMomento">Kilometraje al Momento:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
<label htmlFor="tipoVehiculo">Vehiculos disponibles:</label>
<br></br>
<select value={this.state.bitacora.idvehiculo.idVehiculo} className="p-button-danger" style={{width:'100%'}}  onChange={(e) => {
                                    let val16 = e.target.value;
                                    
                                    this.setState(prevState => {
                                        let bitacora = Object.assign({}, prevState.bitacora)
                                        bitacora.idvehiculo.idVehiculo = val16;
                                       console.log(bitacora.idvehiculo.idVehiculo)
                                        return { bitacora };
                                    })
                                }}>
              { 
                this.state.vehiculos.map((schema) => {
                  return (<option key={schema.idVehiculo} value={schema.idVehiculo}> {schema.placas}</option>);
                })
              }
              </select>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.strTrabajoRealizado} id="strTrabajoRealizado" onChange={(e) => {
            let val3 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.strTrabajoRealizado = val3;
                return { bitacora };
            })
        }} />
        <label htmlFor="strTrabajoRealizado">Trabajo realizado:</label>
    </span>
</div>
</div>
<div className="p-fluid p-formgrid p-grid">
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.strMecanico} id="strMecanico" onChange={(e) => {
            let val4 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.strMecanico = val4;
                return { bitacora };
            })
        }} />
        <label htmlFor="strMecanico">Mecanico:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.dceCosto} id="dceCosto" onChange={(e) => {
            let val5 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.dceCosto = val5;
                return { bitacora };
            })
        }} />
        <label htmlFor="dceCosto">Costo:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.fechaAprox} id="fechaAprox" onChange={(e) => {
            let val6 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.fechaAprox = val6;
                return { bitacora };
            })
        }} />
        <label htmlFor="fechaAprox">fecha de aproximacion:</label>
    </span>
</div>
<div className="p-field p-col">
    <span className="p-float-label">
        <InputText style={{ width: '100%' }} value={this.state.bitacora.strNotas} id="strNotas" onChange={(e) => {
            let val7 = e.target.value;
            this.setState(prevState => {
                let bitacora = Object.assign({}, prevState.bitacora)
                bitacora.strNotas = val7;
                return { bitacora };
            })
        }} />
        <label htmlFor="strNotas">Notas:</label>
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
      bitacora:{
        idBitacora:' ',
dtefecha:' ',
strClasificacion:' ',
strKilometrajeAlMomento:' ',
strTrabajoRealizado:' ',
strMecanico:' ',
dceCosto:' ',
fechaAprox:' ',
strNotas:' ',
idvehiculo:{
    idVehiculo:''
}    
}
        });
      }
    SaveBitacora(){
        console.log(this.state.bitacora);

        this.bitacoraService.saveBitacora(this.state.bitacora)
        .then(data => {
          this.setState({
      bitacora:{
        idBitacora:' ',
dtefecha:' ',
strClasificacion:' ',
strKilometrajeAlMomento:' ',
strTrabajoRealizado:' ',
strMecanico:' ',
dceCosto:' ',
fechaAprox:' ',
strNotas:' ',
idvehiculo:{
    idVehiculo:''
}       
            }
          });
          
          this.growl.show({severity: 'success', summary: 'Guardado correctamente', detail: 'Se creo el registro correctamente'});
        });
        this.bitacoraService.getAllBitacora().then(data=> { 
            this.setState({bitacoras:data})
         });
        //document.getElementById('autoMovil-form').reset();
        document.location.reload();
      
    }

    deleteBitacora(){
        let res=false; 
        console.log('El valor: '+this.state.selectBitacora.idBitacora)
      this.growl.show({severity: 'error', summary: 'Eliminado correctamente', detail: 'Se elimino el regiistro correctamente'});
     
      this.bitacoraService.deleteBitacora(this.state.selectBitacora.idBitacora).then(e=> console.log(e));
        this.bitacoraService.getAllBitacora().then(data=> { 
         this.setState({bitacoras:data})
      });
      document.location.reload();
     }
     
     updateBitacora(){
         
         this.bitacoraService.getBitacoraById(this.state.selectBitacora.idBitacora).then(data=> { 
             this.setState({
         visible:true,
         bitacora:data
         })
          });
     }





}

