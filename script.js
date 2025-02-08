document.getElementById('venta-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fecha = document.getElementById('fecha').value;
  const cliente = document.getElementById('cliente').value;
  const number = document.getElementById('number').value;
  const cantidad = document.getElementById('cantidad').value;
  const text = document.getElementById('text').value;
  const pago = document.getElementById('pago').value;

  const clienteEntry = document.createElement('li');
  clienteEntry.textContent = `Fecha: ${fecha}, Cliente: ${cliente}, Bidones: ${number}, Cantidad: ${cantidad}, Metodo: ${text} Pago: ${pago === 'si' ? 'Recibido' : 'Pendiente'}`;
  clienteEntry.classList.add(pago === 'si' ? 'text-green-600' : 'text-red-600');

  document.getElementById('clientes-list').appendChild(clienteEntry);

  // Limpiar formulario
  document.getElementById('venta-form').reset();
});