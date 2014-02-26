var marvelApi = (function($, Handlebars){

    var pubKey = '183da47a6957f77d1e530a4e3ba93528',
        randomChar = Math.floor(Math.random()*1401);
        fullURL = 'http://gateway.marvel.com:80/v1/public/characters?limit=1&offset=' + randomChar + '&apikey=' + pubKey;

    var getCharacter = function(){
            $.getJSON(fullURL, function(data){
            console.log(data);
            var data = data.data.results[0];
            console.log(data.name);
            console.log(data.description);
            if(data.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || data.description === ""){
                getCharacter(); 
            }
            var finalData = {
                name: data.name,
                description: data.description,
                imgURL: data.thumbnail.path +'.'+ data.thumbnail.extension
            }
            
            var templateScript = $('#main').html();
            var theTemplate = Handlebars.compile(templateScript);

            $(document.body).append(theTemplate(finalData));
            
            })
        }

    getCharacter();



})(jQuery, Handlebars)