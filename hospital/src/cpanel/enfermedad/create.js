import React, {Component} from 'react'
import {observer} from 'mobx-react'
import EnfermedadStore from '../../stores/enfermedadStore';
import SintomaStore from '../../stores/sintomaStore';

@observer
class CreateEnfermedad extends Component{
    constructor(props){
        super(props);
        this.updateProperty.bind(this)
    }

    componentDidMount(){
      this.props.store.nombre = '';
      this.props.store.nombre_enf = '';
      this.props.store.link_desc = '';
    }


    handleSubmit(e){
        e.preventDefault()
        var status_ = this.props.store.create()
        if(status_===201){
            this.props.history.push('/enfermedad/list/')
        }
    }

    updateProperty(key,value){
        this.props.store[key] = value
    }

    onChange(e){
        this.updateProperty(e.target.name, e.target.value)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                <label>
                    Nombre:
                    <input type='text' value={this.props.store.nombre} name="nombre" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Nombre a mostrar:
                    <input type='text' value={this.props.store.nombre_enf} name="nombre_enf" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Link de descripcion:
                    <input type='text' value={this.props.store.link_desc} name="link_desc" onChange={this.onChange.bind(this)} />
                </label>
            </div>
                <input type='submit' value='Guardar' />
            </form>
        )
    }
}


class CreateOneEnfermedad extends Component{
    render(){
            return(
                <CreateEnfermedad
                  store={EnfermedadStore}
                  sstore={SintomaStore}
                  params={this.props.params}
                  history={this.props.history}
                  />
            )
    }
}

export default CreateOneEnfermedad
