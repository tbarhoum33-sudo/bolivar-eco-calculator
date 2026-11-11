
function calcular() {
    const transporte = document.getElementById("transporte").value;
    const papelInput = document.getElementById("papel").value;
    const papel = Number(papelInput);
    const reciclaje = document.getElementById("reciclaje").value;

    if (papelInput.trim() === "" || !Number.isInteger(papel) || papel < 0) {
        alert("Ingresa una cantidad válida de hojas");
        return;
    }

    // CO2 estimado por día
    const emisiones = {
        bus: 1.5,
        privado: 4,
        compartido: 2,
        bici: 0
    };

    // Reciclaje
    const descuentos = {
        bajo: 0,
        medio: 0.05,
        alto: 0.10
    };

    // Calcular CO2 semanal (5 días)
    const co2 = ((emisiones[transporte] * 5) +
        (papel * 0.005 * 5)) *
        (1 - descuentos[reciclaje]);

    // Calcular Eco-Points
    const puntosTransporte = {
        bus: 20,
        privado: 0,
        compartido: 30,
        bici: 50
    };

    const puntosReciclaje = {
        bajo: 0,
        medio: 15,
        alto: 30
    };

    const puntosPapel = Math.max(0, 20 - papel);

    const puntos = Math.min(100,
        puntosTransporte[transporte] +
        puntosReciclaje[reciclaje] +
        puntosPapel
    );

    // Mostrar resultados
    document.getElementById("co2").textContent =
        "CO2 semanal: " + co2.toFixed(2) + " kg";

    document.getElementById("puntos").textContent =
        "Eco-Points: " + puntos + "/100";
}
