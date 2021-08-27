const fileManager = require('../microservices/FileManager')

exports.getData = (req, res) => {
    let data = fileManager.getFile();
    res.json(data);    
}

exports.linkClientsCoaches = (req, res) => {

    //Con los clientes previamente ordenados obtenemos una configuración optima
    let clients = Array.from(fileManager.getFile().clients).sort(compareClients);
    //Con los clientes en orden de llegada obtenemos una configuración no optima pero aceptable
    // let clients = req.body.clients;
    let coaches = req.body.coaches;
    let unassignedClients = [];

    if(!checkData(coaches)){
        let data = {
            msg:'Puede ser que no hayas hecho caso al aviso del rango o que he programado algo mal :/ . Prueba intentarlo de nuevo,'
        }
        res.status(400);
        res.json({data});
    }
    else{
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
        res.json(data);
    }

    
}



function closest(rate, coaches){
    let closestCoach;
    //Primero ordenamos de mayor a menor los entrenadores, luego filtramos para quedarnos solamente con los que tienen huecos disponibles
    let coachesSorted = Array.from(coaches).sort(compareCoaches).filter(
            coach => coach.maxClients > coach.clients.length
        ).some(coach => {
            if(coach.rating < rate/2 && closestCoach != undefined){
                return true;
            }
            else{
                closestCoach = coach;
                return false;
            }
        })
    return closestCoach;    
}

function compareClients(a, b) {
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

  function checkData(coaches){
    let ok = true;
    
    Array.from(coaches).map(coach => {
        if(coach.rating < 0 || coach.rating > 5) ok = false;
    })
    return ok;
  }


