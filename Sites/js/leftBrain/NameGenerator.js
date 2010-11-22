function RandomNameGenerator()
{
	this.vowelList = Array('a','e','i','o','u');
	this.consonantList = Array('b','c','d','f','g','ch','j','k','l','m','n','p','qu','r','s','sh','t','v','w','x','y','z');
}

RandomNameGenerator.prototype.generateRandomName = function RandomNameGenerator_generateRandomName(desiredLength)
{
	var randomName = '';
	for (var counter = 0; counter < desiredLength + 5 ; counter++)
	{
		randomName += this.getNextLetter(randomName);
	}
	
	return this.fixRandomName(randomName, desiredLength);
}

RandomNameGenerator.prototype.getNextLetter = function RandomNameGenerator_getNextLetter(name)
{
	var lastLetter = null;
	var isNextConsonant = false;
	
	if (name.length > 0)
		lastLetter = name.substr(name.length - 1);
	
	if (this.vowelList.indexOf(lastLetter) != -1)
		isNextConsonant = Math.random() > 0.3;
	else
		isNextConsonant = Math.random() > 0.7;
	
	if (isNextConsonant)
		return this.consonantList[Math.floor(Math.random() * this.consonantList.length)];
	else
		return this.vowelList[Math.floor(Math.random() * this.vowelList.length)];
}

RandomNameGenerator.prototype.fixRandomName = function RandomNameGenerator_fixRandomName(name, desiredLength)
{
	for (var letterIndex = 0; letterIndex < this.vowelList.length; letterIndex++)
		while (name.indexOf(this.vowelList[letterIndex]+this.vowelList[letterIndex]) != -1)
			name = name.replace(this.vowelList[letterIndex]+this.vowelList[letterIndex], this.vowelList[letterIndex]);
			
	for (var letterIndex = 0; letterIndex < this.consonantList.length; letterIndex++)
		while (name.indexOf(this.consonantList[letterIndex]+this.consonantList[letterIndex]) != -1)
			name = name.replace(this.consonantList[letterIndex]+this.consonantList[letterIndex], this.consonantList[letterIndex]);

	if (name.length > desiredLength)
		name = name.substr(0, desiredLength);
		
	name = name.substr(0,1).toUpperCase() + name.substr(1);
		
	return name;
}