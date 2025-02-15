document.addEventListener("DOMContentLoaded", () => {
    const clientesTable = document.getElementById("clientes-table");

    const clientes = [
        { nombre: "Juan Pérez", bidones: 5, pagado: "Sí" },
        { nombre: "María López", bidones: 3, pagado: "No" },
        { nombre: "Carlos Gómez", bidones: 8, pagado: "Sí" },
        { nombre: "Ana Torres", bidones: 2, pagado: "No" }
    ];

    function renderClientes() {
        clientesTable.innerHTML = "";
        clientes.forEach(cliente => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border p-2">${cliente.nombre}</td>
                <td class="border p-2">${cliente.bidones}</td>
                <td class="border p-2 ${cliente.pagado === 'Sí' ? 'text-green-600' : 'text-red-600'}">${cliente.pagado}</td>
            `;
            clientesTable.appendChild(row);
        });
    }

    renderClientes();
});
