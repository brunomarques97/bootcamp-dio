const state = {
    view: {
        square: document.querySelectorAll(".square"),
        selecao: document.querySelectorAll(".selecao"),
        tempo: document.getElementById("tempo"),
        ponto: document.getElementById("pontos"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 10,
      },
      actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
      },
    };
    
    function countDown() {
      state.values.curretTime--;
      state.view.tempo.innerHTML = state.values.curretTime;
    
      if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
      }
    }
    
    function playSound(audioName) {
      let audio = new Audio(`./src/audio/${audioName}.m4a`);
      audio.volume = 0.2;
      audio.play();
    }
    
    function randomSquare() {
      state.view.square.forEach((square) => {
        square.classList.remove("selecao");
      });
    
      let randomNumber = Math.floor(Math.random() * 9);
      let randomSquare = state.view.square[randomNumber];
      randomSquare.classList.add("selecao");
      state.values.hitPosition = randomSquare.id;
    }
    
    function addListenerHitBox() {
      state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
          if (square.id === state.values.hitPosition) {
            state.values.result++;
            state.view.ponto.innerHTML = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
          }
        });
      });
    }
    
    function initialize() {
      addListenerHitBox();
    }
    
    initialize();