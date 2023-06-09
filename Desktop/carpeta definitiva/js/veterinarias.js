const listaVeterinarias = document.getElementById('lista-veterinarias');
const pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido= document.getElementById('apellido');
const indice = document.getElementById('indice')
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');



let veterinarias = [
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


function listarVeterinarias() {
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>${veterinaria.pais}</td>
        <td>${veterinaria.identificacion}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML = htmlVeterinarias;
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
            veterinarias[indice.value] = datos;
            break;
        default:
            veterinarias.push(datos);
            break;
            
    }
    listarVeterinarias();
    resetModal();

}

function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle');
        const veterinaria = veterinarias[index];
        indice.value = index;
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        identificacion.value = veterinaria.identificacion
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
       veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria !== index);
       listarVeterinarias()
    }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;