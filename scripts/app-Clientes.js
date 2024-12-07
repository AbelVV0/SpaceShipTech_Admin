$(document).ready(function() {
    // Función para obtener todos los clientes
    function obtenerClientes() {
        $.get("https://localhost:44398/api/Clientes", function(data) {
            //$.get("https://localhost:44398/api/Clientes", function(data) {
            let html = "";
            data.forEach(cliente => {
                html += `<tr>
                            <td>${cliente.cli_Cedula}</td>
                            <td>${cliente.cli_Nombre}</td>
                            <td>${cliente.cli_Email}</td>
                            <td>${cliente.cli_Telefono}</td>
                            <td>${cliente.cli_Direccion}</td>
                            <td>${cliente.cli_Ciudad}</td>
                          </tr>`;
            });
            $("#clientesTable tbody").html(html);
            
            // Llamar a la función para generar el gráfico después de obtener los datos
            generarGrafico(data);
        });
    }

    // Obtener clientes al cargar la página
    obtenerClientes();

    // Lógica para el formulario de guardar cliente
    $("#clienteForm").submit(function(e) {
        e.preventDefault();

        let nuevoCliente = {
            cli_Cedula: $("#cli_Cedula").val(),
            cli_Nombre: $("#cli_Nombre").val(),
            cli_Email: $("#cli_Email").val(),
            cli_Telefono: $("#cli_Telefono").val(),
            cli_Direccion: $("#cli_Direccion").val(),
            cli_Ciudad: $("#cli_Ciudad").val()
        };

        $.ajax({
            url: "https://localhost:44398/api/Clientes",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevoCliente),
            success: function(response) {
                alert(response.message);
                obtenerClientes(); // Refrescar la lista de clientes
            },
            error: function() {
                alert("Error al guardar el cliente.");
            }
        });
    });

    // Función para generar el gráfico de clientes por ciudad
    // Función para generar el gráfico de clientes por ciudad
function generarGrafico(clientes) {
    // Contamos la cantidad de clientes por ciudad
    const conteoCiudades = clientes.reduce((acc, cliente) => {
        acc[cliente.cli_Ciudad] = acc[cliente.cli_Ciudad] ? acc[cliente.cli_Ciudad] + 1 : 1;
        return acc;
    }, {});

    // Extraemos las ciudades y la cantidad de clientes por ciudad
    const ciudades = Object.keys(conteoCiudades);
    const cantidadClientes = Object.values(conteoCiudades);

    // Crear el gráfico de barras
    const ctx = document.getElementById('clientesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (puede ser 'line', 'bar', 'pie', etc.)
        data: {
            labels: ciudades, // Etiquetas (en este caso, las ciudades)
            datasets: [{
                label: 'Número de Clientes',
                data: cantidadClientes, // Datos (la cantidad de clientes por ciudad)
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Color para cada barra
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Borde para cada barra
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, // Hacer que el gráfico sea responsivo
            maintainAspectRatio: false, // Permitir que el gráfico cambie su aspecto
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Asegura que los pasos en el eje Y sean de 1
                        font: {
                            size: 18 // Aumentamos el tamaño de las etiquetas del eje Y
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 18, // Aumentamos el tamaño de las etiquetas del eje X
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 50, // Aumentamos el tamaño de las etiquetas de la leyenda
                            weight: 'bold'
                        },
                        color: '#333333' // Color de las etiquetas de la leyenda
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para los tooltips
                    titleFont: {
                        weight: 'bold',
                        size: 20 // Aumentamos el tamaño del título del tooltip
                    },
                    bodyFont: {
                        size: 18 // Aumentamos el tamaño del texto del tooltip
                    }
                }
            }
        }
    });
}


});
