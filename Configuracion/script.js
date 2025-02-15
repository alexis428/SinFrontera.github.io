document.addEventListener("DOMContentLoaded", () => {
    const configPanel = document.createElement("div");
    configPanel.className = "config-panel bg-white p-6 rounded-lg shadow-md mt-6";
    configPanel.innerHTML = `
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Configuración del Sistema</h2>
        <form id="config-form" class="space-y-4">
            <label class="block">Nombre del Negocio:
                <input type="text" id="negocio-nombre" class="input-field" placeholder="Nombre del negocio">
            </label>
            <label class="block">Moneda:
                <select id="moneda" class="input-field">
                    <option value="USD">Dólares ($)</option>
                    <option value="ARS">Pesos Argentinos (ARS)</option>
                    <option value="EUR">Euros (€)</option>
                </select>
            </label>
            <label class="block">Tema del Panel:
                <select id="tema" class="input-field">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                </select>
            </label>
            <label class="block">Notificaciones:
                <input type="checkbox" id="notificaciones" class="mr-2"> Activar Notificaciones
            </label>
            <label class="block">Idioma:
                <select id="idioma" class="input-field">
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="fr">Francés</option>
                </select>
            </label>
            <label class="block">Modo de Visualización de Datos:
                <select id="modo-datos" class="input-field">
                    <option value="tabla">Tabla</option>
                    <option value="graficos">Gráficos</option>
                </select>
            </label>
            <button type="submit" class="btn-primary">Guardar Configuración</button>
        </form>
    `;
    
    document.body.appendChild(configPanel);
    
    const configForm = document.getElementById("config-form");
    const negocioNombreInput = document.getElementById("negocio-nombre");
    const monedaSelect = document.getElementById("moneda");
    const temaSelect = document.getElementById("tema");
    const notificacionesCheckbox = document.getElementById("notificaciones");
    const idiomaSelect = document.getElementById("idioma");
    const modoDatosSelect = document.getElementById("modo-datos");

    // Cargar configuración guardada
    negocioNombreInput.value = localStorage.getItem("negocioNombre") || "";
    monedaSelect.value = localStorage.getItem("moneda") || "USD";
    temaSelect.value = localStorage.getItem("tema") || "light";
    notificacionesCheckbox.checked = localStorage.getItem("notificaciones") === "true";
    idiomaSelect.value = localStorage.getItem("idioma") || "es";
    modoDatosSelect.value = localStorage.getItem("modoDatos") || "tabla";

    configForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        localStorage.setItem("negocioNombre", negocioNombreInput.value.trim());
        localStorage.setItem("moneda", monedaSelect.value);
        localStorage.setItem("tema", temaSelect.value);
        localStorage.setItem("notificaciones", notificacionesCheckbox.checked);
        localStorage.setItem("idioma", idiomaSelect.value);
        localStorage.setItem("modoDatos", modoDatosSelect.value);

        alert("Configuración guardada con éxito");
    });
});
