$(document).ready(function () {
    // Función para obtener todos los productos
    function obtenerProductos() {
        $.ajax({
            url: "https://localhost:44398/api/Productos",
            method: "GET",
            success: function (data) {
                if (data.length > 0) {
                    let html = "";
                    data.forEach(producto => {
                        html += `<tr>
                                    <td>${producto.pro_ProductoID}</td>
                                    <td>${producto.pro_Nombre}</td>
                                    <td>${producto.pro_Descripcion}</td>
                                    <td>$${producto.pro_Precio.toFixed(2)}</td>
                                    <td>${producto.pro_Stock}</td>
                                    <td>
                                        <img src="${producto.pro_Url}" alt="${producto.pro_Nombre}" style="width: 100px; height: auto; border-radius: 5px;">
                                    </td>
                                </tr>`;
                    });
                    $("#productosTable tbody").html(html);
                } else {
                    $("#productosTable tbody").html("<tr><td colspan='6'>No hay productos disponibles.</td></tr>");
                }
            },
            error: function (xhr) {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                $("#productosTable tbody").html("<tr><td colspan='6'>Error al cargar los productos.</td></tr>");
            }
        });
    }

    // Llamar automáticamente a la función al cargar la página
    obtenerProductos();
});
