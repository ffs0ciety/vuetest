

async function apiRequest(type, path, params, mode, credentials){
    let exit;
    try {
        await fetch(path, {
            method: type,
            headers: {
                // 'Access-Control-Allow-Origin':'http://localhost:8080/',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params),
            mode: mode,
            credentials: credentials,
            })
            .then( response => {
    
        
                return response.json()      
            }).then(data => {
                
                exit = data;
            })          
    } catch (error) {
        console.log(error);
    }
    return exit;
}

export  {apiRequest}