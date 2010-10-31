//Makes AI ask questions in order to learn
function AskViewer(flattenizer, instinct, conceptNameMapper)
{
	//Constants
	this.maxIgnoreListLength = 10;
	
	//Parts
	this.instinct = instinct;
	this.flattenizer = flattenizer;
	this.conceptNameMapper = conceptNameMapper;
	this.ignoreList = Array();
}

//(String (HTML))
AskViewer.prototype.askAbout = function AskViewer_askAbout(subject)
{
	var leastDocumentedVerb = this.getLeastDocumentedVerbNotInIgnoreList(subject);
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);
	var question = '<span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + verb + '</span> what?';
	this.ignoreList.push(question);
	return question;
}

//(Concept)
AskViewer.prototype.getLeastDocumentedVerbNotInIgnoreList = function AskViewer_getLeastDocumentedVerbNotInIgnoreList(subject)
{
	
}