"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.ui = {


  render:

  function(){


    const state =
      BCPChickenGame.engine.state;



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
    ${state.time.day}
    </p>


    <p>
    Time:
    ${String(state.time.minute)
      .padStart(2,"0")}
    </p>


    <p>
    🐔 Chickens:
    ${state.chickens.length}
    </p>


    <p>
🥚 Eggs:
${state.eggs}
/
${BCPChickenGame.config
  .eggs
  .storageCapacity}
</p>


    <p>
    💰 Money:
    $${state.money}
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



    const coopButton =
      document.getElementById(
        "coop-button"
      );



    coopButton.onclick =
      function(){


        BCPChickenGame.economy
          .coopClick(
            state
          );


        BCPChickenGame.ui.render();


      };

      const sellButton =
  document.getElementById(
    "sell-button"
  );



sellButton.onclick =
  function(){


    BCPChickenGame.market
      .sellEggs(
        state,
        25
      );


    BCPChickenGame.ui.render();


  };

  const buyChickenButton =
  document.getElementById(
    "buy-chicken-button"
  );


buyChickenButton.onclick =
  function(){


    BCPChickenGame.actions
      .buyChicken(
        state
      );


    BCPChickenGame.ui.render();


  };



  }


};



})(window);