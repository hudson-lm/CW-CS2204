window.addEventListener('load',function(){
    let tech = new Selector('tech').id();
    let inno = new Selector('inno').id();
    let eco = new Selector('eco').id();
    
    const heading = [tech,inno,eco]
    
    // WHEN TECH HEADING CLICKED
    tech.onclick = function(){
        for (let i=0;i<heading.length;i++){
            if (heading[i]===tech){
                new Selector('tech').id('background-color:white');
                continue;
            }
            heading[i].setAttribute('style','background-color:#00d2ff !important');
        }
        
        new Selector('TechnologyZone').id('display:block');
        new Selector('InnovationZone').id('display:none');
        new Selector('EcologyZone').id('display:none');
    }

    // WHEN INNO HEADING CLICKED
    inno.onclick = function(){
        for (let i=0;i<heading.length;i++){
            if (heading[i]===inno){
                new Selector('inno').id('background-color:white');
                continue;
            }
            heading[i].setAttribute('style','background-color:#00d2ff !important');
        }
        
        new Selector('TechnologyZone').id('display:none');
        new Selector('InnovationZone').id('display:block');
        new Selector('EcologyZone').id('display:none');
    }

    // WHEN ECO HEADING CLICKED
    eco.onclick = function(){
        for (let i=0;i<heading.length;i++){
            if (heading[i]===eco){
                new Selector('eco').id('background-color:white');
                continue;
            }
            heading[i].setAttribute('style','background-color:#00d2ff !important');
        }
        
        new Selector('TechnologyZone').id('display:none');
        new Selector('InnovationZone').id('display:none');
        new Selector('EcologyZone').id('display:block');
    }
    
// SUBMIT BUTTON
    new Selector("#submitButton").query().addEventListener('click',function(){
        // console.log(counter);
        // console.log(chosen_ranks.sort((a,b)=>a-b));
        let totalRanks = chosen_ranks.sort((a,b)=>a-b)[0]; // [0] in order to get the first start of the rank
        
        if (chosen_ranks.length ==0){
            new Selector('#error-message').query().innerHTML = "You have not chosen any company.";
            new Selector('#error-message').query('text-align:center;color:red');
        }
        else{
            let gap = [];
            let highest_rank = Math.max(...chosen_ranks);
            for (let i=1; i<=highest_rank;i++){
                if (new Selector(`zone-${i}`).id().textContent===''){
                    gap.push(i);
                }
            }
            getString(gap);
        }
    }) 

    function getString(gap){
        let gap_string = [];

        // THE CODE USED WHEN THE GAP DOESN'T EXIST
        if (gap.length ==0){
            new Selector('#error-message').query().innerHTML = `You have successfully submitted your application at time ${new Date().toString()}`;
            new Selector('#error-message').query('text-align:center;color:red;');
        }

        // THE CODE USED WHEN THE GAP EXISTS
        else{
            for(let i=0; i<gap.length; i++){
                if(gap[i]==1){
                    gap_string.push("1st");
                }
                else if(gap[i]==2){
                    gap_string.push("2nd");
                }
                else if(gap[i]==3){
                    gap_string.push("3rd");
                }
                else{
                    gap_string.push(gap[i]+'th');
                }
            }

        if(gap_string.length==1){ //heres if contains only 1 gap
            new Selector('#error-message').query().innerHTML = `You have not chosen your ${gap_string[0]} chosen company, you can not leave any gap between your chosen companies`;
        }
        else if (gap_string.length==2){ //heres if contains 2 gaps, am using "and"
            new Selector('#error-message').query().innerHTML = `You have not chosen your ${gap_string[0]} and ${gap_string[1]} chosen company, you can not leave any gap between your chosen companies`;
        }
        else{ //heres if contains more than 2 gaps
            let string_format = "";
            for(let i=0; i<gap_string.length; i++){
                if (i+1==gap_string.length){
                    string_format+= "and "+gap_string[i]; // to add "and" on the last gap and remove comma.
                }
                else{
                    string_format+= gap_string[i]+", ";
                }
            }
            new Selector('#error-message').query().innerHTML = `You have not chosen your ${string_format} chosen company, you can not leave any gap between your chosen companies`;
        }
        new Selector('#error-message').query('text-align:center;color:red;'); //to set the message in red color and to the center-aligned
        }
    }
})

// CLEAR BUTTON
function reset(){ //clear up the whole table, update the last updated time and total applied companies
    chosen_companies = [];
    chosen_ranks = [];
    updateTable(chosen_ranks);
    new Selector('.cell').queryAll().forEach(element => {element.innerHTML = ''});
    new Selector('#error-message').query().innerHTML = '';
}

