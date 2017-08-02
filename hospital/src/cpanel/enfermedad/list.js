import React, {Component} from 'react'
import {observer} from 'mobx-react'
import EnfermedadStore from '../../stores/enfermedadStore'
import SintomaStore from '../../stores/sintomaStore'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';

@observer
class EnfermedadList extends Component{
    componentDidMount(){
        this.props.store.all(1);
    }
    handleEnfermedades(page){
        this.props.store.all(page)
    }
    readEnfermedad(pk){
        this.props.history.push('/enfermedad/read/'+pk)
    }
    deleteEnfermedad(pk){
        this.props.store.delete(pk);
    }

    render(){
            return(
            <div>
                <button onClick={(event)=>{ this.props.history.push('/enfermedad/create') }} >
                    <i className="mdi mdi-note-plus-outline" /> Agregar
                </button>

                <table>
                    <tbody>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>Nombre a mostrar</th>
                        <th>Link de descripcion</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                    {
                        this.props.store.objects.map((enfermedad, i)=>{
                            return(
                                <tr key={i}>
                                    <td>
                                        {enfermedad.nombre}
                                    </td>
                                    <td>
                                        {enfermedad.nombre_enf}
                                    </td>
                                    <td>
                                        {enfermedad.link_desc}
                                    </td>
                                    <td>
                                        <i className="mdi mdi-lead-pencil" onClick={this.readEnfermedad.bind(this, enfermedad.id)} />
                                    </td>
                                    <td>
                                        <i className="mdi mdi-delete" onClick={this.deleteEnfermedad.bind(this, enfermedad.id)} />
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

class ListAllPosts extends Component{
    render(){
        return(
            <EnfermedadList
                store={EnfermedadStore}
                sstore={SintomaStore}
                history={this.props.history}
            />
            )
    }
}

export default ListAllPosts
