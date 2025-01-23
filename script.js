const texts = {
    principiante: [
        "La liebre y la tortuga decidieron competir en una carrera.",
        "El ratón ayudó al león a escapar de una trampa.",
        "La cigarra pasó el verano cantando mientras la hormiga trabajaba.",
        "El cuervo soltó el queso cuando el zorro lo aduló.",
        "La rana presumida quería ser tan grande como el buey.",
        "El viento y el sol apostaron quién era más fuerte.",
        "El pastorcito mentiroso alertó falsamente sobre el lobo.",
        "La gallina de los huevos de oro vivía feliz con su granjero.",
        "El asno se vistió con la piel de un león para asustar.",
        "Las dos cabras testarudas se encontraron en un puente estrecho."
    ],
    intermedio: [
        "Una liebre burlona retó a una tortuga a una carrera para demostrar su rapidez. La tortuga, sin dejarse intimidar, aceptó el desafío con tranquilidad. Mientras la liebre se confiaba de su velocidad y hacía paradas para descansar, la tortuga avanzaba lentamente pero sin detenerse. Al final, la constancia y determinación de la tortuga le permitieron ganar la carrera, enseñando que la perseverancia supera la arrogancia.",
        
        "El león capturó al pequeño ratón que interrumpió su siesta, pero decidió liberarlo cuando este prometió ayudarlo en el futuro. Tiempo después, el león quedó atrapado en una red de cazadores. El ratón agradecido recordó la bondad del león y utilizó sus dientes para roer las cuerdas hasta liberarlo, demostrando que la compasión y la gratitud son virtudes valiosas sin importar el tamaño.",
        
        "Durante el caluroso verano, la cigarra cantaba y bailaba despreocupadamente mientras observaba a la hormiga trabajar arduamente recolectando alimentos. Cuando llegó el frío invierno, la cigarra hambrienta acudió a la hormiga buscando comida y refugio. La hormiga, aunque molesta por la irresponsabilidad de la cigarra, compartió sus provisiones enseñándole la importancia de la previsión y el trabajo duro.",
        
        "Un cuervo vanidoso encontró un delicioso trozo de queso y se posó en la rama de un árbol para disfrutarlo. Un astuto zorro, atraído por el aroma, comenzó a adular al cuervo diciendo que tenía una voz hermosa y que deseaba escucharlo cantar. El cuervo, halagado por los cumplidos, abrió su pico para cantar, dejando caer el queso que el zorro ágilmente atrapó.",
        
        "Una rana insatisfecha con su tamaño observaba constantemente a un gran buey en el prado. Decidida a igualarlo, comenzó a inflarse cada vez más, preguntando a sus compañeras si ya había alcanzado el tamaño del buey. A pesar de las advertencias, continuó inflándose hasta que, finalmente, explotó por su excesiva ambición, enseñando que debemos aceptarnos como somos.",
        
        "El viento del norte y el sol discutían sobre quién era más poderoso cuando vieron a un viajero con una capa. Acordaron que quien lograra que el viajero se quitara la capa sería el ganador. El viento sopló con toda su fuerza, pero el viajero solo se aferró más a su capa. El sol, en cambio, brilló cálidamente hasta que el viajero se quitó la capa por sí mismo.",
        
        "En un pequeño pueblo, un joven pastor se aburría cuidando sus ovejas y decidió divertirse gritando que venía el lobo. Los aldeanos acudieron varias veces en su ayuda, solo para descubrir que era una broma. Cuando finalmente apareció un lobo verdadero y el pastor pidió auxilio, nadie acudió pensando que era otra mentira, perdiendo así todo su rebaño.",
        
        "Un granjero tenía una gallina que ponía huevos de oro cada día. Creyendo que dentro de la gallina encontraría una fortuna, decidió matarla para obtener todo el oro de una vez. Sin embargo, al abrirla descubrió que era una gallina común y corriente, perdiendo así su valiosa fuente diaria de riqueza por culpa de su avaricia.",
        
        "Un asno encontró una piel de león y decidió usarla para asustar a los demás animales. Al principio, su plan funcionó y todos huían al verlo. Sin embargo, cuando intentó asustar a un zorro, su rebuzno lo delató. El zorro, reconociendo la voz del asno, se burló de él diciendo que podría haber creído que era un león si no hubiera escuchado su verdadera naturaleza.",
        
        "Dos cabras orgullosas se encontraron en los extremos opuestos de un puente muy estrecho sobre un profundo barranco. Ninguna quería ceder el paso a la otra, insistiendo en ser la primera en cruzar. En su terquedad, comenzaron a avanzar hasta encontrarse en medio del puente, donde inevitablemente perdieron el equilibrio y cayeron al vacío, demostrando que el orgullo excesivo puede llevar a la ruina."
    ]
};

  let currentLevel = "";
  let currentText = "";
  let timerInterval;

  function startGame(level) {
    currentLevel = level;
    currentText = texts[level][Math.floor(Math.random() * texts[level].length)];
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("difficulty").textContent = level;
    document.getElementById("text-container").textContent = currentText;
    document.getElementById("input").value = "";
    startTimer(level === "principiante" ? 180 : 270);
  }

  function startTimer(seconds) {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(seconds);
    timerInterval = setInterval(() => {
      seconds--;
      timerElement.textContent = formatTime(seconds);
      if (seconds <= 0) {
        clearInterval(timerInterval);
        showModal("El tiempo terminó, vuelve a intentarlo", "Intentar de nuevo");
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function checkInput() {
    const input = document.getElementById("input").value.trim();
    const words = currentText.split(" ");
    const inputWords = input.split(" ");
    const container = document.getElementById("text-container");
    container.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      if (inputWords[index] === word) {
        span.classList.add("correct");
      }
      container.appendChild(span);
      container.appendChild(document.createTextNode(" "));
    });

    if (input === currentText) {
      clearInterval(timerInterval);
      showModal("¡Bien hecho!", "Siguiente");
    }
  }

  function showModal(message, buttonText) {
    document.getElementById("modal-message").textContent = message;
    const button = document.getElementById("modal-button");
    button.textContent = buttonText;
    button.onclick = buttonText === "Siguiente" ? nextText : restartGame;
    document.getElementById("modal").classList.remove("hidden");
  }

  function restartGame() {
    document.getElementById("modal").classList.add("hidden");
    startGame(currentLevel);
  }

  function nextText() {
    document.getElementById("modal").classList.add("hidden");
    startGame(currentLevel);
  }

  function returnToStart() {
    clearInterval(timerInterval);
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
  }