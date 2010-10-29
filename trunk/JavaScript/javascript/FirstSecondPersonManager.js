//Manages you and me pronouns
//Manages human's name and ai's name
function FirstSecondPersonManager(humanName, aiName)
{
	//Fields
	this.humanName = humanName; //(String)
	this.aiName = aiName; //(String)
}

//(String (HTML)) format human's input to remove human's YOU and I context
FirstSecondPersonManager.prototype.formatHumanInput = function FirstSecondPersonManager_formatHumanInput(statementString)
{
	statementString = ' ' + statementString + ' ';
	
	while (statementString.indexOf(' you ') != -1)
		statementString = statementString.replace(' you ', ' ' + this.aiName + ' ');
		
	while (statementString.indexOf(' me ') != -1)
		statementString = statementString.replace(' me ', ' ' + this.humanName + ' ');
		
	while (statementString.indexOf(' i ') != -1)
		statementString = statementString.replace(' i ', ' ' + this.humanName + ' ');
	
	statementString = statementString.trim();
	
	return statementString;
}

//(String (HTML)) format human's output to add ai's YOU and I context
FirstSecondPersonManager.prototype.formatAiOutput = function FirstSecondPersonManager_formatAiOutput(statementString)
{
	statementString = ' ' + statementString + ' ';
	
	while (statementString.indexOf(' ' + this.aiName + ' ') != -1)
		statementString = statementString.replace(' ' + this.aiName + ' ', ' me ');
	while (statementString.indexOf(' ' + this.humanName + ' ') != -1)
		statementString = statementString.replace(' ' + this.humanName + ' ', ' you ');
		
	while (statementString.indexOf('>' + this.aiName + '<') != -1)
		statementString = statementString.replace('>' + this.aiName + '<', '>me<');
	while (statementString.indexOf('>' + this.humanName + '<') != -1)
		statementString = statementString.replace('>' + this.humanName + '<', '>you<');
	
	statementString = statementString.trim();
	
	return statementString;
}