// REQUIREMENTS!: updateTable function -> to update the last updated time and total applied companies
function updateTable(totalcompanies){
    if (totalcompanies.length>=0){
        new Selector("#totalcompanies").query().innerHTML = totalcompanies.length;
    }
    let timeUpdate = new Date();
    new Selector("#timeUpdate").query().innerHTML = timeUpdate.toString();
}


// STORE WHOLE COMPANIES DATA INSIDE MAP ARRAY
const formData = new Map([
    ['tws',['Technology Zone','TechWave Solutions']],
    ['qlt',['Technology Zone','Quantum Leap Technologies']],
    ['cgs',['Technology Zone','CyberGuard Systems']],
    ['sci',['Technology Zone','SmartCity Innovations']],
    ['cn',['Technology Zone','Connectify Networks']],
    ['etl',['Innovation Zone','EcoTech Labs']],
    ['hsi',['Innovation Zone','HealthSphere Innovations']],
    ['cts',['Innovation Zone','CreaTech Studio']],
    ['gfe',['Ecology Zone','GreenFuture Enterprises']],
    ['wws',['Ecology Zone','WaterWise Solutions']],
    ['rci',['Ecology Zone','ReCycle Innovations']],
    ['ebt',['Ecology Zone','EcoBuild Technologies']]
])

// THESE 3 VARIABLES WILL BE USED IN dataProcess function => later the chosen companies and ranks will be "push()" inside the array and checked by ".includes()" whether the element already existed or not inside the array. While 'counter' is to update the number of total companies applied.
let chosen_companies = [];
let chosen_ranks = []
let counter = 0;


// WHEN EACH OF THE "RANK OF CHOICE" BUTTONS IS CLICKED, IT WILL GO THROUGH THIS FUNCTION
function dataProcess(company){
    let companyProcess = formData.get(company);
    let rankProcess = new Selector(company).id().value;
    if (chosen_companies.includes(companyProcess)){
        alert('You have already chosen this company'); //REJECT
    }
    else{
        let confirmation = rank(rankProcess);
        if (confirmation){
            if (chosen_ranks.includes(rankProcess)){
                alert('You have already chosen this rank'); //REJECT
            }
            else{
                chosen_ranks.push(rankProcess);
                chosen_companies.push(companyProcess);
                counter++;

                // ALERT OF SUCCESSFULL CHOOSE
                if (rankProcess==1){
                    alert(`You have chosen ${companyProcess[1]} as your 1st chosen company in ${companyProcess[0]} successfully`);
                }
                else if(rankProcess==2){
                    alert(`You have chosen ${companyProcess[1]} as your 2nd chosen company in ${companyProcess[0]} successfully`);
                }
                else if(rankProcess==3){
                    alert(`You have chosen ${companyProcess[1]} as your 3rd chosen company in ${companyProcess[0]} successfully`);
                }
                else{
                    alert(`You have chosen ${companyProcess[1]} as your ${rankProcess}th chosen company in ${companyProcess[0]} successfully`);
                }
                
                console.log(chosen_companies,chosen_ranks);
                tableAccess(rankProcess, companyProcess);
            }
        }
    }
    
}

// THIS FUNCTION IS ALSO TO REJECT IF INPUTTING NON-INTEGER OR BLANK OR OUTSIDE 1-10 RANGE
function rank(rankProcess){
    if (rankProcess==="" || rankProcess%1!==0){
        alert('Please enter the rank of chosen company');
        return false;
    }
    else if(rankProcess<1 || rankProcess>10){
        alert('Please enter the rank of chosen between 1 and 10');
        return false;
    }
    else{
        return true;
    }
}


// THIS FUNCTION IS TO UPDATE TABLE CELLS ONCE THE COMPANY IS SUCCESSFULLY CHOSEN

function tableAccess(rankProcess, companyProcess){ // companyProcess = trying to get the data from the Map()
    let zoneAccess = new Selector(`zone-${rankProcess}`).id();
    let companyAccess = new Selector(`company-${rankProcess}`).id();
    
    // switch(rankProcess){
        //     case 1:
        //         ...
        //     case 10:
        // }
        
        //at first, I used switch, but just realized, turned out no need to use this, since I can access directly "$string"
        zoneAccess.innerHTML = companyProcess[0];
        companyAccess.innerHTML = companyProcess[1];
        
        updateTable(chosen_ranks);
    }