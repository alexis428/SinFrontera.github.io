document.addEventListener("DOMContentLoaded", () => {
    const totalVentasElement = document.getElementById("total-ventas");
    const totalBidonesElement = document.getElementById("total-bidones");
    const ingresosElement = document.getElementById("ingresos");
    const pendientesElement = document.getElementById("pendientes");

    // Datos simulados
    let datosVentas = [
        { cliente: "Juan Pérez", bidones: 5, pago: true, monto: 5000 },
        { cliente: "Ana Gómez", bidones: 3, pago: false, monto: 3000 },
        { cliente: "Carlos López", bidones: 8, pago: true, monto: 8000 },
        { cliente: "María García", bidones: 2, pago: false, monto: 2000 }
    ];

    function actualizarDashboard() {
        let totalVentas = datosVentas.length;
        let totalBidones = datosVentas.reduce((acc, venta) => acc + venta.bidones, 0);
        let ingresos = datosVentas.reduce((acc, venta) => acc + (venta.pago ? venta.monto : 0), 0);
        let pagosPendientes = datosVentas.filter(venta => !venta.pago).length;
        
        totalVentasElement.textContent = totalVentas;
        totalBidonesElement.textContent = totalBidones;
        ingresosElement.textContent = `$${ingresos}`;
        pendientesElement.textContent = pagosPendientes;
    }

    actualizarDashboard();

    // Gráfico de ventas
    const ctx = document.getElementById("ventasChart").getContext("2d");
    const ventasChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: datosVentas.map(venta => venta.cliente),
            datasets: [{
                label: "Bidones Comprados",
                data: datosVentas.map(venta => venta.bidones),
                backgroundColor: "#2563eb"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
