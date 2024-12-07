$(document).ready(function () {
    // Función para obtener todos los detalles de factura
    function obtenerDetallesFactura() {
        $.ajax({
            url: "https://localhost:44398/api/DetallesFactura",
            method: "GET",
            success: function (data) {
                if (data.length > 0) {
                    let html = "";
                    data.forEach(detalle => {
                        html += `<tr>
                                    <td>${detalle.def_DetalleID}</td>
                                    <td>${detalle.def_FacturaID}</td>
                                    <td>${detalle.def_ProductoID}</td>
                                    <td>${detalle.def_Cantidad}</td>
                                    <td>${detalle.def_PrecioUnitario}</td>
                                    <td>${detalle.def_Total}</td>
                                </tr>`;
                    });
                    $("#detallesTable tbody").html(html);
                } else {
                    $("#detallesTable tbody").html("<tr><td colspan='5'>No hay detalles de factura disponibles.</td></tr>");
                }
            },
            error: function (xhr) {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                $("#detallesTable tbody").html("<tr><td colspan='5'>Error al cargar los detalles de las facturas.</td></tr>");
            }
        });
    }

    // Llamar automáticamente a la función al cargar la página
    obtenerDetallesFactura();
});
