var marvelApi = (function(){

	var pubKey = '183da47a6957f77d1e530a4e3ba93528',
		randomChar = Math.floor(Math.random()*1401);
		fullURL = 'http://gateway.marvel.com:80/v1/public/characters?limit=1&offset=' + randomChar + '&apikey=' + pubKey;

		$.getJSON(fullURL, function(data){
			console.log(data);
			var data = data.data.results[0];
			console.log(data.name);
			console.log(data.description);
		})



})(jQuery)