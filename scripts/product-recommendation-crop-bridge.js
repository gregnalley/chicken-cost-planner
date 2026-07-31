"use strict";


window.BCPProductCropBridge =
  {


    VERSION:
      "1.0.0",



    getCropProductProfile:

      function(cropData){


        return {


          context:
            "crop-planner",



          applicableCrops:

            cropData &&
            cropData.cropId

              ?

              [
                cropData.cropId
              ]

              :

              [],



          cropStages:

            cropData &&
            cropData.stage

              ?

              [
                cropData.stage
              ]

              :

              [],



          useCases:

            cropData &&
            cropData.useCases

              ?

              cropData.useCases

              :

              []



        };


           },


    getCropProductRecommendations:

      function(cropProfile){


        if(
          !cropProfile
        ){

          return [];

        }



        const recommendationProfile = {


          context:
            "crop-planner",


          applicableCrops:

            cropProfile.applicableCrops || [],


          cropStages:

            cropProfile.cropStages || [],


          useCases:

            cropProfile.useCases || [],


          buyerStage:
            "homestead",


          userType:
            "backyard-flock-owner",


          problems:
            []


        };



        return (

          BCPProductRecommendation
            .getRecommendations(
              recommendationProfile
            )

        );


      }



  };