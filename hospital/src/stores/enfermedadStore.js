import { observable } from 'mobx'
import BaseStore from './base'

class EnfermedadStore extends BaseStore{
    @observable nombre = '';
    @observable nombre_enf = '';
    @observable link_desc = '';
    url_ = 'http://localhost:8000/hospital/enfermedades/'
}

export default new EnfermedadStore();
