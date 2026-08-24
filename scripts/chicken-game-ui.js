"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.ui = {


  initialize:

  function(){


    const display =
      document.getElementById(
        "game-display"
      );


    if(!display){

      return;

    }



    display.innerHTML =

    `

    <h2>
    Farm Status
    </h2>


    <p>
    Day:
    <span id="game-day"></span>
    </p>


    <p>
    Time:
    <span id="game-time"></span>
    </p>


    <p>
    🐔 Chickens:
    <span id="game-chickens"></span>
    </p>


    <p>
    🥚 Eggs:
    <span id="game-eggs"></span>
    /
    ${BCPChickenGame.config
      .eggs
      .storageCapacity}
    </p>


    <p>
    💰 Money:
    $
    <span id="game-money"></span>
    </p>


    <hr>


    <h2>
    🏠 Starter Coop
    </h2>


    <button id="coop-button">

      Click Coop

    </button>


    <br><br>


    <button id="sell-button">

      Sell 25 Eggs

    </button>


    <br><br>


    <button id="buy-chicken-button">

      Buy Hen ($50)

    </button>


    `;



    BCPChickenGame.ui.bindEvents();


    BCPChickenGame.ui.update();


  },



  update:

  function(){


    const state =
      BCPChickenGame.engine.state;



    if(!state){

      return;

    }



    document.getElementById(
      "game-day"
    )
    .textContent =
      state.time.day;



    document.getElementById(
      "game-time"
    )
    .textContent =
      String(
        state.time.minute
      )
      .padStart(
        2,
        "0"
      );



    document.getElementById(
      "game-chickens"
    )
    .textContent =
      state.chickens.length;



    document.getElementById(
      "game-eggs"
    )
    .textContent =
      state.eggs;



    document.getElementById(
      "game-money"
    )
    .textContent =
      state.money;



  },



  bindEvents:

  function(){


    const state =
      BCPChickenGame.engine.state;



    const coopButton =
      document.getElementById(
        "coop-button"
      );



    if(coopButton){


      coopButton.onclick =

      function(){


        BCPChickenGame.economy
          .coopClick(
            state
          );


        BCPChickenGame.ui.update();


      };


    }



    const sellButton =
      document.getElementById(
        "sell-button"
      );



    if(sellButton){


      sellButton.onclick =

      function(){


        BCPChickenGame.market
          .sellEggs(
            state,
            25
          );


        BCPChickenGame.ui.update();


      };


    }



    const buyChickenButton =
      document.getElementById(
        "buy-chicken-button"
      );



    if(buyChickenButton){


      buyChickenButton.onclick =

      function(){


        BCPChickenGame.actions
          .buyChicken(
            state
          );


        BCPChickenGame.ui.update();


      };


    }



  }



};



})(window);