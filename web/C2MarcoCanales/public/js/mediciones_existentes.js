const Eliminacion = async function(){
    let id = this.idLectura;
    let resp = await Swal.fire({title:"Esta seguro?", text:"Esta operacion es irreversible"
    , icon:"error", showCancelButton:true});
    if(resp.isConfirmed){

        //Eliminar
        if(await eliminarLectura(id)){
            let lecturas = await getLecturas();
            cargarTabla(lecturas);
            Swal.fire("Lectura Eliminada", "Lectura Eliminada Exitosamente", "info");
        }else {
            Swal.fire("Error", "No se pudo atender la solicitud", "error");
        }
    } else {
        Swal.fire("Cancelado", "Cancelado a peticion del usuario", "info");
    }
};





const cargarTabla = (lecturas)=>{
    let tbody = document.querySelector("#tbody-mediciones");
    tbody.innerHTML = "";

    for(let i=0; i < lecturas.length; ++i){

        let tr = document.createElement("tr");

        let tdFecha = document.createElement("td");
        tdFecha.innerText = lecturas[i].fecha;

        let tdHora = document.createElement("td");
        tdHora.innerText = lecturas[i].hora;

        let tdMedidor = document.createElement("td");
        tdMedidor.innerText = lecturas[i].medidor;

        let tdValor = document.createElement("td");

        //Define si valor va acompañado con kW/W/C
        if (lecturas[i].tipo=="Kilowatts"){
            tdValor.innerText = lecturas[i].valor + "kW";
        }else if(lecturas[i].tipo=="Watts"){
            tdValor.innerText = lecturas[i].valor + "W";
        }else if(lecturas[i].tipo=="Temperatura"){
            tdValor.innerText = lecturas[i].valor + "C";
        //Si valor es mayor a 60 se pone el fuego (esta dentro de validacion de que es temperatura)
            if(lecturas[i].valor>60){
                tdValor.classList.add("fas", "fa-fire")
            }
        }
 

        let tdAcciones = document.createElement("td");
        let botonEliminar = document.createElement("button");   
        botonEliminar.innerText= "Descartar Lectura";
        botonEliminar.classList.add("btn","btn-danger");
        botonEliminar.idLectura =lecturas[i].id;       
        botonEliminar.addEventListener("click", Eliminacion);
        tdAcciones.appendChild(botonEliminar);

        //Agregar a tabla
        tr.appendChild(tdFecha);
        tr.appendChild(tdHora);
        tr.appendChild(tdMedidor);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);
    }

};



//listener al filtro
document.querySelector("#filtro-cbx").addEventListener("change", async ()=>{
    let filtro = document.querySelector("#filtro-cbx").value;
    let lecturas = await getLecturas(filtro);
    cargarTabla(lecturas);
});


//cuando se carga
document.addEventListener("DOMContentLoaded", async ()=>{
    let lecturas = await getLecturas();
    cargarTabla(lecturas);
});