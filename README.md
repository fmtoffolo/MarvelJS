MarvelJS
========

Just testing Marvel's API.
You get a random character everytime you refresh. If the API returns data about where the character appears, you get that too.

Api limit is 1000 per day, so I get a batch of 20 characters(random offset) and loop trhough it searching for one with a picture and a description. If the batch has none, make a new call.

Gonna rework it with promises and some better structure.

Mobile Css for now, got to improve tablet and desktop look.
