# Create Vehicle
Here we can see how is the flow of submitting a vehicle to be rented by other users. We only have to provide some information about the car such as where it is located, some basic info like the year of the car, provide photos of the vehicle and set up the rental details that you want to establish. After that, you’re vehicle is ready to be rented by all Rent Your Ride drivers.



## **VehicleCreateSteps**

This page is divided into three main components, a main container that will receive the other two components, a StepsBar to inform in which step the user currently is and another where the content of that step will be.

![containers/VehicleCreateSteps.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526986511431_1step.png)



## **StepsBar**

This element was created for users in order to always have a guided interaction in the action of adding a vehicle. With the steps bar, we always have the perception of the steps that are missing to complete our goal and the current step in which the users are.

![components/Vehicle/Post/StepsBar](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526986578812_stepbar.png)





# Steps Components
## 1st Step - BasicInfo

In the first step, the owner needs to enter the basic information of its vehicle. All form fields are required before moving on to the next step.

![components/Vehicle/Post/BasicInfo.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526986825618_basic.png)


In each required field you will find some types of verification in order to help users to fill the form properly (detailed in +Validation):  

![Form Validations in validations/DataValidation.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526987414077_valid.png)




## **Description**

In the second step, it will be necessary to introduce a description and some characteristics about the vehicle.

![components/Vehicle/Post/Description.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526987206654_description.png)




## **Photos**

In this step, the owner needs to insert some good quality pictures of its vehicle. The page is divided by several components so that it is possible to have a "Drag And Drop". You can find the code for these components in "components/ImageUpload”.

![components/Vehicle/Post/Photos.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526987318055_photos.png)



## **RentalInfo**

After inserting all the information about the vehicle it will be necessary to give some data regarding the rental of that vehicle, ie, the price of rent per day and the owner availability to deliver and collect the vehicle to the client.

![components/Vehicle/Post/RentalInfo.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526987650513_rental.png)



## **PublishVehicle**

If all required fields have been correctly filled you can publish the vehicle on the platform, in the end of all steps.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1527004378922_publish.png)


