document.addEventListener("DOMContentLoaded", () => {
    const ventaForm = document.getElementById("venta-form");
    const ventasList = document.getElementById("ventas-list");
    const filtroCliente = document.getElementById("filtro-cliente");
    const filtroPago = document.getElementById("filtro-pago");
    const filtrarVentasBtn = document.getElementById("filtrar-ventas");
    const cantidadInput = document.getElementById("cantidad");
    const precioTotalInput = document.getElementById("precio-total");
    const ventas = [];

    function calcularPrecioTotal() {
        const cantidad = parseInt(cantidadInput.value) || 0;
        const precioPorUnidad = 2500; // Ajusta el precio por bidón según sea necesario
        precioTotalInput.value = cantidad * precioPorUnidad;
    }

    cantidadInput.addEventListener("input", calcularPrecioTotal);

    function agregarVenta(venta) {
        ventas.push(venta);
        actualizarListaVentas();
        actualizarGrafico();
    }

    function actualizarListaVentas() {
        ventasList.innerHTML = "";
        ventas.forEach((venta, index) => {
            const li = document.createElement("li");
            li.className = "venta-item";
            li.innerHTML = `${venta.fecha} - ${venta.cliente} - ${venta.cantidad} Bidones - $${venta.precioTotal} - ${venta.pago ? 'Pagado' : 'Pendiente'}
                <button onclick="eliminarVenta(${index})" class="text-red-500 hover:text-red-700">❌</button>`;
            ventasList.appendChild(li);
        });
    }

    function eliminarVenta(index) {
        ventas.splice(index, 1);
        actualizarListaVentas();
        actualizarGrafico();
    }

    ventaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nuevaVenta = {
            fecha: document.getElementById("fecha").value,
            cliente: document.getElementById("cliente").value,
            cantidad: parseInt(document.getElementById("cantidad").value) || 0,
            precioTotal: parseInt(precioTotalInput.value) || 0,
            pago: document.getElementById("pago-recibido").value === "si"
        };
        agregarVenta(nuevaVenta);
        ventaForm.reset();
        precioTotalInput.value = "";
    });

    filtrarVentasBtn.addEventListener("click", () => {
        const clienteFiltro = filtroCliente.value.toLowerCase();
        const pagoFiltro = filtroPago.value;
        ventasList.innerHTML = "";
        ventas.filter(venta => {
            const coincideCliente = clienteFiltro === "" || venta.cliente.toLowerCase().includes(clienteFiltro);
            const coincidePago = pagoFiltro === "" || (venta.pago ? "si" : "no") === pagoFiltro;
            return coincideCliente && coincidePago;
        }).forEach((venta, index) => {
            const li = document.createElement("li");
            li.className = "venta-item";
            li.innerHTML = `${venta.fecha} - ${venta.cliente} - ${venta.cantidad} Bidones - $${venta.precioTotal} - ${venta.pago ? 'Pagado' : 'Pendiente'}
                <button onclick="eliminarVenta(${index})" class="text-red-500 hover:text-red-700">❌</button>`;
            ventasList.appendChild(li);
        });
    });

    let ventasChart;
    function actualizarGrafico() {
        const ctx = document.getElementById("ventas-chart").getContext("2d");
        if (ventasChart) ventasChart.destroy();
        const pagados = ventas.filter(v => v.pago).reduce((acc, v) => acc + v.cantidad, 0);
        const pendientes = ventas.filter(v => !v.pago).reduce((acc, v) => acc + v.cantidad, 0);
        ventasChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Pagado", "Pendiente"],
                datasets: [{
                    label: "Cantidad de Bidones Vendidos",
                    data: [pagados, pendientes],
                    backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
                    borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
    actualizarGrafico();
});
