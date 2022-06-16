const alerts = document.getElementById("alerts");
const btn_agregar = document.getElementById("btn-agregar");

alerts.addEventListener('click', (e)=>{eliminarProducto(e)});

btn_agregar.addEventListener("click",function(){
    let materiales = document.getElementById("materiales").value;
    let fecha = document.getElementById("fecha").value;
    let id = obtenerProductosLocalStorage().length;
    if (materiales == "" || fecha == "") {
        let alert_contenedor = document.getElementById("alert-formulario");
        alert_contenedor.innerHTML = 
        `
            <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alert-error">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Debes ingresar todos los datos primero.</strong> 
            </div>
      `;
    } else {
        let activiad = {id:id, materiales:materiales,fecha:fecha}
        guardarProductosLocalStorage(activiad);
        // Formatear input después de agregar al LS
        materiales = document.getElementById("materiales").value="";
        fecha = document.getElementById("fecha").value="";
        let alert_contenedor = document.getElementById("alert-formulario");
        alert_contenedor.innerHTML = 
        `
            <div class="alert alert-primary alert-dismissible fade show" role="alert" id="alert-error">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Tarea registrada.</strong> 
            </div>
      `;
    }
})
let btn_mostrar = document.getElementById("btn-mostrar");
btn_mostrar.addEventListener("click",function(){
    pintrAlerts();
});
function pintrAlerts(){
    const auxiliar = document.createElement("div");
    const alerts = document.getElementById("alerts");
    let dataLS = obtenerProductosLocalStorage();
    dataLS.forEach((element,index)=>{
        const div = document.createElement("div");
        div.className= "alert alert-primary ";
        div.innerHTML = `
                        <strong>${element.fecha}</strong>
                        <br>
                        <strong>${element.materiales}</strong>
                        <br>
                        <div class="boton-eliminar text-end">
                        <button type="button" class="btn-close  bg-primary p-2 borrar-producto" aria-label="Close" id="${index}"></button>
                        </div>
    
    `;
        
        auxiliar.appendChild(div);
    });
    alerts.innerHTML = "";
    alerts.appendChild(auxiliar);
}



function guardarProductosLocalStorage(actividad){
    let actividades;
    //Toma valor de un arreglo con datos del LS
    actividades = obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    actividades.push(actividad);
    //Agregamos al LS
    localStorage.setItem('inventario', JSON.stringify(actividades));
}

//Comprobar que hay elementos en el LS
function obtenerProductosLocalStorage(){
    let actividadesLS;

    //Comprobar si hay algo en LS
    if(localStorage.getItem('inventario') === null){
        actividadesLS = [];
    }
    else {
        actividadesLS = JSON.parse(localStorage.getItem('inventario'));
    }
    return actividadesLS;
}
function eliminarProducto(e) {
    
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        let producto = e.target.parentElement.parentElement;
        
        let productoID = producto.querySelector('button').id;
        // console.log('poroductoID :>> ', productoID);

        eliminarProductoLocalStorage(parseInt(productoID));
    }

    
}
function eliminarProductoLocalStorage(productoID){
    let productosLS;
    //Obtenemos el arreglo de productos
    productosLS = obtenerProductosLocalStorage();
    //Comparar el id del producto borrado con LS
    productosLS.forEach(function(productoLS, index){
   

        if(productoLS.id === productoID){

            productosLS.splice(index, 1);
            
        }}
         //Añadimos el arreglo actual al LS
    );
    localStorage.setItem('inventario', JSON.stringify(productosLS));
}
