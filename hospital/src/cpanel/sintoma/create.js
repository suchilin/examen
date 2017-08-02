import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import SintomaStore from '../../stores/sintomaStore'

@observer
export default class SintomasPanel extends Component{
    constructor(props){
        super(props);
        this.updateProperty.bind(this)
    }


    handleSubmit(e){
        e.preventDefault()
        var status_ = this.props.store.create()
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
                    <input type='text' value={this.props.store.nombre} size={this.props.store.nombre.length} name="nombre" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Nombre a mostrar:
                    <input type='text' value={this.props.store.nombre_enf} size={this.props.store.nombre_enf.length} name="nombre_enf" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Link de descripcion:
                    <input type='text' value={this.props.store.link_desc} size={this.props.store.link_desc.length} name="link_desc" onChange={this.onChange.bind(this)} />
                </label>
            </div>
                <input type='submit' value='Guardar' />
            </form>
        )
    }
}
