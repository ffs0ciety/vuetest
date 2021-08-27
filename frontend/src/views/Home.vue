<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2>PANTALLA DE CONFIGURACIÓN</h2>
                </div>
            </div>
            <div class="coach" v-for="(coach, index) in data.coaches" :key="coach">
                <div class="row text-left">
                    <div class="col"><h5>Entrenador {{index+1}}</h5></div>
                </div>      
                <div class="row text-left d-flex justify-content-center align-items-center">
                    <div class="col-12 col-md-4">
                        <div class="row align-items-center">
                            <div class="col-6">Nombre</div>
                            <div class="col-6">
                                <input type="text" v-model="data.coaches[index].name" :placeholder='[coach.name]'>
                            </div>
                        </div>
                       
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="row align-items-center">
                            <div class="col-6">Valoración</div>
                            <div class="col-6">
                                <input type="number" v-model="data.coaches[index].rating" min="0" max="5" :placeholder='[coach.rating]'>
                                <div class="range-alert" v-if="data.coaches[index].rating>5 || data.coaches[index].rating<0">La valoración debe de ser entre 0 y 5</div>
                            </div>
                        </div>

                    </div>
                    <div class="col-12 col-md-4">
                        <div class="row align-items-center">
                            <div class="col-6">Máximo número de clientes</div>
                            <div class="col-6">
                                <input type="number" v-model="data.coaches[index].maxClients" min="0" :placeholder='[coach.maxClients]'>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>  
                <hr>        
            </div>

            <div class="row justify-content-end">
                <div class="col-auto">
                    <button class="btn btn-secondary" @click="showModal = true">Ver tabla clientes</button>
                </div>
                <div class="col-auto">
                    <router-link :to="{name:'results'}"><button @click="saveData" class="btn btn-primary">Calcular resultados</button></router-link>
                </div>
                
            </div>

            <div v-if="showModal">
                <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Clientes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="showModal = false">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col"><h5>Cliente</h5></div>
                                    <div class="col"><h5>Importancia de la reputación</h5></div>
                                </div>
                                <div v-for="(client, index) in data.clients" :key="index">
                                    <div class="row">
                                        <div class="col">
                                            {{client.name}}
                                        </div>
                                        <div class="col">
                                            {{client.rate}}
                                        </div>
                                    </div>
                                    <hr v-if="index != data.clients.length-1"> 
                                </div>                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="showModal = false">Cerrar</button>                        
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </transition>
            </div>
        </div>
        <!-- <input type="text" name="" v-model="coaches[0].name" :placeholder="test">
        {{jamon}}
        {{coaches[0]}} -->
    </div>
</template>

<script>
import {apiRequest} from '../services/Apis.js'

export default {
    data() {
        return {
            data: {coaches:[],clients:[]},
            showModal: false,
            sandia: 'test123'
        }
    },
    methods: {
        async getData(){
            console.log("get");
            if(window.sessionStorage.getItem('rawData') != undefined){
                this.data = JSON.parse(window.sessionStorage.getItem('rawData'));
            }
            else this.data = await apiRequest('GET', '/api/data');
        },    
        saveData(){
            window.sessionStorage.setItem('rawData', JSON.stringify(this.data));
        },
        checkRating(){
            return true;
        }
    },
    created() {
        this.getData();
    },
}


</script>


<style>
    input{
        width: 8rem;
        border: 0;
        border-radius: 0.2rem;
        position: relative;
        border: 0.2px solid rgb(194, 194, 194);
        /* left: 20rem; */
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .coach{
        padding-bottom: 2rem;
    }

    .range-alert{
        color: red;
        position: relative;
    }

</style>