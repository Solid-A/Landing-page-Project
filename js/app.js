/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
const t0 = performance.now();  //performance
/**
 * Define Global Variables
 * 
*/
const selectUlNav = document.getElementById('navbar__list');
const selectSectoin = document.querySelectorAll('section');
const myDocFrag = document.createDocumentFragment();    // Document Fragment
const collapsible = document.querySelectorAll("button");
const head = document.querySelector('.page__header');
const toTop = document.querySelector('#to-top');
/**
 * End Global Variables
 *  
 * 
*/
/**
 *  
 * Begin Main Functions
 * 
*/
// build the nav
const addSectoin = () => {
    for(let item of selectSectoin){
        let sectionId = item.getAttribute('id');
        let sectionName = item.getAttribute('data-nav');
        let addLi = document.createElement('li');
        let addLink = document.createElement('a');
        addLink.textContent = sectionName;
        addLink.setAttribute('class', 'menu__link');
        addLink.setAttribute('href', `#${sectionId}`);   // Scroll to section on link click
        addLink.addEventListener('click', e =>{
            e.preventDefault();
            item.scrollIntoView({      // Scroll to anchor ID using scrollTO event
                behavior: 'smooth'
            });
        })
        addLi.appendChild(addLink);
        myDocFrag.appendChild(addLi);
    }
    
    selectUlNav.appendChild(myDocFrag);
};
addSectoin();

// Add class 'active' to section when near top of viewport
function makeActive(){
    selectSectoin.forEach(active =>{
        const activeView = active.getBoundingClientRect();
        let selectNames = active.getAttribute('data-nav');
        if(activeView.top <= 150 && activeView.bottom >= 300){
            active.classList.add('active-class');
            const selectLinks = document.querySelectorAll('a');
            selectLinks.forEach(classLink =>{    // Set sections as active
                if(classLink.textContent === selectNames){
                    classLink.classList.add('active-link');
                }else{
                    classLink.classList.remove('active-link');
                }
            })
        }else{
            active.classList.remove('active-class');
        }
    })
}
document.addEventListener("scroll", function() { makeActive();});



/**
 * End Main Functions
 * Begin Events
 * 
*/
function collView(){
    for (let i of collapsible) {
        i.addEventListener("click", () => {
            let content = i.nextElementSibling;
            if (content.style.display === "block") {
                    content.style.display = "none";
            } else {
                    content.style.display = "block";
            }
        })
    }
}
collView();


//Hide fixed navigation

window.onscroll = () => {
    head.style.transform = 'Translate(0px, -250px)';
    head.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() =>{
        head.style.transform = 'none';
    }, 3000);
}

//Add a scroll to the top button

document.addEventListener('scroll', () =>{ 
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700){
        toTop.style.display = 'block';
    }else{
        toTop.style.display = 'none';
    }
})

toTop.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


//performance Code to console
const t1 = performance.now();
console.log(t1 - t0);
