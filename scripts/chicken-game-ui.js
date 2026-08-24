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
    /
    <span id="game-chicken-capacity"></span>
    </p>


    <p>
    🥚 Eggs:
    <span id="game-eggs"></span>
    /
    <span id="game-egg-capacity"></span>
    </p>


    <p>
    💰 Money:
    $
    <span id="game-money"></span>
    </p>


    <hr>


    <h2 id="coop-name">

    </h2>


    <p>
    Level:
    <span id="coop-level"></span>
    </p>


    <p>
    Capacity:
    <span id="coop-capacity"></span>
    chickens
    </p>


    <p>
    Next Upgrade:
    <br>
    <span id="coop-upgrade"></span>
    </p>


    <hr>


    <h2>
    🥚 Egg Storage
    </h2>


    <p>
    Level:
    <span id="storage-level"></span>
    </p>


    <p>
    Capacity:
    <span id="storage-capacity"></span>
    eggs
    </p>


    <p>
    Next Upgrade:
    <br>
    <span id="storage-upgrade"></span>
    </p>


    <hr>


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


    <br><br>


    <button id="upgrade-coop-button">

      Upgrade Coop

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
      "game-money"
    )
    .textContent =
      state.money;



    const coop =
      state.buildings
        .find(
          function(building){

            return (
              building.type === "coop"
            );

          }
        );



    if(coop){


      document.getElementById(
        "game-chickens"
      )
      .textContent =
        state.chickens.length;



      document.getElementById(
        "game-chicken-capacity"
      )
      .textContent =
        coop.capacity;



      document.getElementById(
        "coop-name"
      )
      .textContent =
        "🏠 Coop";



      document.getElementById(
        "coop-level"
      )
      .textContent =
        coop.level;



      document.getElementById(
        "coop-capacity"
      )
      .textContent =
        coop.capacity;



      const nextUpgrade =
        BCPChickenGame.config
          .coop
          .upgrades
          .find(
            function(upgrade){

              return (
                upgrade.level ===
                coop.level + 1
              );

            }
          );



      if(nextUpgrade){


        document.getElementById(
          "coop-upgrade"
        )
        .textContent =

          "Level " +
          nextUpgrade.level +
          " - $" +
          nextUpgrade.cost +
          " (" +
          nextUpgrade.capacity +
          " chickens)";


      }
      else{


        document.getElementById(
          "coop-upgrade"
        )
        .textContent =
          "Maximum Level";


      }


    }



    const storage =
      state.buildings
        .find(
          function(building){

            return (
              building.type ===
              "egg-storage"
            );

          }
        );



    if(storage){


      document.getElementById(
        "game-eggs"
      )
      .textContent =
        state.eggs;



      document.getElementById(
        "game-egg-capacity"
      )
      .textContent =
        storage.capacity;



      document.getElementById(
        "storage-level"
      )
      .textContent =
        storage.level;



      document.getElementById(
        "storage-capacity"
      )
      .textContent =
        storage.capacity;



      const nextStorageUpgrade =
        BCPChickenGame.config
          .storage
          .upgrades
          .find(
            function(upgrade){

              return (
                upgrade.level ===
                storage.level + 1
              );

            }
          );



      if(nextStorageUpgrade){


        document.getElementById(
          "storage-upgrade"
        )
        .textContent =

          "Level " +
          nextStorageUpgrade.level +
          " - $" +
          nextStorageUpgrade.cost +
          " (" +
          nextStorageUpgrade.capacity +
          " eggs)";


      }
      else{


        document.getElementById(
          "storage-upgrade"
        )
        .textContent =
          "Maximum Level";


      }


    }



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



    const upgradeCoopButton =
      document.getElementById(
        "upgrade-coop-button"
      );


    if(upgradeCoopButton){


      upgradeCoopButton.onclick =

      function(){


        BCPChickenGame.actions
          .upgradeCoop(
            state
          );


        BCPChickenGame.ui.update();


      };


    }



  }



};



})(window);