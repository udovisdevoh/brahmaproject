//Completes input
function AutoComplete(flattenizer, conceptNameMapper, proofCache)
{
	//Parts, fields and constants
	this.flattenizer = flattenizer;
	this.conceptNameMapper = conceptNameMapper;
	this.proofCache = proofCache;
	this.currentPosition = 0;
	this.isVisible = false;
	this.selection = Array(); //List of words
	this.selectionWithReferenceConcept = Array(); //List of words with reference concepts
	this.paranthesesConceptCache = new Hash(); //list of reference concept, for instance: race (contest) [key: race, value: contest]
	this.halfHeightOfWidget = 68;
}

//(String) get stub of last word
//or NULL if can't get one for now
AutoComplete.prototype.getLastWordStub = function AutoComplete_getLastWordStub(statementString)
{
	statementString = ' ' + statementString;

	var lastSpacePosition = statementString.lastIndexOf(' ');
	
	var lastWord = statementString.substr(lastSpacePosition).trim();
	if (lastWord.length > 0)
		return lastWord;
	return null;
}

//(String[]) list of words starting with wordStub
//null if nothing matched
AutoComplete.prototype.getWordList = function AutoComplete_getWordList(wordStub)
{
	this.currentPosition = 0;
	
	var startPosition = this.getFirstWordPositionStartWith(wordStub, this.conceptNameMapper.allNames, 0, this.conceptNameMapper.allNames.length - 1);

	if (startPosition == -1)
		return null;
	
	this.selection = Array();
	
	
	for (var index = startPosition; index < this.conceptNameMapper.allNames.length; index++)
	{
		var name = this.conceptNameMapper.allNames[index];
		if (name.startsWith(wordStub))
		{
			this.selection.push(name);
		}
		else
		{
			break;
		}
	}

	//We add reference concept, for instance: race (contest)
	this.selectionWithReferenceConcept = Array();	
	for (var index = 0; index < this.selection.length; index++)
	{
		var word = this.selection[index];
		if (word.indexOf('(') == -1 || word.indexOf(')') == -1)
			this.selectionWithReferenceConcept.push(this.getWordWithReference(word));
		else
			this.selectionWithReferenceConcept.push(word);
	}
	
	return this.selectionWithReferenceConcept;
}

//(int) Position of first word starting with word stub
// (works with binary search)
// -1 if nothing found
AutoComplete.prototype.getFirstWordPositionStartWith = function AutoComplete_getFirstWordPositionStartWith(wordStub, wordList, startPosition, endPosition)
{
	if (startPosition == endPosition)
	{
		if (wordList[startPosition].startsWith(wordStub))
			return startPosition;
		else
			return -1;
	}
	else if (startPosition + 1 == endPosition)
	{
		if (wordList[startPosition].startsWith(wordStub))
			return startPosition;
		else if (wordList[endPosition].startsWith(wordStub))
			return endPosition;
		else
			return -1;
	}

	var pivot = Math.round((startPosition + endPosition) / 2);
	
	if (wordStub <= wordList[pivot].substr(0,wordStub.length))
		return this.getFirstWordPositionStartWith(wordStub, wordList, startPosition, pivot);
	else
		return this.getFirstWordPositionStartWith(wordStub, wordList, pivot + 1, endPosition);
}

//(Void) Move up in autocomplete
AutoComplete.prototype.moveUp = function AutoComplete_moveUp(autoCompleteDom)
{
	if (this.currentPosition > 0)
	{
		var selectedElement;
		var selectedElement = document.getElementById('autoCompleteWord_' + this.currentPosition);
		selectedElement.setAttribute("class","");
		selectedElement.setAttribute("className","");
		
		this.currentPosition--;
		
		selectedElement = document.getElementById('autoCompleteWord_' + this.currentPosition);
		selectedElement.setAttribute("class","Selected");	
		selectedElement.setAttribute("className","Selected");
		
		autoCompleteDom.scrollTop = selectedElement.offsetTop - this.halfHeightOfWidget;
	}
}

//(Void) Move down in autocomplete
AutoComplete.prototype.moveDown = function AutoComplete_moveDown(autoCompleteDom)
{
	if (this.currentPosition < this.selection.length -1)
	{
		var selectedElement;
		selectedElement = document.getElementById('autoCompleteWord_' + this.currentPosition);
		selectedElement.setAttribute("class","");
		selectedElement.setAttribute("className","");
	
		this.currentPosition++;
		
		selectedElement = document.getElementById('autoCompleteWord_' + this.currentPosition);
		selectedElement.setAttribute("class","Selected");	
		selectedElement.setAttribute("className","Selected");
		
		autoCompleteDom.scrollTop = selectedElement.offsetTop - this.halfHeightOfWidget;
	}
}

