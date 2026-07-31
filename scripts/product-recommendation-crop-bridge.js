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


           },


    filterCropPlannerProducts:

      function(products, cropProfile){


        if(
          !Array.isArray(products)
          ||
          !cropProfile
        ){

          return [];

        }



        const results =
          [];



        products.forEach(function(product){


          if(
            !product
            ||
            !product.recommendationData
          ){

            return;

          }



          const data =
            product.recommendationData;



          let include =
            false;



          /*
            Crop-specific product match
          */


          if(
            Array.isArray(
              data.applicableCrops
            )
            &&
            data.applicableCrops.some(function(crop){

              return (

                cropProfile.applicableCrops.includes(
                  crop
                )

              );

            })
          ){

            include =
              true;

          }



          /*
            Crop planner context match
          */


          if(
            Array.isArray(
              data.recommendationContexts
            )
            &&
            data.recommendationContexts.includes(
              "crop-planner"
            )
          ){

            include =
              true;

          }



          /*
            Universal products
          */


          if(
            data.universal === true
          ){

            include =
              true;

          }



          if(
            include
          ){

            results.push(
              product
            );

          }


        });



        return results;


      }



  };