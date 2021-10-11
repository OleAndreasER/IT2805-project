// BUG - sometimes, the scrollHeight wont work since the images aren't loaded


// Year and information control
const previousYearEl = document.getElementById('previousYear');
    previousYearEl.addEventListener('click', changeYear);
const nextYearEl = document.getElementById('nextYear');
    nextYearEl.addEventListener('click', changeYear);
var currentYearEl = document.getElementById('currentYear');
    currentYearEl.innerText = new Date().getFullYear();

var galleryEl = document.getElementById('social-gatherings-gallery');


// Open first collapsible once the document is loaded
window.addEventListener('load', openFirstCollapsible);


const dateObj = (day,month,year) => ({day: day, month: month, year: year});
// All social events has to be added here. The imgName attribute should only contain the file name + file type, and not the path
const social_events = [
    {eventType: "gathering", date: dateObj(1,10,2021), name: "Field trip to Moskva", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione, quisquam ipsum officiis mollitia repellat at sequi, odit magnam, saepe recusandae praesentium repudiandae. Illo nihil et culpa totam consequuntur perferendis.", imgName: "magnus_domination.jpg"},
    {eventType: "tournament", date: dateObj(1,10,2021), name: "Kiev", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione, quisquam ipsum officiis mollitia repellat at sequi, odit magnam, saepe recusandae praesentium repudiandae. Illo nihil et culpa totam consequuntur perferendis.", imgName: "equipment.jpg"},
    {eventType: "gathering", date: dateObj(1,10,2021), name: "Pong n' pizza", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione, quisquam ipsum officiis mollitia repellat at sequi, odit magnam, saepe recusandae praesentium repudiandae. Illo nihil et culpa totam consequuntur perferendis.", imgName: "tabletennis_table.jpg"},
];



function createCollapsibles() {
    for(let i = 0; i < social_events.length; i++) {
        if(social_events[i].date.year == Number(currentYearEl.innerText)) {
            // Create button
            let buttonEl = document.createElement('button');
            buttonEl.classList.add('collapsible');
            buttonEl.innerHTML = social_events[i].name;
            // Make sure one collapsible is open on page load
            galleryEl.appendChild(buttonEl);

            // Create content element with layout
            let contentEl = document.createElement('div');
            contentEl.classList.add('module', 'collapsible-content');
            let splitEl = document.createElement('div');
            splitEl.classList.add('split');
            contentEl.appendChild(splitEl);

            // Add stored information
            let leftDivEl = document.createElement('div');

            let dateEl = document.createElement('p');
            dateEl.classList.add('social-gatherings-date');
            dateEl.innerText = 'Date: ' + social_events[i].date.day + '.' + social_events[i].date.month + '.' + social_events[i].date.year;

            let titleEl = document.createElement('h3');
            titleEl.innerText = social_events[i].name;

            let textEl = document.createElement('p');
            textEl.innerText = social_events[i].text;

            leftDivEl.appendChild(dateEl);
            leftDivEl.appendChild(titleEl);
            leftDivEl.appendChild(textEl);

            // Make another layout if the event is "tournament"
            if(social_events[i].eventType == 'tournament') {
                buttonEl.innerHTML += ' | Tournament'; 
            }


            splitEl.appendChild(leftDivEl);


            let rightDivEl = document.createElement('div');
            rightDivEl.classList.add('img-container');

            let imgEl = document.createElement('img');
            imgEl.src = '../../bordtennis/media/gathering-images/' + social_events[i].imgName;
            imgEl.alt = 'Event picture';

            rightDivEl.appendChild(imgEl);

            splitEl.appendChild(rightDivEl);


            galleryEl.appendChild(contentEl);
        }
        else {
            galleryEl.innerText = 'There are no posted events from ' + currentYearEl.innerText;
        }
    }
}

function openFirstCollapsible() {
    // As long as there is a collapsible element, rundt click() event
    if(document.getElementsByClassName('collapsible')[0] != undefined) {
        document.getElementsByClassName('collapsible')[0].click();
    }
}


// Browse through the years of events
function changeYear(e) {
    if(e.target.id == 'nextYear') {
        currentYearEl.innerText = Number(currentYearEl.innerText, 10) + 1;
        galleryEl.innerHTML = '';
        createCollapsibles();
        addEventListeners();
        openFirstCollapsible();
    }
    else if(e.target.id == 'previousYear') {
        currentYearEl.innerText = Number(currentYearEl.innerText) - 1;
        galleryEl.innerHTML = '';
        createCollapsibles();
        addEventListeners();
        openFirstCollapsible();
    }
}

function addEventListeners() {
    // Script to animate collapsibles dropdown, as well as giving them eventlisteners
    document.querySelectorAll('.collapsible').forEach(button => {
        button.addEventListener('click', () => {
            const collapsibleContent = button.nextElementSibling;
    
            button.classList.toggle('collapsible-active');
    
            if(button.classList.contains('collapsible-active')) {
                collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 'px';
            }
            else {
                collapsibleContent.style.maxHeight = 0;
            }
        })
    });
}

// First time script is run, perform functions
// Create collapsibles
createCollapsibles();
//Add Eventlisteners
addEventListeners();