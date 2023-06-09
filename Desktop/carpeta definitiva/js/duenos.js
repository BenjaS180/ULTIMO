const listaDuenos = document.getElementById('lista-duenos');
const pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido= document.getElementById('apellido');
const indice = document.getElementById('indice')
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');



let duenos = [
  {
    nombre: "Leila",
    apellido: "Tuleila",
    pais: "Chile",
    identificacion: "20.224.424-5",
  }
  ,
  {
    nombre: "Alonso",
    apellido: "Ramos",
    pais: "Chile",
    identificacion: "20.232.123-5",
  }
];


function listarDuenos() {
    const htmlDuenos = duenos.map((dueno, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellido}</td>
        <td>${dueno.pais}</td>
        <td>${dueno.identificacion}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");
    listaDuenos.innerHTML = htmlDuenos;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index))
}


function enviarDatos(evento){
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value,
    };
    const accion = btnGuardar.innerHTML;
    switch(accion) {
        case 'Editar':
            duenos[indice.value] = datos;
            break;
        default:
            duenos.push(datos);
            break;
            
    }
    listarDuenos();
    resetModal();

}

function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle');
        const dueno = dueno[index];
        indice.value = index;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        pais.value = dueno.pais;
        identificacion.value = dueno.identificacion
    }
}


function resetModal(){
    indice.value = '';
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index){
    return function clickEnEliminar(){
       console.log('index',index)
       duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
       listarDuenos()
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;