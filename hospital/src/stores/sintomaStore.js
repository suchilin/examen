import { observable } from 'mobx'
import BaseStore from './base'

class SintomaStore extends BaseStore{
    @observable nombre = '';
    @observable nombre_sint = '';
    @observable link_desc = '';
    @observable enfermedad= '';
    url_ ='http://localhost:8000/hospital/sintomas/';

}

export default new SintomaStore();
