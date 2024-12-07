$(document).ready(function() {
    // Función para obtener todas las facturas
    function obtenerFacturas() {
        $.get("https://localhost:44398/api/Facturas", function(data) {
            let html = "";
            data.forEach(factura => {
                html += `<tr>
                            <td>${factura.fac_FacturaID}</td>
                            <td>${factura.fac_cli_Cedula}</td>
                            <td>${factura.fac_FechaFactura}</td>
                            <td>${factura.fac_Total}</td>
                            <td>${factura.fac_Estado}</td>
                          </tr>`;
            });
            $("#facturasTable tbody").html(html);
        });
    }

    // Obtener facturas al cargar la página
    obtenerFacturas();
});
