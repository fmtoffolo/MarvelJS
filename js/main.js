var marvelApi = (function($, Handlebars){

    

    var getCharacter = function(){
            var pubKey = '183da47a6957f77d1e530a4e3ba93528',
                randomChar = Math.floor(Math.random()*1401),
                fullURL = 'http://gateway.marvel.com:80/v1/public/characters?limit=20&offset=' + randomChar + '&apikey=' + pubKey;


            $.getJSON(fullURL, function(data){
                var data = data.data.results,
                    fullChar = false,
                    finalData,
                    comicsURL;
                
                console.log('Getting character list - limit: 20')
                //loop through response data for character with pic and description. when it finds one, change the fullchar to true and 
                for (var i = 0; i < data.length; i++) {
                    if(data[i].thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && data[i].description !== ""){
                       
                        console.log(data[i].description);
                        console.log(data[i].thumbnail.path +'.'+ data[i].thumbnail.extension);

                        finalData = {
                            name: data[i].name,
                            description: data[i].description,
                            imgURL: data[i].thumbnail.path +'.'+ data[i].thumbnail.extension,
                            id: data[i].id
                            }                         
                        fullChar = true;
                        break;
                    }
                };
                
                //if no character with pic and description is found in the sample of 50, make a new request.
                if(fullChar == false){
                    return getCharacter();
                }

                

                var templateScript = $('#main').html();
                var theTemplate = Handlebars.compile(templateScript);

                $('#character').append(theTemplate(finalData));

                comicsURL = 'http://gateway.marvel.com:80/v1/public/characters/' + finalData.id + '/comics?apikey=183da47a6957f77d1e530a4e3ba93528'
                
                $.getJSON(comicsURL, function(data){
                    var comics = data.data.results;
                    var comicsData = [];
                    for (var i = 0; i < comics.length; i++) {
                        comicsData.push({
                            title: comics[i].title,
                            description: comics[i].description,
                            coverURL: comics[i].thumbnail.path + '.' + comics[i].thumbnail.extension,
                            readURL: comics[i].urls[0].url
                        });
                    };



                    var templateLoop = $("#comics").html();
                    var theTemplateComics = Handlebars.compile(templateLoop);


                    $('#comicsDiv').append(theTemplateComics(comicsData));

                })
        
                
               
            })
        }

    getCharacter();



})(jQuery, Handlebars)