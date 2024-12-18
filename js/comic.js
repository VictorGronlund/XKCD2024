var maxComic
var currentComic

window.onload = function(){
    //hämta senaste comic
    getComic('latest');
    //sätter funktionalitet

}

function getComic(Which){

    // Check function next and prev
    if(Which == 'next') {
        Which = (currentComic + 1) ;
    }
    if(Which == 'prev') {
        Which = (currentComic - 1) ;
    }
    //console.log(currentComic);
    //console.log(Which);

    //Hämta(fetch) data från xkcd api
    fetch('https://xkcd.vercel.app/?comic='+Which)
        .then(function(response){
            //Kolla om svaret är ok(200)
            if(response.status === 200){
                return response.json();
            } else {
                //Kastar ett felmeddelande om status inte är ok
                throw new Error('Failed to load comic');
            }
        })
        .then(function(data){
            //Uppdatera maxComic värde
            if(maxComic < data.num){
                maxComic=data.num;
            }
             //Uppdatera currentComic värde
                currentComic=data.num;  
            //Skicka json data för behandling till DOM
            console.log(data);
            appendComic(data);
        })
        .catch(function(error){
            //logga eventuella errors
            console.log('Error: ', error);
        })
}

function appendComic(data){
    // Title
    const elemtext = document.getElementById("ctitle") ;
    elemtext.innerText = data.title ;
    
    // Date
    const elemdate = document.getElementById("cdate") ;
    elemdate.innerText = data.year + "-" + data.month + "-" + data.day ;
    
    // Image
    const elemimg = document.getElementById("comic") ;
    elemimg.innerHTML = "<img src=" + data.img + "></img>" ;

}