const landing = document.getElementById('inicio')
const seccionCiudadano = document.getElementById('ciudadanos')
const divCiudadanosForm = document.getElementById('ciudadanos-form')
const divListadoCiudadanos = document.getElementById('listado-ciudadanos')
const seccionAnalisisADN = document.getElementById('analisis-adn')

const listaCiudadano = []

const loadCiudadano = async() => {
    try {
        listaCiudadano.length=0;
        const respuesta = await fetch(`http://localhost:3000/ciudadanos`);

        if (!respuesta.ok) {
            throw new Error('Error al cargar los ciudadanos Estado: ',respuesta.status);
        }

        const ciudadanos = await respuesta.json();
        listaCiudadano.push(...ciudadanos)

    } catch (error) {
        console.error("Error al cargar los ciudadanos",error.message);
    }
}

const guardarCiudadano = async(nuevoCiudadano) => {
    try{
        const respuesta = await fetch('http://localhost:3000/ciudadanos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if(!respuesta.ok){
           throw new Error('Error al guardar el ciudadano. Estado: ',respuesta.status);
        }

        const ciudadanoGuardado = await respuesta.json();
        
        console.log('Ciudadano creado:', ciudadanoGuardado);

    } catch(error){
        console.error("Error al guardar ciudadano",error.message);
    }
}

const mostrarFormularioCiudadano = () => {
    divCiudadanosForm.innerHTML = `
        <h2>Módulo ciudadanos</h2>
        <form>
            <input type="text" id="nombre-ciudadano" placeholder="Nombre completo" required>
            <input type="text" id="codigo-adn" placeholder="Código de ADN" required>
            <input type="number" id="telefono-ciudadano" placeholder="Número de teléfono" required>
            <input type="text" id="direccion-ciudadano" placeholder="Dirección del ciudadano" required>
            <button class="btn btn-success mt-3" type="button" onClick="crearCiudadano()">Guardar</button>
            <button class="btn btn-primary mt-3" type="button" onClick="mostrarListadoCiudadanos()">Ver listado</button>
        </form>
    `
    divListadoCiudadanos.style.display = "none"
}

const crearCiudadano = async ()=>{
    const inputNombreCiudadano = document.getElementById('nombre-ciudadano').value;
    const codigoADN = document.getElementById('codigo-adn').value;
    const telefono = document.getElementById('telefono-ciudadano').value;
    const direccion = document.getElementById('direccion-ciudadano').value;

    if (!inputNombreCiudadano || !codigoADN || !telefono || !direccion) {
        alert('Por favor, completa todos los campos antes de guardar.');
        return;
    }

    const nuevoCiudadano={
        id:listaCiudadano.length+1,
        nombre_completo: inputNombreCiudadano,
        direccion: direccion,
        celular: telefono,
        codigo_adn: codigoADN
    }

  
    await guardarCiudadano(nuevoCiudadano);
    await loadCiudadano();
   
    inputNombreCiudadano.value='';
    codigoADN.value='';
    telefono.value='';
    direccion.value='';

    alert('Ciudadano guardado con éxito!');

    return nuevoCiudadano;

}

const mostrarListadoCiudadanos = async ()=>{
    await loadCiudadano();
    
    divCiudadanosForm.style.display='none';
    divListadoCiudadanos.style.display='flex';

    const ul=document.createElement('ul');

    for(const ciudadano of listaCiudadano){
        const li=document.createElement('li');
        li.textContent= `ID: ${ciudadano.id}, Nombre: ${ciudadano.nombre_completo}, Codigo ADN: ${ciudadano.codigo_adn}`;
        ul.appendChild(li);
    }

    divListadoCiudadanos.innerHTML='';
    divListadoCiudadanos.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverFormulario);
    divListadoCiudadanos.appendChild(volverButton);
    
}

const volverFormulario = () => {

    divListadoCiudadanos.style.display='none';
    divCiudadanosForm.style.display='flex';
    
}


