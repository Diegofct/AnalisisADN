document.addEventListener('DOMContentLoaded', async() => {
    await loadCiudadano()
})

const btnCiudadano = document.getElementById('btn-ciudadano')
const btnAnalisis = document.getElementById('btn-analisis')

const mostrarLandingPage = () => {
    landing.innerHTML = `
    
        <div class="contenedor-principal-inicio">
            <div class="contenedor-izquierdo">
                <h1>Departamento Policía de Villa Chica</h1>
                <p>Servimos y protegemos a nuestra comunidad con honor y dedicación.</p>
            </div>
            <div class="contenedor-derecho">
                <img src="img/policia.jpeg" alt="escudo">
            </div>
        </div>    
    `
}

mostrarLandingPage()

seccionCiudadano.style.display = 'none'
divCiudadanosForm.style.display = 'none'
divListadoCiudadanos.style.display = 'none'
seccionAnalisisADN.style.display = 'none'

btnCiudadano.addEventListener('click', () => {
    landing.style.display = 'none'
    divCiudadanosForm.style.display = 'flex';
    divListadoCiudadanos.style.display = 'none';
    seccionAnalisisADN.style.display = 'none';
    seccionCiudadano.style.display = 'flex'
    mostrarFormularioCiudadano();
});

btnAnalisis.addEventListener('click', () => {
    landing.style.display = 'none'
    seccionCiudadano.style.display = 'none';
    divCiudadanosForm.style.display = 'none';
    seccionAnalisisADN.style.display = 'flex';
    mostrarFormularioAnalisis();
});
