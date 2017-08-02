import React, {Component} from 'react'
import {observer} from 'mobx-react'
import UserStore from '../../stores/userStore';

@observer
class CreateUser extends Component{
    constructor(props){
        super(props);
        this.updateProperty.bind(this)
    }

    componentDidMount(){
      this.props.store.username = '';
      this.props.store.password = '';
      this.props.store.first_name = '';
      this.props.store.last_name = '';
      this.props.store.email = '';
    }


    handleSubmit(e){
        e.preventDefault()
        var status_ = this.props.store.create()
        if(status_===201){
            this.props.history.push('/user/list/')
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
                    Nombre de usuario:
                    <input type='text' value={this.props.store.username} name="username" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type='password' value={this.props.store.password} name="password" onChange={this.onChange.bind(this)} />
                </label>
            </div>
            <div>
                <label>
                    Nombre(s):
                    <input type='text' value={this.props.store.first_name} name="first_name" onChange={this.onChange.bind(this)} />
                </label>
                <label>
                    Apellidos:
                    <input type='text' value={this.props.store.last_name} name="last_name" onChange={this.onChange.bind(this)} />
                </label>
                <label>
                    Correo electronico:
                    <input type='text' value={this.props.store.email} name="email" onChange={this.onChange.bind(this)} />
                </label>
                <label>
                <select name='tipo' onChange={this.onChange.bind(this)}>
                    <option>Selecciona el tipo de usuario</option>
                    <option value="A">Administrador</option>
                    <option value="M">Medico</option>
                    <option value="P">Practicante</option>
                </select>
                </label>
            </div>
                <input type='submit' value='Guardar' />
            </form>
        )
    }
}


class CreateOneUser extends Component{
    render(){
            return(
                <CreateUser
                  store={UserStore}
                  params={this.props.params}
                  history={this.props.history}
                  />
            )
    }
}

export default CreateOneUser
