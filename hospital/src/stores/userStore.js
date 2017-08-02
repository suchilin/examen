import { observable } from 'mobx'
import BaseStore from './base'

class UserStore extends BaseStore{
    @observable username = '';
    @observable password = '';
    @observable first_name = '';
    @observable last_name = '';
    @observable email = ''
    @observable tipo = ''
    url_ = 'http://localhost:8000/hospital/accounts/'
}

export default new UserStore();
