# Validations
For form validations and data validations we implemented a similar solution like the one  exposed in this [article](https://medium.com/code-monkey/client-side-form-validation-in-react-40e367de47ba).
We have two elements, the first being **FormValidator**, which validates an entire form like the ones we present on +Create Vehicle for each step. It receives an array as argument with several objects and each object is a rule to be validated in order to have a correct form. 


    class FormValidator {
      constructor(validations) {
        // validations is an array of validation rules specific to a form
        this.validations = validations;
      }


This class receives all rules that are related with each form field present on it. If any rule that we’ve defined doesn’t have the expected result, the form is considered invalid, and gives an error. On the other hand, if there is no invalid data we can click on submit button and proceed with our navigation on the application.
The other important element to achieve form validations is the **DataValidations** class. Here is where we define each rule related with one form field, like the license plate of a car, or the year of the car.


![Form Validations in validations/DataValidation.jsx](https://d2mxuefqeaa7sj.cloudfront.net/s_143CF1B6E5EF2C4F571D2363767F94DE4C8D8A0657B207067FD1905AB30C565B_1526987414077_valid.png)


As we can see, if we trie to insert a License plate only with two characters it throws an error that says what is the format of the license that we expect. We can do some stuff like that by implementing rules on the file mentioned above:


    {
        field: 'license_plate',
        method: 'isLength',
        args: [{ min: 2, max: 8 }],
        validWhen: true,
        message: 'License has 8 characters.'
      },
      {
        field: 'license_plate',
        method: 'matches',
        args: ['[0-9A-Z]{2}-[0-9A-Z]{2}-[0-9A-Z]{2}', 'g'],
        validWhen: true,
        message: 'Example: XX-XX-XX'
      }

In the code presented above, we’ve defined two rules for a vehicle license plate be valid: the format and the length of it. We can also establish the feedback message that we want to give to users for invalid inputs (through message attribute).

