var marvelApi = (function($, Handlebars){

    

    var getCharacter = function(){
            var pubKey = '183da47a6957f77d1e530a4e3ba93528',
                randomChar = Math.floor(Math.random()*1401);
                fullURL = 'http://gateway.marvel.com:80/v1/public/characters?limit=20&offset=' + randomChar + '&apikey=' + pubKey;


            $.getJSON(fullURL, function(data){
                var data = data.data.results,
                    fullChar = false,
                    finalData;
                
                for (var i = 0; i < data.length; i++) {
                    if(data[i].data.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && data[i].data.description !== "" && fullChar == false){
                        
                        finalData = {
                            name: data[i].data.name,
                            description: data[i].data.description,
                            imgURL: data[i].data.thumbnail.path +'.'+ data[i].data.thumbnail.extension,
                            id: data.id
                            }                         
                        fullChar = true;
                    }
                };
                


                
                var comicsURL = 'http://gateway.marvel.com:80/v1/public/characters/' + finalData.id + '/comics?apikey=183da47a6957f77d1e530a4e3ba93528'
                
                $.getJSON(comicsURL, function(data){
                    var comics = data.data.results;
                    var comicsData = [];
                    for (var i = 0; i < comics.length; i++) {
                        comicsData.push({
                            title: comics[i].title,
                            description: comics[i].description,
                            coverURL: comics[i].thumbnail.path + '.' + comics[i].thumbnail.extension
                        });
                    };

                    var templateScript = $('#main').html();
                    var theTemplate = Handlebars.compile(templateScript);

                    var templateLoop = $("#comics").html();
                    var theTemplateComics = Handlebars.compile(templateLoop);


                    $('#character').append(theTemplate(finalData));
                    $('#comicsDiv').append(theTemplateComics(comicsData));

                })
        
                
               
            })
        }

    getCharacter();



})(jQuery, Handlebars)