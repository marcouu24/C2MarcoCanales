//Crear Lectura
const crearLectura = async (lectura)=>{ 
    
    let resp = await axios.post("api/lecturas/post", lectura, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return resp.data;
};


//Get Lecturas
const getLecturas = async (filtro ="todos")=>{
    let resp;
    if(filtro == "todos"){
        resp = await axios.get("api/lecturas/get");
    }else {
        resp = await axios.get(`api/lecturas/filtrar?filtro=${filtro}`);
    }
    return resp.data;
};


//Eliminar Lectura
const eliminarLectura = async(id)=>{
    try{
        let resp = await axios.post("api/lecturas/delete", {id}, {
            headers:{
                "Content-Type": "application/json"
            }
        });
        return resp.data == "ok";
    }catch(e){
        return false;
    }
};