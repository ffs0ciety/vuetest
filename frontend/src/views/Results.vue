<template>
    <div>
        <div class="row tabs">
            <div @click="screenCoaches=true" v-bind:class="{ active: screenCoaches }" class="col-auto tab">
                Entrenadores
            </div>
            <div v-if="this.data.coaches != undefined"  @click="screenCoaches=false" v-bind:class="{ active: !screenCoaches }" class="col-auto tab right">
                Valoración del conjunto
            </div>
        </div>
        <div class="info">
            <div v-if="screenCoaches" >
                <div class="container">
                    <div class="row header">
                        <div class="col">
                            <h2>PANTALLA DE RESULTADOS</h2>
                        </div>
                    </div>
                    <div v-if="this.data.coaches == undefined" class="row">
                        <div class="col">
                            Puede ser que no hayas hecho caso al aviso del rango o que he programado algo mal :/ . Prueba intentarlo de nuevo
                        </div>
                    </div>
                       <!-- <div v-bind="data.data != null" class="row">
                            <div class="col">
                                {{data.data.msg}}
                            </div>
                        </div> -->
                    <div class="row justify-content-center">
                        <div class="col-auto" v-for="(coach, index) in data.coaches" :key="coach">
                            <!-- asdasd{{index}} -->
                            <CoachCard v-bind:name=coach.name v-bind:number=index v-bind:rating=coach.rating v-bind:maxClients=coach.maxClients v-bind:clients=coach.clients />
                        </div>
                    </div>   

                    <div class="row footer justify-content-end">
                        <div class="col-auto">
                            <router-link :to="{name:'home'}"><button class="btn btn-primary">Volver</button></router-link>
                        </div>
                    </div>         
                </div>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row section">
                        <div class="col">
                            <h2>VALORACIÓN DEL CONJUNTO</h2>
                        </div>
                    </div>
                    <div v-if="data.unassignedClients.length > 0" class="row text-left">
                        <div class="col">
                            <h5>Los siguientes clientes no han podido ser asignados:</h5>
                            <div v-for="client in data.unassignedClients" :key="client">
                                Cliente {{client.name}} - Importancia: {{client.rate}}
                            </div>
                        </div>
                    </div>
                    <div class="section row text-left">
                        <div class="col">
                            <h5>Cálculo de satisfación</h5>
                            Ha sido calculado por el sumatorio del producto de la valoración de cada entrenador con la importancia que le da el cliente a dicha valoración
                            <div v-for="(coach, index) in data.coaches" :key="coach">
                                <div class="row coach-data">
                                    <div class="col-6">Coach <b>{{coach.name}}</b></div>
                                    <div class="col-6">{{coach.rating}} *</div>
                                </div>
                                
                                    <div v-for="client in coach.clients" :key="client">
                                        <div class="row">
                                            <div class="client-data col-6">{{client.name}}</div>
                                            <div class="client-data col">{{client.rate}} </div>
                                        </div>                                 
                                    </div>
                                <div class="row partial">
                                    <div class="col-6">
                                        Total para este entrenador:
                                    </div>
                                    <div class="partial-data col-6">{{formatNumber(results[index])}}</div>
                                </div>
                            </div>
                            <div class="row align-items-center summatory">
                                <div class="col-6">
                                    Sumatorio total de satisfacción:
                                </div>
                                <div class="col-6 summatory-data">{{formatNumber(total)}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="section row text-left">
                        <div class="col">
                            <h5>Explicación de la asignación</h5>
                            <p>Para un conjunto de datos cerrado como el propuesto para la solución del ejercicio y entendiendo que ese conjunto lo tendremos inicialmente completo para hacer las asignaciones. La solución óptima y sencilla sería ordenar ambos conjuntos y asignar a cliente con mayor importancia - entrenador con mayor puntuación. A rasgos generales, consistiría en dar siempre el entrenador con mayor puntuación disponible a cada momento. Con esta solución nos aseguraríamos obtener la mayor puntuación de satisfacción total para la casuística explicada.</p>
                            
                            <p>El problema viene cuando pensamos en el conjunto de datos como si fueran clientes que se han ido apuntando poco a poco; o simplemente que posteriormente tendremos la necesidad de añadir nuevos clientes al servicio. Con la solución explicada en el párrafo anterior, podría darse el caso de asignar inicialmente entrenadores con altas puntuaciones a clientes que no le dan importancia, provocando que clientes posteriores no puedan estar con entrenadores de puntuación demandada.</p>

                            <p>La solución planteada en la resolución del ejercicio consiste en asignar entrenadores disponibles con puntuación similar a la importancia que le da el cliente (tras normalizar los datos). Por ejemplo, si un cliente le da importancia de 6.8 (3.4 normalizado) y tenemos los siguienes huecos disponibles: Entrenador A->4.2, Entrenador B->3.7, Entrenador C->3.2, la aplicación enlazará al cliente con el entrenador B, de puntuación 3.7.</p>

                            <p>Con esta resolución del problema encontramos una forma sencilla de asignar a los clientes con algo cercano a lo que estan buscando pero superior. Esta asignación se produce siempre y cuando haya huecos disponibles en entrenadores con puntuaciones superiores, en caso contrario se le asignará el primer hueco disponible más alto.</p>

                            <p>Para determinadas situaciones la solución estará lejos de ser optima, por ejemplo, cuando quedan pocos huecos disponibles, es posible que a una persona que valore mucho un entrenador con alta puntuación se le asigne un entrenador con valoración 1 porque es el único hueco disponible.</p>

                            <p>La solución del problema es mejorable utilizando modelos matemáticos como modelos de asignación o modelos predictivos en el caso de poder ir creando un historial de datos.</p>
                            
    
                        </div>
                    </div>
                    <div class="row footer justify-content-end">
                        <div class="col-auto">
                            <router-link :to="{name:'home'}"><button class="btn btn-primary">Volver</button></router-link>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {apiRequest} from '../services/Apis.js'
import CoachCard from '../components/CoachCard.vue'


export default {
    components: {
        CoachCard
    },
    data() {
        return {
            data: [],
            screenCoaches: true,
            results: [],
            total: 0,     
            msg: null             
        }
    },
    methods: {
        async getResults(){
            var _data = JSON.parse(window.sessionStorage.getItem('rawData'));
            this.data = await apiRequest('POST', '/api/linkclientscoaches', _data);
            console.log(this.data.coaches);
            this.calculate(this.data);
        },
        calculate(data){
            
            Array.from(data.coaches).map((coach, index) => {
                var result = 0;
                Array.from(coach.clients).map( client => {
                    result += coach.rating * client.rate;
                })
                this.total += result;
                this.results[index] = result;
            })
        },
        formatNumber(num){
            return (Math.round(num * 100) / 100).toFixed(2);
        }
        
    },
    created() {
        this.getResults();
    },
}
</script>


<style>
    .tab{
        border-radius: 0.2rem 0.2rem 0 0;
        /* margin-left: 0.2rem; */
        border-left: 0.5px solid rgb(199, 199, 199);
        border-top: 0.5px solid rgb(199, 199, 199);
        border-right: 0.5px solid rgb(199, 199, 199);
    }

    .right{
        margin-left: 0.2rem;
    }

    .tabs{
        margin-left: 1rem;
    }

    .info{
        width: auto;
        margin: 0 1rem 1rem 1rem;
        border: 0.5px solid rgb(199, 199, 199);
    }

    .active{
        background-color: rgb(226, 226, 226);
    }

    .header{
        margin-top: 1rem;
    }

    .footer{
        padding-bottom: 1rem;
    }

    .summatory{
        background-color: rgb(240, 240, 240);
        font-size: 1.4rem;
    }
    .partial{
        background-color: rgb(247, 247, 247);
    }

    .coach-data{
        margin-top: 1rem;
    }
    .client-data{
        left: 3rem;
    }
    .partial-data{
        left: 3rem;
        font-size: 1.2rem;
    }

    .summatory-data{
        left: 5rem;
    }
    .chart{
        background-color: rgb(252, 248, 248);
    }
    .section{
        padding-top: 4rem;
    }
</style>