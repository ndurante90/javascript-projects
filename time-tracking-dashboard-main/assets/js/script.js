const buttons = document.querySelectorAll('.time-tracking-mode button');

let data = [];

buttons.forEach((btn) => {
    btn.addEventListener('click', filterDashboard);
});

function filterDashboard(ev)
{
    //reset active status buttons
    buttons.forEach(button => button.classList = "");
    ev.target.classList="active";


    //filter data
    let mode = ev.target.getAttribute('data-target');

    let filteredData = {};

    if(data) 
    {
        for(let entry of data){

            const timeframe = getTimeFrame(entry, mode);

            if (timeframe) {
                const key = `card-${entry.title
                    .toLowerCase()
                    .trim()
                    .replaceAll(' ', '')}`;

                filteredData[key] = {
                    current: timeframe.current,
                    previous: timeframe.previous
                };
            }
        }
    }

    //populate DOM
     for(let key of Object.keys(filteredData))
     {
        const DOMElement = document.getElementById(key);
        DOMElement.querySelector('.activity-length > strong').textContent = filteredData[key]['current'] + getHoursSuffix(filteredData[key]['current']);
        const previousLabel = getModePreviousLabel(mode) + " - " +filteredData[key]['previous'] + getHoursSuffix(filteredData[key]['previous']);
        DOMElement.querySelector('.activity-length > div').textContent = previousLabel;
     }
}



function getTimeFrame(entry, mode)
{
    if(!entry || !entry['timeframes'][mode]) 
    {
        return null;
    }

    return entry['timeframes'][mode];
}

function getModePreviousLabel(mode){
    switch(mode)
    {
        case 'daily':
            return 'Yesterday';

        case 'monthly':
            return 'Last Month';

        case 'weekly':
            return 'Last Week';
    }
}

function getHoursSuffix(hours){
    if(hours == 1) return " hr";
    return " hrs";
}



async function loadDataFromJSON()
{
    try{
         const response = await fetch('/data.json');

         if(!response.ok)
         {
            throw new Error(`HTTP error: ${response.status}`);
         }

         data = await response.json();

    }catch(error)
    {
        console.log("Error: "+error);
    }
}


async function init(){
    await loadDataFromJSON();
    document.querySelector('button[data-target="weekly"]').classList="active";
    document.querySelector('button[data-target="weekly"]').click();
}

init();





