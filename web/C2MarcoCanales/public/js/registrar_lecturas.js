//Listener BTN REGISTRAR
document.querySelector("#registrar-btn").addEventListener("click", async ()=>{
    
    //Extracción Valores
    let fecha = document.querySelector("#fecha-txt").value.trim();
    let hora = document.querySelector("#hora-txt").value.trim();
    let medidor = document.querySelector("#medidor-select").value.trim();
    let direccion = document.querySelector("#direccion-txt").value.trim();
    let valor = document.querySelector("#valor-txt").value.trim();
    let tipo = document.querySelector("#tipo-select").value.trim();

    //Validaciones
    let errores = [];
    if (valor<1){
        errores.push("Valor no puede ser inferior a 1");
    }else if (valor>500){
        errores.push("Valor no puede ser mayor a 500");
    }else if(hora===""){
        errores.push ("Debe ingresar una hora");
    }else if(hora.length!=5 || hora.charAt(2)!=':'){
        errores.push("Debe ingresar una hora valida con formato(HH:MM)");
    }
  

    //Si no hubieron errores
    if(errores.length == 0){

        let lectura = {};
        lectura.fecha = fecha;
        lectura.hora = hora;
        lectura.medidor = medidor;
        lectura.direccion = direccion;
        lectura.valor = valor;
        lectura.tipo = tipo;

        let res = await crearLectura(lectura); 
        await Swal.fire("Lectura Creada", "Lectura creada exitosamente", "info");   
        window.location.href = "mediciones_existentes";
    } else {
        //Mostrar errores
        Swal.fire({
            title: "Errores de validacion",
            icon: "warning",
            html: errores.join("<br />")
        });
    }
});