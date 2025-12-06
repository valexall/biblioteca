// Simulación: Establecemos fechas por defecto al cargar
document.addEventListener("DOMContentLoaded", () => {
    // Simulamos que venció AYER (para probar la sanción fácilmente)
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);

    // Formatear a YYYY-MM-DD para los inputs HTML
    document.getElementById("fechaActual").value = hoy.toISOString().split('T')[0];
    document.getElementById("fechaVencimiento").value = ayer.toISOString().split('T')[0];
});

function registrarDevolucion() {
    // 1. Obtener valores del formulario
    const fechaVencimientoStr = document.getElementById("fechaVencimiento").value;
    const fechaActualStr = document.getElementById("fechaActual").value;
    const esDeteriorado = document.getElementById("checkDeteriorado").checked;

    // Convertir a objetos Date para comparar
    const fechaVencimiento = new Date(fechaVencimientoStr);
    const fechaActual = new Date(fechaActualStr);

    // Elementos de UI para mostrar resultados
    const resultadoBox = document.getElementById("resultado");
    const msgEstadoLibro = document.getElementById("msgEstadoLibro");
    const alertaSancion = document.getElementById("alertaSancion");
    const msgSancion = document.getElementById("msgSancion");
    const spanFechaFin = document.getElementById("fechaFinCastigo");

    // Limpiar estados previos
    resultadoBox.classList.remove("hidden");
    alertaSancion.classList.add("hidden");
    msgSancion.innerHTML = "✅ Socio habilitado (Devolución a tiempo)";
    msgSancion.style.color = "green";

    // --- LÓGICA 1: ESTADO DEL LIBRO (RN-05) ---
    if (esDeteriorado) {
        msgEstadoLibro.innerHTML = "❌ <strong>LIBRO DETERIORADO:</strong> Se retira de inventario y se envía a reparación.";
        msgEstadoLibro.style.color = "red";
    } else {
        msgEstadoLibro.innerHTML = "📚 <strong>LIBRO EN BUEN ESTADO:</strong> Disponible para préstamo inmediato.";
        msgEstadoLibro.style.color = "#333";
    }

    // --- LÓGICA 2: REGLA DE SANCIÓN (RN-06 - EXAMEN) ---
    // Si la fecha actual es mayor que la de vencimiento
    if (fechaActual > fechaVencimiento) {
        
        // Calcular 15 días de castigo
        const diasSancion = 15;
        const fechaFinSuspension = new Date(fechaActual);
        fechaFinSuspension.setDate(fechaFinSuspension.getDate() + diasSancion);

        // Formatear fecha para mostrar
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaLegible = fechaFinSuspension.toLocaleDateString('es-ES', opcionesFecha);

        // Mostrar Sanción en pantalla
        msgSancion.innerHTML = ""; // Limpiamos el mensaje verde
        alertaSancion.classList.remove("hidden");
        spanFechaFin.textContent = fechaLegible;
        
        console.log("SISTEMA: Socio suspendido por morosidad.");
    } 
    
    console.log("SISTEMA: Transacción finalizada.");
}