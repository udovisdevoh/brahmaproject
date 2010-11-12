//Remembers previous entries and provide autocomplete
function AutoComplete(conceptNameMapper)
{
	//Parts
	this.conceptNameMapper = conceptNameMapper;
	this.previousStatements = Array();
	this.previousStatementsPointer = -1;
}

//(Void) remember statement so it can be retrieved in a doskey-like way
AutoComplete.prototype.remember = function AutoComplete_remember(statementString)
{
	if (this.previousStatements.length - 1 < 0 || statementString != this.previousStatements[this.previousStatements.length - 1])
		this.previousStatements.push(statementString);

	this.previousStatementsPointer = this.previousStatements.length - 1;
}

//(String) get remembered statement
//null if nothing left
AutoComplete.prototype.getStatement = function AutoComplete_getStatement()
{
	if (this.previousStatementsPointer < this.previousStatements.length && this.previousStatementsPointer > -1)
		return this.previousStatements[this.previousStatementsPointer];
	return null;
}

//(Void) move up in remembered statements
AutoComplete.prototype.moveUp = function AutoComplete_moveUp()
{
	if (this.previousStatementsPointer > 0)
		this.previousStatementsPointer--;
}

//(Void) move down in remembered statements
AutoComplete.prototype.moveDown = function AutoComplete_moveDown()
{
	if (this.previousStatementsPointer < this.previousStatements.length - 1)
		this.previousStatementsPointer++;
}