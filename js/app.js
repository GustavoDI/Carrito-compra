// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
/**
 * registrarEventListeners como funcion permite registrar todo los eventos y no se esten
 * realizando uno por uno
 * 
 * listaCursos esta hubicado en linea 84 y selecciona el id de los cards que muestran los 
 * cursos disponibles.
 *  se utiliza una funcion agrega curso que recibe un evento, este evento no sayudara a prevenir
 *  errores.
 *  además para evitar el efecto bubling que se pueda provocar debemos apuntar a una classlist la
 *  contenga agregar carrito para al momento de hacer click en agregar carrito solamente se realice 
 *  esta acción. 
 *  paraente element lo utilizamos dos veces para poder acceder al elemento padre
    que contiene el agregar carrito y de esta forma seleccionar la informacion que
    tiene el card.
 * 
 * carrito esta hubicado en la barra donde aparece la imagen de un carro, ademas seran mostrados los
 * elementos en el carrito
 * 
 * listaCarrito donde esta ran alojados las selecciones del carrito
 */

//mandar a llamar
registrarEventListeners();
function registrarEventListeners() {
    // agregando un curso al pulsar "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // eliminando cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciando carrito compra
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];//resetenado el arreglo
        limpiarHTML();
    });
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log('presionando en cursos');
        let cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
}

// eliminar curso
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {

        // console.log(e.target.getAttribute('data-id'));
        // eliminar articulos del carrito por el data id
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
    }
}

// leer el contenido html al que damos click
function leerDatosCurso(curso) {
    // console.log(curso);
    // crear un objeto con el contenido actual del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:     curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    // revisando si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // actulizar la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    
    // agregando elementos al arreglo de articulos del carrito
    
    console.log(articulosCarrito);
    carritoHTML()
}

// Muestra el carrito de compras en el html
function carritoHTML() {
    // limpiar el html
    limpiarHTML();
    // Recorrer los articulos del carrito
    articulosCarrito.forEach(curso=>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <th>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> 
                    X
                </a>
            </th>
            `;
        // agregando HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    });

    /**cuando se utiliza appendchild se agregando al final del arreglo
     * pero no elimina los que actualmente ya están provocando que aparezcan duplicados
     * para corregir esto debemos limpiar nuestro contenedor del carrito
     */
}

// limpiar carrito html
function limpiarHTML() {
    // forma lenta de limpiar html
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}