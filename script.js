document.addEventListener("DOMContentLoaded", () => {
    const ventasList = document.getElementById("ventas-list");
    const ventaForm = document.getElementById("venta-form");
    const ventasChartCtx = document.getElementById("ventas-chart").getContext("2d");

    let ventasData = [];
    let chart;

    function actualizarGrafico() {
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ventasChartCtx, {
            type: "bar",
            data: {
                labels: ventasData.map(v => v.cliente),
                datasets: [{
                    label: "Cantidad de Bidones",
                    data: ventasData.map(v => v.cantidad),
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function agregarVenta(cliente, cantidad, pago) {
        const li = document.createElement("li");
        li.textContent = `${cliente} - ${pago === "si" ? "Pagado" : "Debe"}`;
        li.className = pago === "si" ? "text-green-600" : "text-red-600";
        ventasList.appendChild(li);

        ventasData.push({ cliente, cantidad, pago });
        actualizarGrafico();
    }

    ventaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const cliente = document.getElementById("cliente").value.trim();
        const cantidad = parseInt(document.getElementById("cantidad").value, 10);
        const pago = document.getElementById("pago-recibido").value;

        if (cliente && cantidad > 0) {
            agregarVenta(cliente, cantidad, pago);
            ventaForm.reset();
        } else {
            alert("Ingrese datos válidos.");
        }
    });
});
