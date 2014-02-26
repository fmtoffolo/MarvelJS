var marvelApi = (function($, Handlebars){

    

    var getCharacter = function(){
            var pubKey = '183da47a6957f77d1e530a4e3ba93528',
                randomChar = Math.floor(Math.random()*1401);
                fullURL = 'http://gateway.marvel.com:80/v1/public/characters?limit=1&offset=' + randomChar + '&apikey=' + pubKey;


            $.getJSON(fullURL, function(data){
                console.log(data);
                var data = data.data.results[0];
                console.log(data.name);
                console.log(data.description);
                if(data.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || data.description === ""){
                    return getCharacter(); 
                }
                var finalData = {
                    name: data.name,
                    description: data.description,
                    imgURL: data.thumbnail.path +'.'+ data.thumbnail.extension,
                    id: data.id;
                }
                var comicsURL = 'http://gateway.marvel.com:80/v1/public/characters/' + finalData.id + '/comics?apikey=183da47a6957f77d1e530a4e3ba93528'
                $.getJSON(comicsURL, function(data){
                    var comics = data.data.results;
                    var comicsData;
                    for (var i = 0; i < comics.length; i++) {
                        comicsData.push = {title: comics[i].title,
                            description: comics[i].description,
                            coverURL: comics[i].thumbnail + '.' + comics[i].extension;
                    };
                })
                
                var templateScript = $('#main').html();
                var theTemplate = Handlebars.compile(templateScript);

                

                $(document.body).append(theTemplate(finalData));
                
                })
        }

    getCharacter();



})(jQuery, Handlebars)