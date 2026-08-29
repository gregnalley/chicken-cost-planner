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
<span id="owned-land">
1 Plot
</span>
</p>

<p>
Next Expansion:
<br>
<span id="next-land-expansion"></span>
</p>

<button
id="purchase-land-button"
class="game-button upgrade-button"
>

Purchase East Pasture

</button>

</div>



<div
id="east-pasture-crop-card"
class="development-card"
>

<h3>
🌻 East Pasture Crop Plot
</h3>

<p>
Status:
<br>
<span id="crop-plot-status">
Locked
</span>
</p>

<p>
Cost:
<br>
<span id="crop-plot-cost"></span>
</p>

<button
id="unlock-crop-plot-button"
class="game-button upgrade-button"
>

Unlock Crop Plot

</button>

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
<span id="feed-storage"></span>
</p>

<p>
Current Feed:
<br>
<span id="current-feed">
Basic Feed
</span>
</p>

</div>




<div class="development-card">

<h3>
⚙️ Production
</h3>

<p>
Current Rate:
<br>
<span id="production-rate"></span>
</p>

<p>
Next Upgrade:
<br>
<span id="production-upgrade"></span>
</p>

<button
id="upgrade-production-button"
class="game-button upgrade-button"
>

Upgrade Production

</button>

<p>
Automation:
<br>
Locked
</p>

</div>



<div class="development-card">

<h3>
🚚 Transportation
</h3>

<p>
Truck Capacity:
<br>
<span id="truck-capacity"></span>
eggs
</p>

<p>
Next Upgrade:
<br>
<span id="truck-upgrade"></span>
</p>

<button
id="upgrade-truck-button"
class="game-button upgrade-button"
>

Upgrade Truck

</button>

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
🏪 Egg Market
</h3>

<p>
Current Egg Value:
<br>
$<span id="egg-value"></span>
</p>

<p>
Next Upgrade:
<br>
<span id="egg-value-upgrade"></span>
</p>

<button
id="upgrade-egg-value-button"
class="game-button upgrade-button"
>

Upgrade Egg Value

</button>

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
id="buy-feed-button"
class="game-button"
>

Buy 50 lb Feed — $15

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
$150
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
        String(state.time.hour)
  .padStart(2,"0")
+
":"
+
String(state.time.minute)
  .padStart(2,"0"
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


    const feedStorage =
  state.buildings.find(
    function(building){

      return (
        building.type === "feed-storage"
      );

    }
  );


if(feedStorage){

  document.getElementById(
    "feed-storage"
  )
  .textContent =
    state.feed +
    " / " +
    feedStorage.capacity +
    " lbs";

}



const productionRate =
  document.getElementById(
    "production-rate"
  );


if(
  productionRate
){

  productionRate.textContent =
    state.eggRate.toFixed(2) +
    " sec / egg / hen";

}



const productionUpgrade =
  document.getElementById(
    "production-upgrade"
  );


if(
  productionUpgrade
){

  const nextProductionUpgrade =
    BCPChickenGame.config
      .productionUpgrades
      .nestingBoxes[
        state.nestingUpgradeIndex
      ];


  if(
    nextProductionUpgrade
  ){

    productionUpgrade.textContent =
      nextProductionUpgrade.name +
      " - $" +
      nextProductionUpgrade.cost;

  }
  else
  {

    productionUpgrade.textContent =
      "Maximum Level";

  }

}



const eggValue =
  document.getElementById(
    "egg-value"
  );


if(
  eggValue
){

  eggValue.textContent =
    state.eggValue
      .toFixed(
        2
      );

}



const eggValueUpgrade =
  document.getElementById(
    "egg-value-upgrade"
  );


if(
  eggValueUpgrade
){

  const nextEggValueUpgrade =
    BCPChickenGame.config
      .eggValueUpgrades[
        state.eggValueUpgradeIndex
      ];


  if(
    nextEggValueUpgrade
  ){

    eggValueUpgrade.textContent =
      nextEggValueUpgrade.name +
      " - $" +
      nextEggValueUpgrade.cost +
      " → $" +
      nextEggValueUpgrade.eggValue
        .toFixed(
          2
        ) +
      " / egg";

  }
  else
  {

    eggValueUpgrade.textContent =
      "Maximum Level";

  }

}


const truckCapacity =
  document.getElementById(
    "truck-capacity"
  );


if(
  truckCapacity
){

  truckCapacity.textContent =
    state.truckCapacity;

}



const truckUpgrade =
  document.getElementById(
    "truck-upgrade"
  );


if(
  truckUpgrade
){

  const nextTruckUpgrade =
    BCPChickenGame.config
      .transportation
      .upgrades
      .find(
        function(
          upgrade
        ){

          return (
            upgrade.capacity >
            state.truckCapacity
          );

        }
      );


  if(
    nextTruckUpgrade
  ){

    truckUpgrade.textContent =
      "Level " +
      nextTruckUpgrade.level +
      " - $" +
      nextTruckUpgrade.cost +
      " → " +
      nextTruckUpgrade.capacity +
      " eggs";

  }
  else
  {

    truckUpgrade.textContent =
      "Maximum Level";

  }

}


const ownedLand =
  document.getElementById(
    "owned-land"
  );


const nextLandExpansion =
  document.getElementById(
    "next-land-expansion"
  );


const purchaseLandButton =
  document.getElementById(
    "purchase-land-button"
  );


const firstExpansion =
  BCPChickenGame.config
    .land
    .firstExpansion;


if(
  state.landUnlocked
){

  if(
    ownedLand
  ){

    ownedLand.textContent =
      "2 Plots";

  }


  if(
    nextLandExpansion
  ){

    nextLandExpansion.textContent =
      firstExpansion.name +
      " Owned";

  }


  if(
    purchaseLandButton
  ){

    purchaseLandButton.disabled =
      true;


    purchaseLandButton.textContent =
      "East Pasture Purchased";

  }

}
else
{

  if(
    ownedLand
  ){

    ownedLand.textContent =
      "1 Plot";

  }


  if(
    nextLandExpansion
  ){

    nextLandExpansion.textContent =
      firstExpansion.name +
      " - $" +
      firstExpansion.cost;

  }


  if(
    purchaseLandButton
  ){

    purchaseLandButton.disabled =
      false;


    purchaseLandButton.textContent =
      "Purchase " +
      firstExpansion.name;

  }

}


const cropPlotCard =
  document.getElementById(
    "east-pasture-crop-card"
  );


const cropPlotStatus =
  document.getElementById(
    "crop-plot-status"
  );


const cropPlotCost =
  document.getElementById(
    "crop-plot-cost"
  );


const unlockCropPlotButton =
  document.getElementById(
    "unlock-crop-plot-button"
  );


const cropPlotConfig =
  BCPChickenGame.config
    .crops
    .eastPastureCropPlot;


if(
  cropPlotCard
){

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    cropPlotCard.style.display =
      "none";

  }
  else
  {

    cropPlotCard.style.display =
      "";

  }

}


