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


          /*
  Crop-specific product match

  Supports:

  Legacy:
  recommendationData.applicableCrops

  New crop schema:
  recommendationData.recommendedFor.crops
*/


const productCrops = [];


/*
  Legacy crop field
*/

if(
  Array.isArray(
    data.applicableCrops
  )
){

  productCrops.push(
    ...data.applicableCrops
  );

}


/*
  New crop planner field
*/

if(
  data.recommendedFor
  &&
  Array.isArray(
    data.recommendedFor.crops
  )
){

  productCrops.push(
    ...data.recommendedFor.crops
  );

}



if(
  productCrops.some(function(crop){

    return (

      cropProfile.applicableCrops.includes(
        crop
      )

    );

  })
)
{

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
  Universal Feed Crop Planner products

  A product should not enter the crop-planner
  recommendation pool merely because it is
  universal elsewhere on the website.

  It must also be assigned to the
  Feed Crop Planner.
*/


const recommendedFor =
  data.recommendedFor ||
  {};


const productPlanners =
  Array.isArray(
    recommendedFor.planners
  )

    ?

    recommendedFor.planners

    :

    [];


if(
  data.universal === true
  &&
  productPlanners.includes(
    "feed-crop-planner"
  )
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


      },



    rankCropProducts:

      function(products){


        if(
          !Array.isArray(products)
        ){

          return [];

        }


        return (

          products
            .slice()
            .sort(function(a,b){


              const priorityA =
                a.recommendationData &&
                a.recommendationData.priority

                  ? 

                  a.recommendationData.priority

                  :

                  0;



              const priorityB =
                b.recommendationData &&
                b.recommendationData.priority

                  ? 

                  b.recommendationData.priority

                  :

                  0;



              return priorityB - priorityA;


            })

        );


      }



  };