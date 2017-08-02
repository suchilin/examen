import { observable } from 'mobx'
import $ from 'jquery'

class BaseStore{
    @observable objects = [];
    @observable page = 0;
    @observable pages = 0;
    @observable next = null;
    @observable previous = null;
    url_=''

    all(page){
        var self = this
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: self.url_ + '?page='+page,
            context: this,
        })
        .done(function(res){
            self.objects = []
            res.results.map(function(obj_){
                self.objects.push(obj_)
            })
            if(res.links.next !== null){
                self.next=page+1
            }else{
                self.next=null
            }
            if(res.links.previous !== null){
                self.previous=page-1
            }else{
                self.previous=null
            }
            self.page = page
            self.pages = res.total_pages
        })
        .fail(function(e){
            console.log(e);
        });

    }

    create(){
        var self = this;
        var resp = null
        var data = {}
        for(var key in this){
            if(
                key!=="page" &&
                key!=="pages"&&
                key!=="objects" &&
                key!=="previous" &&
                key!=="next"
              ){
                data[key] = this[key]
            }
        }
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: self.url_,
            context: this,
            async: false,
            data: JSON.stringify(data)
        })
        .done(function(res, textStatus, xhr){
            resp = xhr.status
            console.log(resp)
            })
        .fail(function(xhr){
            resp = xhr.status
        });
        return resp
    }

    update(key_){
        var data = {}
        var self=this
        for(var key in this){
            if(
                key!=="page" &&
                key!=="pages"&&
                key!=="objects" &&
                key!=="previous" &&
                key!=="next"
              ){
                data[key] = this[key]
            }
        }
        $.ajax({
            type: 'put',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: self.url_+key_+"/",
            context: this,
            data: JSON.stringify(data)
        })
        .done(function(res){
            location.reload()
            console.log(res)
            return true;
            })
        .fail(function(xhr){
            console.log(xhr.status);
        });

    }

    get(key){
        var self = this
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: self.url_+key,
            context: this,
        })
        .done(function(res){
            for(var key in self){
                if(
                    key!=="page" &&
                    key!=="pages"&&
                    key!=="objects" &&
                    key!=="previous" &&
                    key!=="next"
                  ){
                    self[key] = res[key]
                }
            }
            return true;
            })
        .fail(function(e){
            console.log(e);
        });

    }

    delete(key){
        var self = this
        $.ajax({
            type: 'delete',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            async:false,
            url: self.url_+key+'/',
            context: this,
        })
            .done(function(res){
                location.reload()
            })
            .fail(function(e){
                console.log(e);
            });

    }

    filter(pk){
        var self = this
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: self.url_+'?enfermedad='+pk,
            context: this,
        })
        .done(function(res){
            self.objects = []
            res.results.map(function(obj_){
                self.objects.push(obj_)
            })
            if(res.links.next !== null){
                self.next=page+1
            }else{
                self.next=null
            }
            if(res.links.previous !== null){
                self.previous=page-1
            }else{
                self.previous=null
            }
            self.page = page
            self.pages = res.total_pages
        })
        .fail(function(e){
            console.log(e);
        });

    }


}

export default BaseStore