if(
  state.eastPasture &&
  state.eastPasture.unlocked === true
){

  if(
    state.eastPasture
      .cropPlot
      .unlocked === true
  ){

    if(
      cropPlotStatus
    ){

      cropPlotStatus.textContent =
        "Unlocked - Level " +
        state.eastPasture
          .cropPlot
          .level;

    }


    if(
      cropPlotCost
    ){

      cropPlotCost.textContent =
        "Purchased";

    }


    if(
      unlockCropPlotButton
    ){

      unlockCropPlotButton.disabled =
        true;

      unlockCropPlotButton.textContent =
        "Crop Plot Unlocked";

    }

  }
  else
  {

    if(
      cropPlotStatus
    ){

      cropPlotStatus.textContent =
        "Available";

    }


    if(
      cropPlotCost
    ){

      cropPlotCost.textContent =
        "$" +
        cropPlotConfig.unlockCost;

    }


    if(
      unlockCropPlotButton
    ){

      unlockCropPlotButton.disabled =
        false;

      unlockCropPlotButton.textContent =
        "Unlock Crop Plot";

    }

  }

}



  },



  bindEvents:

  function(){


    const state =
      BCPChickenGame.engine.state;



    const buyFeedButton =
  document.getElementById(
    "buy-feed-button"
  );


if(
  buyFeedButton
){


  buyFeedButton.onclick =

  function(){


    BCPChickenGame.actions
      .buyFeed(
        state,
        "basic-feed-bag"
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


const upgradeProductionButton =
  document.getElementById(
    "upgrade-production-button"
  );


if(
  upgradeProductionButton
){

  upgradeProductionButton.onclick =

  function(){


    BCPChickenGame.actions
      .upgradeProduction(
        state
      );


    BCPChickenGame.ui.update();


  };


}

const upgradeEggValueButton =
  document.getElementById(
    "upgrade-egg-value-button"
  );


if(
  upgradeEggValueButton
){

  upgradeEggValueButton.onclick =

  function(){


    BCPChickenGame.actions
      .upgradeEggValue(
        state
      );


    BCPChickenGame.ui.update();


  };


}


const upgradeTruckButton =
  document.getElementById(
    "upgrade-truck-button"
  );


if(
  upgradeTruckButton
){

  upgradeTruckButton.onclick =

  function(){


    BCPChickenGame.actions
      .upgradeTruck(
        state
      );


    BCPChickenGame.ui.update();


  };


}



const purchaseLandButton =
  document.getElementById(
    "purchase-land-button"
  );


if(
  purchaseLandButton
){

  purchaseLandButton.onclick =

  function(){


    BCPChickenGame.actions
      .purchaseFirstExpansion(
        state
      );


    BCPChickenGame.ui.update();


  };


}



  }



};



})(window);