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


      const closeButton =
  document.getElementById(
    "close-shop-button"
  );


if(closeButton){

  closeButton.onclick =
  function(){

    BCPChickenGame.shopUI.close();

  };

}

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