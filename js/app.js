// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

const $bolitaCarrito = document.querySelector(".bolita_carrito")
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     document.addEventListener("keyup", (e) => {
          if(e.target.matches("#input_filtrar")){
               filtrarCursos(e.target, ".card") //Pase el elemento input y el selector del elemento al cual le aplicare el filtrado
          }
     })
}


//evento para filtrar las cards segun la entrada en el input
//$input.addEventListener('keyup', filtrarCursos);


// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
          mensajeEmergente("El Curso ha sido agregado al carrito", "#1da83f")
     }
}

//Funcion que muestra una ventana emergente en pantalla por un periodo de tiempo para avisarle al usuario que realizo una accion en la pagina
function mensajeEmergente(mensaje, color){
     const elemento = document.createElement("div")
     elemento.textContent = mensaje
     elemento.classList.add("ventanaEmergente")
     elemento.style.background = color

     document.body.appendChild(elemento)

     setTimeout(()=>{
          document.body.removeChild(elemento)
     }, 3000)
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     limpiarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     verificarCantidadCarrrito()
     

}

function verificarCantidadCarrrito(){
     if(articulosCarrito.length>0){
          $bolitaCarrito.classList.remove("carrito_vacio")
     }else{
          $bolitaCarrito.classList.add("carrito_vacio")
     }
}

//Limpiar todos los elementos del carrito en el DOM
function limpiarCarrito(){
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
} 
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }

     articulosCarrito = []
     
     verificarCantidadCarrrito()
}


//Funcion que filtrara los cursos dependiendo de lo ingresado en el input
function filtrarCursos(input, card){
     document.querySelectorAll(card).forEach((cardItem) => {
          const $title = cardItem.children[1].firstElementChild

          $title.textContent.includes(input.value)
          ? cardItem.classList.remove("filter")
          : cardItem.classList.add("filter")
     })
}