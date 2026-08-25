"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.engine = {


  state:
    null,


  isRunning:
    false,


  tickInterval:
    null,



  start:

  function(){


    this.state =
      BCPChickenGame.createState();


    this.isRunning =
      true;


    console.log(
      "Chicken Farm Empire Started"
    );


    console.log(
      this.state
    );


    this.tickInterval =
      setInterval(
        function(){

          BCPChickenGame.engine.tick();

        },

        BCPChickenGame.config.time.tickMilliseconds

      );


  },



  stop:

  function(){


    if(
      this.tickInterval
    ){

      clearInterval(
        this.tickInterval
      );

    }


    this.isRunning =
      false;


  },



  tick:

  function(){


    const state =
      this.state;


    /*
      Advance game clock
    */


    state.time.minute += 1;



    if(
      state.time.minute >= 60
    ){

      state.time.minute = 0;

      state.time.day += 1;

    }

/*
  Morning feeding
*/


if(
  state.time.minute === 360
){

console.log(
    "SUNRISE EVENT",
    state.time.day,
    state.time.minute
  );


  if(
  BCPChickenGame.feeding
){

  BCPChickenGame.feeding
    .consumeDailyFeed(
      state
    );

}

}

    /*
      Produce eggs
    */


    /*
  Economy update
*/

BCPChickenGame.economy
  .produceEggs(
    state
  );



    console.log(
      "Tick",
      state
    );

    if(
  BCPChickenGame.ui
){

  BCPChickenGame.ui.update();

}



  }



};



})(window);