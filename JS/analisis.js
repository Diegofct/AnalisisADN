const mostrarFormularioAnalisis = () => {
    
    seccionAnalisisADN.innerHTML = "";

    seccionAnalisisADN.innerHTML = `
        <div class="contenedor-analisis">
            <form>
                <h1>Analizar ADN</h1>
                <input type="text" class="form-control" id="adnInput" placeholder="Insertar ADN: 100010100101...." required />
                <button class="btn btn-success mt-3" type="button" onclick="sospechoso()">Enviar</button>
            </form>

            <div id="resultados">
                <h2>Resultados:</h2>
                <ul id="personas"></ul>
            </div>
        </div>
    `
}

const sospechoso = () => {

    const secuenciaADN = document.getElementById("adnInput").value.trim();

    if (secuenciaADN.length !== 20) {
        alert("La secuencia de ADN debe tener una longitud de 20 caracteres.");
        return;
    }

    const arrayADN = Array.from(secuenciaADN).map(Number);

    const similitudes = [];
    for (const ciudadano of listaCiudadano) {
        let similitud = 0;
        for (let i = 0; i < 20; i++) {
            if (ciudadano.codigo_adn[i] == arrayADN[i]) {
                similitud++;
            }
        }
        similitud = (similitud / 20) * 100;
        similitudes.push({ nombre: ciudadano.nombre_completo, similitud: similitud });

    }

    similitudes.sort((a, b) => b.similitud - a.similitud);

    const listaPersonas = document.getElementById("personas");
    listaPersonas.innerHTML = "";
    similitudes.slice(0, 5).forEach(persona => {
        const elementoLista = document.createElement("li");
        elementoLista.textContent = `${persona.nombre} ${persona.similitud.toFixed(2)}%`;
        listaPersonas.appendChild(elementoLista);
    });
};
