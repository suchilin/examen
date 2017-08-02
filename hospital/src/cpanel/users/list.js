import React, {Component} from 'react'
import {observer} from 'mobx-react'
import userStore from '../../stores/userStore'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';

@observer
class UserList extends Component{
    componentDidMount(){
        this.props.store.all(1);
    }
    handleUsers(page){
        this.props.store.all(page)
    }
    deleteUser(pk){
        this.props.store.delete(pk);
    }

    render(){
            return(
            <div>
                <button onClick={(event)=>{ this.props.history.push('/user/create') }} >
                    <i className="mdi mdi-note-plus-outline" /> Agregar usuario
                </button>

                <table>
                    <tbody>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Nombre(s)</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Borrar</th>
                    </tr>
                    {
                        this.props.store.objects.map((user, i)=>{
                            return(
                                <tr key={i}>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.first_name}
                                    </td>
                                    <td>
                                        {user.last_name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                    {user.tipo==='A'?'Administrador':''}
                                    {user.tipo==='M'?'Medico':''}
                                    {user.tipo==='P'?'Practicante':''}
                                    </td>
                                    <td>
                                        <i className="mdi mdi-delete" onClick={this.deleteUser.bind(this, user.id)} />
                                    </td>
                                </tr>
                            )
                            })
                    }
                        </tbody>
                    </table>

                        {!!this.props.store.previous?<button onClick={this.handlePosts.bind(this, this.props.store.previous)}> { "<<" } </button>:'' }
                        <span>pagina {this.props.store.page} of {this.props.store.pages}</span>
                        {!!this.props.store.next?<button onClick={this.handlePosts.bind(this, this.props.store.next)}> { ">>" } </button>:''}
                </div>
        )
    }
}

class ListAllUsers extends Component{
    render(){
        return(
            <UserList
                store={userStore}
                history={this.props.history}
            />
            )
    }
}

export default ListAllUsers
