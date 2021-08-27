<template>
    <div>
        <div class="card border-light mb-3" style="max-width: 18rem;">
            <div class="card-header">

                <div class="row justify-content-between align-items-center">
                    <div class="col-auto">
                        Entrenador {{number}}
                    </div>
                    <div class="col-auto">
                        <img class="info-btn" src="../assets/info_black_24dp.svg" alt="">
                        <div class="info">
                            <p><b>Valoración:</b> {{rating}}</p>
                            <p><b>Máx clientes:</b> {{maxClients}}</p>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="card-body text-left">
                <div class="row">
                    <div class="col-3">
                        <img class="profile-img" src="https://cdn-cmalj.nitrocdn.com/SLgBYfpBymCBytHkPXfOklANiffeDmlJ/assets/static/optimized/rev-f601d3d/wp-content/uploads/2021/06/2.jpg" alt="">
                    </div>
                
                    <div class="col-9">
                        <h5 class="card-title">{{name}}</h5>
                        <div class="card-text">
                            Clientes asignados:
                            <div class="list">
                                <div v-for="client in clients.slice(0, n)" :key="client" class="card-text">- Cliente {{client.name}}</div>
                            </div>
                            <button @click="showMore" class="btn showMore" v-if="show">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">{{clients.length}} clientes asignados</div>
            </div>
    </div>
</template>

<script>


export default {
    props: ['id','number' ,'name', 'rating', 'maxClients', 'clients'],
    data() {
        return {
            show: false,
            n: 0
            
        }
    },
    methods: {
        showMore(){
            this.show = false;
            this.n = this.clients.length;
        }
       
    },
    created() {
        if(this.clients.length > 4){
            this.n = 3;
            this.show = true;
        }
        else this.n = this.clients.length;
    },
}

</script>


<style scoped>
    .card{
        width: 15rem;
        min-height: 19rem;
        margin: 1rem;
    }

    .showMore{
        background-color: rgb(211, 211, 211);
        font-size: 0.7rem;
    }

    .info{
        z-index: 10;
        visibility: hidden;
        background-color: black;
        color: white;
        font-size: 0.7rem;
        position: absolute;
        width: 8rem;
        left: -5rem;
        text-align: start;
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        padding: 0.4rem 1rem 0rem 1rem;
    }

    .info-btn:hover + .info {
        visibility: visible;
    }

    .profile-img{
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
    }
    .card-title{
        margin-top: 0.3rem;
    }
    .test{
        background-color: red;
    }



</style>