//(String)
AutoComplete.prototype.replaceLastWordWithSelectedWord = function AutoComplete_replaceLastWordWithSelectedWord(textString)
{
	var lastSpacePosition = textString.lastIndexOf(' ');
	
	if (lastSpacePosition != -1)
	{
		textString = textString.substr(0, lastSpacePosition + 1);
		textString += this.selection[this.currentPosition];
	}
	else
	{
		textString = this.selection[this.currentPosition];
	}
	
	return textString;
}

//(String)
//We add reference concept, for instance: race (contest)
AutoComplete.prototype.getWordWithReference = function AutoComplete_getWordWithReference(conceptName)
{
	if (this.paranthesesConceptCache.hasItem(conceptName))
	{
		return conceptName + ' (' + this.paranthesesConceptCache.getItem(conceptName) + ')';
	}
	else
	{
		if (this.conceptNameMapper.mapNameToConcept.keys.indexOf(conceptName) != -1)
		{
			var mostReleventConcept = this.getMostReleventConcept(this.conceptNameMapper.getConcept(conceptName));
			if (mostReleventConcept != null)
			{	
				var referenceConceptName = mostReleventConcept.toString();
				if (referenceConceptName.indexOf('_(') != -1 && referenceConceptName.indexOf(')') != -1)
				{
					referenceConceptName = referenceConceptName.substr(0, referenceConceptName.lastIndexOf('_('));
				}
				this.paranthesesConceptCache.setItem(conceptName, referenceConceptName);
				return conceptName + ' (' + referenceConceptName + ')';
			}
		}
	}
	
	return conceptName;
}

//(Concept)
//Find the concept for which most implicit connections are derived
AutoComplete.prototype.getMostReleventConcept = function AutoComplete_getMostReleventConcept(subject)
{
	var conceptConnectionCounter = new Hash();
	
	for (var verbIndex = 0; verbIndex < this.flattenizer.instinct.verbList.length; verbIndex++)
	{
		var verb = this.flattenizer.instinct.verbList[verbIndex];
		
		var implicitBranch = subject.getImplicitBranch(verb);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, verb);
				
		var tautologicBranch = subject.getTautologicBranch(verb);
		
		for (var complementIndex = 0; complementIndex < tautologicBranch.complementList.length; complementIndex++)
		{
			var complement = tautologicBranch.complementList[complementIndex];
			if (!conceptConnectionCounter.hasItem(complement))
			{
				conceptConnectionCounter.setItem(complement,0);
			}
		}
	}
	
	for (var verbIndex = 0; verbIndex < this.flattenizer.instinct.verbList.length; verbIndex++)
	{
		var verb = this.flattenizer.instinct.verbList[verbIndex];	
		var implicitBranch = subject.getImplicitBranch(verb);
				
		for (var complementIndex = 0; complementIndex < implicitBranch.complementList.length; complementIndex++)
		{
			var complement = implicitBranch.complementList[complementIndex];
			var proof = this.proofCache.getProof(subject, verb, complement, true);
			
			if (proof != null)
			{
				for (var argumentIndex = 0; argumentIndex < proof.length; argumentIndex++)
				{
					var argument = proof[argumentIndex];
					if (conceptConnectionCounter.hasItem(argument.subject))
					{
						conceptConnectionCounter.setItem(argument.subject, conceptConnectionCounter.getItem(argument.subject) + 1);
					}
					else if (conceptConnectionCounter.hasItem(argument.complement))
					{
						conceptConnectionCounter.setItem(argument.complement, conceptConnectionCounter.getItem(argument.complement) + 1);
					}
				}
			}
		}
	}
	
	var mostReleventConcept = null;
	var biggestConnectionCount = -1;
	
	for (var index = 0; index < conceptConnectionCounter.keys.length; index++)
	{
		var complement = conceptConnectionCounter.keys[index];
		var currentConnectionCount = conceptConnectionCounter.getItem(complement);
		
		if (currentConnectionCount > biggestConnectionCount)
		{
			biggestConnectionCount = currentConnectionCount;
			mostReleventConcept = complement;
		}
	}

	return mostReleventConcept;
}