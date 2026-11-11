
let currentLanguage = "es";
let hasCalculated = false;
let lastCO2 = null;
let lastPoints = null;

const translations = {
    es: {
        subtitle: "Calcula tu impacto ambiental",
        calculator: "🌍 Calculadora Ambiental",
        transport: "Transporte al colegio",
        bus: "Bus",
        private: "Carro privado",
        shared: "Carro compartido",
        bike: "Bicicleta/Caminando",
        paper: "Hojas usadas al día",
        recycling: "Nivel de reciclaje",
        low: "Bajo",
        medium: "Medio",
        high: "Alto",
        calculate: "🌿 Calcular impacto",
        results: "📊 Tus resultados",
        print: "🖨️ Imprimir / Guardar Reporte PDF",
        co2: "CO₂ semanal: ",
        points: "Eco-Points: ",
        certificate: "🌱 Certificado Ecológico",
        date: "Fecha: ",
        footer: "Comprometidos con un futuro sostenible",
        error: "Ingresa una cantidad válida de hojas.",
        calculateFirst: "Primero debes calcular tu impacto."
    },
    en: {
        subtitle: "Calculate your environmental impact",
        calculator: "🌍 Environmental Calculator",
        transport: "Transportation to school",
        bus: "Bus",
        private: "Private car",
        shared: "Shared car",
        bike: "Bicycle/Walking",
        paper: "Sheets of paper used per day",
        recycling: "Recycling level",
        low: "Low",
        medium: "Medium",
        high: "High",
        calculate: "🌿 Calculate impact",
        results: "📊 Your results",
        print: "🖨️ Print / Save PDF Report",
        co2: "Weekly CO₂: ",
        points: "Eco-Points: ",
        certificate: "🌱 Ecological Certificate",
        date: "Date: ",
        footer: "Committed to a sustainable future",
        error: "Enter a valid number of sheets.",
        calculateFirst: "Please calculate your impact first."
    }
};

function changeLanguage() {
    currentLanguage =
        document.getElementById("language").value;

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = translations[currentLanguage][key];
    });

    updateResults();
}

function calcular() {
    const transporte =
        document.getElementById("transporte").value;

    const papelInput =
        document.getElementById("papel").value;

    const papel = Number(papelInput);

    const reciclaje =
        document.getElementById("reciclaje").value;

    if (papelInput.trim() === "" ||
        !Number.isInteger(papel) || papel < 0) {
        alert(translations[currentLanguage].error);
        return false;
    }

    const emisiones = {
        bus: 1.5,
        privado: 4,
        compartido: 2,
        bici: 0
    };

    const descuentos = {
        bajo: 0,
        medio: 0.05,
        alto: 0.10
    };

    lastCO2 = (
        (emisiones[transporte] * 5) +
        (papel * 0.005 * 5)
    ) * (1 - descuentos[reciclaje]);

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

    lastPoints = Math.min(
        100,
        puntosTransporte[transporte] +
        puntosReciclaje[reciclaje] +
        puntosPapel
    );

    hasCalculated = true;
    updateResults();
    return true;
}

function calculateAndTranslate() {
    calcular();
}

function updateResults() {
    const t = translations[currentLanguage];

    if (!hasCalculated) {
        document.getElementById("co2").textContent =
            t.co2 + "--";
        document.getElementById("puntos").textContent =
            t.points + "--";
        return;
    }

    document.getElementById("co2").textContent =
        t.co2 + lastCO2.toFixed(2) + " kg";

    document.getElementById("puntos").textContent =
        t.points + lastPoints + "/100";
}

function printReport() {
    if (!hasCalculated) {
        alert(translations[currentLanguage].calculateFirst);
        return;
    }

    const t = translations[currentLanguage];

    document.getElementById("certTitle").textContent =
        t.certificate;

    document.getElementById("certDate").textContent =
        t.date + new Date().toLocaleDateString(
            currentLanguage === "es" ? "es-CO" : "en-US"
        );

    document.getElementById("certCO2").textContent =
        t.co2 + lastCO2.toFixed(2) + " kg";

    document.getElementById("certPoints").textContent =
        t.points + lastPoints + "/100";

    document.getElementById("certFooter").textContent =
        t.footer;

    window.print();
}
