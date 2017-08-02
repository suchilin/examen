import React, {Component} from 'react'
import {observer} from 'mobx-react'
import EnfermedadStore from '../../stores/enfermedadStore'
import SintomaStore from '../../stores/sintomaStore';

@observer
class ReadEnfermedad extends Component{

    constructor(props){
        super(props);
        this.updateProperty.bind(this)
    }

    componentDidMount(){
        var pk = this.props.params.pk
        this.props.store.get(pk)
        this.props.sstore.filter(pk)
        this.props.sstore.enfermedad = pk
    }

    handleSubmit(e){
        e.preventDefault()
        var status_ = this.props.sstore.create()
        var pk = this.props.params.pk
        this.props.sstore.filter(pk)
        this.props.sstore.nombre=""
        this.props.sstore.nombre_sint=""
        this.props.sstore.link_desc=""
    }

    updateProperty(key,value){
        this.props.sstore[key] = value
    }

    onChange(e){
        this.updateProperty(e.target.name, e.target.value)
    }

    deleteSintoma(pk){
      this.props.sstore.delete(pk);
    }

    render(){
        return(
            <div>
                <h1>Enfermedad</h1>
                <div>
                    <p><b>Nombre a mostrar: </b>{this.props.store.nombre_enf}</p>
                </div>
                <div>
                    <p><b>Nombre: </b>{this.props.store.nombre}</p>
                </div>
                <div>
                    <p><b>Link de descripcion: </b>{this.props.store.link_desc}</p>
                </div>
                <h1>Sintomas</h1>
                <table>
                <thead>
                    <td>Nombre</td>
                    <td>Nombre a mostrar</td>
                    <td>Link de descripcion</td>
                </thead>
                <tbody>
                {this.props.sstore.objects.map((sintoma, i)=>{
                    return(
                      <tr key={i}>
                          <td>{sintoma.nombre}</td>
                          <td>{sintoma.nombre_sint}</td>
                          <td>{sintoma.link_desc}</td>
                          <td>
                              <i className="mdi mdi-delete" onClick={this.deleteSintoma.bind(this, sintoma.id)} />
                          </td>
                      </tr>
                    )
                })}
                <tr>
                    <td>
                    <input
                        type='text'
                        name="nombre"
                        value={this.props.sstore.nombre}
                        onChange={this.onChange.bind(this)}
                        />
                    </td>
                    <td>
                    <input
                        type='text'
                        name="nombre_sint"
                        value={this.props.sstore.nombre_sint}
                        onChange={this.onChange.bind(this)}
                        />
                    </td>
                    <td>
                    <input
                        type='text'
                        name="link_desc"
                        value={this.props.sstore.link_desc}
                        onChange={this.onChange.bind(this)}
                        /></td>
                    <td><button onClick={this.handleSubmit.bind(this)}>Añadir</button></td>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}


class ReadOneEnfermedad extends Component{
    render(){
            return(
                <ReadEnfermedad
                  store={EnfermedadStore}
                  sstore={SintomaStore}
                  params={this.props.match.params}
                  />
            )
    }
}

export default ReadOneEnfermedad
