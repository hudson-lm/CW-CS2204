window.addEventListener('load', function(){
    let submit_button = new Selector('#submit-button').query();
    submit_button.onclick = checkAvail;

    let reset_button = new Selector('input[type="reset"]').query();
    reset_button.onclick = reset;


    function checkAvail(e){
        e.preventDefault() //so when the button clicked, the window won't be refreshed

        let dataDate = new Selector('input[type=\'date\']').query().value.trim();
        let dataTime = new Selector('time').id().value.trim();
        let dataVisitors = new Selector('input[type=\'number\']').query().value.trim();
        // the reason I used trim() is to cut whitespaces, in case there is any

        //assign values of error messages into ARRAY:
        const errorMessages = ["Data not completed; please re-enter","Please enter a valid number of people!"]

        if (dataDate==='' || dataTime==='' || dataVisitors ===''){
            new Selector('alert').id().innerHTML = errorMessages[0];
            new Selector('alert').id('color:red;text-align:center');
            new Selector('fieldset').query('height:200px');
        }

        else if (dataVisitors<1 || dataVisitors%1 !==0){
            new Selector('alert').id().innerHTML = errorMessages[1];
            new Selector('alert').id('color:red;text-align:center');
            new Selector('fieldset').query('height:200px');
        }

        else{
            new Selector('alert').id().innerHTML='';
            new Selector('fieldset').query('height:170px');
            let result = reserve(dataDate,dataTime,dataVisitors);
            if (result){
                alert('Your reservation is successful!');
            }
            else{
                alert( "Sorry, the reservation is full!");
            }
        }
    }

    function reset(){
        new Selector('alert').id().innerHTML='';
        new Selector('fieldset').query('height:170px');
    }
})