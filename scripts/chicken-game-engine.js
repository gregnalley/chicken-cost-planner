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


  lastTickTimestamp:
    null,



  start:

  function(){


    this.state =
      BCPChickenGame.createState();


    this.isRunning =
      true;


    this.lastTickTimestamp =
      performance.now();


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

        BCPChickenGame.config
          .time
          .tickMilliseconds

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


      this.tickInterval =
        null;

    }


    this.isRunning =
      false;


    this.lastTickTimestamp =
      null;


  },



  updateGameClock:

  function(
    state
  ){


    const secondsPerGameDay =
      BCPChickenGame.config
        .time
        .realMinutesPerGameDay *
      60;


    /*
      Convert total elapsed real
      seconds into game-day progress.

      One complete game day currently
      equals 10 real minutes.
    */

    const totalGameDaysElapsed =
      state.elapsedSeconds /
      secondsPerGameDay;


    state.time.day =
      Math.floor(
        totalGameDaysElapsed
      ) + 1;


    const progressWithinDay =
      totalGameDaysElapsed %
      1;


    const totalMinutesIntoDay =
      Math.floor(
        progressWithinDay *
        1440
      );


    state.time.hour =
      Math.floor(
        totalMinutesIntoDay /
        60
      );


    state.time.minute =
      totalMinutesIntoDay %
      60;


  },



  updateDayPhase:

  function(
    state
  ){


    const hour =
      state.time.hour;


    /*
      First-pass day/night phases.

      These mirror the phase concept
      validated in the economy
      simulator.

      Exact visual transitions can
      be adjusted later when the
      actual map is built.
    */

    if(
      hour >= 6 &&
      hour < 18
    ){

      state.dayPhase =
        "day";

    }

    else if(
      hour >= 18 &&
      hour < 20
    ){

      state.dayPhase =
        "dusk";

    }

    else if(
      hour >= 20 ||
      hour < 5
    ){

      state.dayPhase =
        "night";

    }

    else
    {

      state.dayPhase =
        "dawn";

    }


  },



  tick:

  function(){


    if(
      !this.isRunning ||
      !this.state
    ){

      return;

    }


    const now =
      performance.now();


    if(
      this.lastTickTimestamp ===
      null
    ){

      this.lastTickTimestamp =
        now;


      return;

    }


    const elapsedSeconds =
      (
        now -
        this.lastTickTimestamp
      ) /
      1000;


    this.lastTickTimestamp =
      now;



    if(
      elapsedSeconds <= 0
    ){

      return;

    }


    const state =
      this.state;



    /*
      Track total real time.
    */

    state.elapsedSeconds +=
      elapsedSeconds;



    /*
      Update displayed game time.
    */

    this.updateGameClock(
      state
    );


    this.updateDayPhase(
      state
    );



    /*
      Continuous feed consumption.
    */

    if(
      BCPChickenGame.feeding &&
      BCPChickenGame.feeding
        .consumeFeed
    ){

      BCPChickenGame.feeding
        .consumeFeed(
          state,
          elapsedSeconds
        );

    }



    /*
      Continuous egg production.
    */

    if(
      BCPChickenGame.economy &&
      BCPChickenGame.economy
        .produceEggs
    ){

      BCPChickenGame.economy
        .produceEggs(
          state,
          elapsedSeconds
        );

    }



    /*
      Update the visible game state.
    */

    if(
      BCPChickenGame.ui
    ){

      BCPChickenGame.ui.update();

    }


  }



};



})(window);