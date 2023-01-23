let inputs =[];
const inputEl = document.getElementById('input-el');
const btnEl = document.getElementById('input-btn');
const tabEl = document.getElementById('tab-btn');
const delEl = document.getElementById('delete-btn');
const uEl = document.getElementById('u-el');
const inputsfronlocalstorage = JSON.parse( localStorage.getItem("inputs") );

if(inputsfronlocalstorage){
    inputs = inputsfronlocalstorage;
    render(inputs);
}

function render(anyput){
    let savedlist="";
    for(let i=0;i<anyput.length;i++){
        savedlist += `
                    <li>
                        <a target='_blank' href='${anyput[i]}'>
                            ${anyput[i]}
                        </a>
                    </li>
                    `;
        uEl.innerHTML = savedlist;
    }
}

delEl.addEventListener('dblclick', function(){
    localStorage.clear();
    inputs = [""];
    render(inputs);   
})

btnEl.addEventListener('click', function(){
    inputs.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("inputs",JSON.stringify(inputs));
    render(inputs);
})

tabEl.addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        inputs.push(tabs[0].url);
        localStorage.setItem("inputs",JSON.stringify(inputs));
        render(inputs);
    })  
})
