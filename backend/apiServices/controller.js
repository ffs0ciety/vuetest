const fileManager = require('../microservices/FileManager')

exports.getData = (req, res) => {
    let data = fileManager.getFile();
    res.json(data);    
}

exports.linkClientsCoaches = (req, res) => {

    //Con los clientes previamente ordenados obtenemos una configuración optima
    let clients = Array.from(req.body.clients).sort(compareClientes);
    //Con los clientes en orden de llegada obtenemos una configuración no optima pero aceptable
    // let clients = req.body.clients;
    let coaches = req.body.coaches;
    let unassignedClients = [];

    Array.from(clients).map(client => {
        var closestCoach = closest(client.rate, coaches);
        if(closestCoach != undefined ){
            closestCoach.clients.push(client);
        }
        else{unassignedClients.push(client)}
    })

    let data = {
        coaches: coaches,
        unassignedClients: unassignedClients
    }
    console.log(data);
    res.json(data);
}

exports.test = (req,res) => {
    
    res.json('keloke')
}



function closest(rate, coaches){
    let closestCoach;
    //Primero ordenamos de mayor a menor los entrenadores, luego filtramos para quedarnos solamente con los que tienen huecos disponibles
    // console.log("rate", rate/2);
    let coachesSorted = Array.from(coaches).sort(compareCoaches).filter(
            coach => coach.maxClients > coach.clients.length
        ).some(coach => {
            if(coach.rating < rate/2 && closestCoach != undefined){
                // console.log("entra");
                return true;
            }
            else{
                closestCoach = coach;
                return false;
            }
        })
    return closestCoach;
    
    // console.log("closest", closestCoach)
}

function compareClientes(a, b) {
    let exit = 0;
    if (a.rate > b.rate) {
      exit = 1;
    } else if (a.rate < b.rate) {
      exit = -1;
    }
    return exit*-1;
  }
function compareCoaches(a, b) {
    let exit = 0;
    if (a.rating > b.rating) {
      exit = 1;
    } else if (a.rating < b.rating) {
      exit = -1;
    }
    return exit*-1;
  }


