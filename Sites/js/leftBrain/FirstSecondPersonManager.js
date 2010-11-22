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

//(Bool) whether theory's verb is valid considering the subject that can be "you" or "me"
//for instance: "maybe me someare pine" is not a valid theory because someare cannot be applied to unique concepts
FirstSecondPersonManager.prototype.isTheoryValidIfFirstOrSecondPerson = function FirstSecondPersonManager_isTheoryValidIfFirstOrSecondPerson(theory)
{
	if (theory.subject.toString() == this.humanName || theory.subject.toString() == this.aiName)
	{
		if (!theory.verb.isVerbAllowedForUniqueSubject)
		{
			return false;
		}
	}
	else if (theory.complement.toString() == this.humanName || theory.complement.toString() == this.aiName)
	{
		for (var complementaryVerbIndex = 0 ; complementaryVerbIndex < theory.verb.complementaryOperators.length; complementaryVerbIndex++)
		{
			var complementaryVerb = theory.verb.complementaryOperators[complementaryVerbIndex];
			if (!complementaryVerb.isVerbAllowedForUniqueSubject)
			{
				return false;
			}
		}
	}
	
	return true;
}

//(Bool) whether question's verb is valid considering the subject that can be "you" or "me"
//for instance: "maybe me someare pine" is not a valid theory because someare cannot be applied to unique concepts
FirstSecondPersonManager.prototype.isQuestionValidIfFirstOrSecondPerson = function FirstSecondPersonManager_isQuestionValidIfFirstOrSecondPerson(subject, verb)
{
	if (verb == null)
		return false;
	
	if (subject.toString() == this.humanName || subject.toString() == this.aiName)
	{
		if (!verb.isVerbAllowedForUniqueSubject)
		{
			return false;
		}
		else if (!verb.isVerbAllowedForAiSubjectQuestion && subject.toString() == this.aiName)
		{
			return false;
		}
	}
	return true;
}