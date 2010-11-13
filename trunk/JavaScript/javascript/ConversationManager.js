//Make proactive conversation with AI
function ConversationManager()
{
	//Fields
	this.isStarted = false;
}

//(String) humen conversation insentive to AI
ConversationManager.prototype.getHiddenHumanConversationInsentiveStatement = function ConversationManager_getHiddenHumanConversationInsentiveStatement()
{
	return "talk";
}