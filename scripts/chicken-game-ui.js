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

<div class="game-container">


<div class="game-layout">


<!-- MAIN CONTENT AREA -->

<div class="game-main">


<div class="game-section">


<h2>
Buildings
</h2>


<div class="building-grid">



<div class="building-card">


<h3 id="coop-name">

</h3>


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


<button
id="upgrade-coop-button"
class="game-button upgrade-button"
>

Upgrade Coop

</button>


</div>





<div class="building-card">


<h3>
🥚 Egg Storage
</h3>


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


</div>



</div>


</div>





<div class="game-section">


<h2>
Farm Development
</h2>



<div class="development-grid">



<div class="development-card">

<h3>
🌎 Land & Expansion
</h3>

<p>
Owned Land:
<br>
1 Plot
</p>

<p>
Next Expansion:
<br>
Locked
</p>

</div>




<div class="development-card">

<h3>
🐔 Chicken Management
</h3>

<p>
Breeding:
<br>
Locked
</p>

<p>
Health System:
<br>
Coming Soon
</p>

</div>




<div class="development-card">

<h3>
🌾 Feed & Resources
</h3>

<p>
Feed Storage:
<br>
0 lbs
</p>

<p>
Current Feed:
<br>
Basic Feed
</p>

</div>




<div class="development-card">

<h3>
⚙️ Production
</h3>

<p>
Automation:
<br>
Locked
</p>

<p>
Efficiency:
<br>
Normal
</p>

</div>




<div class="development-card">

<h3>
🔬 Research
</h3>

<p>
Research Points:
<br>
0
</p>

<p>
Unlocks:
<br>
None
</p>

</div>




<div class="development-card">

<h3>
🏪 Market
</h3>

<p>
Egg Price:
<br>
$1
</p>

<p>
Orders:
<br>
None
</p>

</div>



</div>


</div>


</div>



<!-- SIDEBAR -->

<div class="game-sidebar">



<div class="game-section">


<h2>
Farm Status
</h2>


<div class="status-grid">



<div class="status-card">

📅 Day:

<br>

<span id="game-day"></span>

</div>



<div class="status-card">

⏰ Time:

<br>

<span id="game-time"></span>

</div>



<div class="status-card">

🐔 Chickens:

<br>

<span id="game-chickens"></span>
/
<span id="game-chicken-capacity"></span>

</div>



<div class="status-card">

🥚 Eggs:

<br>

<span id="game-eggs"></span>
/
<span id="game-egg-capacity"></span>

</div>



<div class="status-card">

💰 Money:

<br>

$
<span id="game-money"></span>

</div>



</div>


</div>




<div class="game-section">


<h2>
Farm Actions
</h2>


<div class="action-grid">



<button
id="coop-button"
class="game-button"
>

Click Coop

</button>




<button
id="sell-button"
class="game-button"
>

Sell 25 Eggs

</button>




<button
id="farm-shop-button"
class="game-button"
>

Open Farm Shop

</button>


</div>


</div>



</div>



</div>

<div
id="farm-shop-modal"
class="shop-modal"
>


<div class="shop-window">


<h2>
🏪 Farm Shop
</h2>


<p>
Purchase farm upgrades and animals.
</p>

<div class="shop-grid">

<div class="shop-item">


<h3>
🐔 Hen
</h3>


<p>
Cost: $50
</p>


<button
id="shop-buy-hen-button"
class="game-button"
>

Buy Hen

</button>


</div>




<div class="shop-item">


<h3>
🏠 Coop Upgrade
</h3>


<p>
Increase chicken capacity.
</p>


<p>
Cost:
<br>
$250
</p>


<button
id="shop-upgrade-coop-button"
class="game-button"
>

Upgrade Coop

</button>


</div>


<div class="shop-item">


<h3>
🥚 Egg Storage Upgrade
</h3>


<p>
Increase egg storage capacity.
</p>


<p>
Cost:
<br>
$300
</p>


<button
id="shop-upgrade-storage-button"
class="game-button"
>

Upgrade Storage

</button>


</div>



<button
id="close-shop-button"
class="game-button"
>

Close

</button>


</div>


</div>


</div>


`
;



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

    const farmShopButton =
  document.getElementById(
    "farm-shop-button"
  );


if(farmShopButton){


  farmShopButton.onclick =

  function(){


    BCPChickenGame.shopUI
      .open();


  };


}

const closeShopButton =
  document.getElementById(
    "close-shop-button"
  );


if(closeShopButton){


  closeShopButton.onclick =

  function(){


    BCPChickenGame.shopUI
      .close();


  };


}

const shopBuyHenButton =
  document.getElementById(
    "shop-buy-hen-button"
  );


if(shopBuyHenButton){


  shopBuyHenButton.onclick =

  function(){


    BCPChickenGame.actions
  .buyChicken(
    state
  );

    BCPChickenGame.ui.update();


  };


}

const shopUpgradeCoopButton =
  document.getElementById(
    "shop-upgrade-coop-button"
  );


if(shopUpgradeCoopButton){


  shopUpgradeCoopButton.onclick =

  function(){


    BCPChickenGame.actions
      .upgradeCoop(
        state
      );


    BCPChickenGame.ui.update();


  };


}

const shopUpgradeStorageButton =
  document.getElementById(
    "shop-upgrade-storage-button"
  );


if(shopUpgradeStorageButton){


  shopUpgradeStorageButton.onclick =

  function(){


    BCPChickenGame.actions
      .upgradeStorage(
        state
      );


    BCPChickenGame.ui.update();


  };


}



  }



};



})(window);