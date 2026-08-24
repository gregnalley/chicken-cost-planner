"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.shopUI = {


  open:

  function(){


    const shop =
      document.getElementById(
        "farm-shop-modal"
      );


    if(!shop){

      return;

    }


    shop.style.display =
      "flex";


  },



  close:

  function(){


    const shop =
      document.getElementById(
        "farm-shop-modal"
      );


    if(!shop){

      return;

    }


    shop.style.display =
      "none";


  }



};



})(window);