//Remembers previous entries
function History(conceptNameMapper)
{
	//Parts
	this.conceptNameMapper = conceptNameMapper;
	this.previousStatements = Array();
	this.previousStatementsPointer = -1;
}

//(Void) remember statement so it can be retrieved in a doskey-like way
History.prototype.remember = function History_remember(statementString)
{
	if (this.previousStatements.length - 1 < 0 || statementString != this.previousStatements[this.previousStatements.length - 1])
		this.previousStatements.push(statementString);

	this.previousStatementsPointer = this.previousStatements.length - 1;
}

//(String) get remembered statement
//null if nothing left
History.prototype.getStatement = function History_getStatement()
{
	if (this.previousStatementsPointer < this.previousStatements.length && this.previousStatementsPointer > -1)
		return this.previousStatements[this.previousStatementsPointer];
	return null;
}

//(Void) move up in remembered statements
History.prototype.moveUp = function History_moveUp()
{
	if (this.previousStatementsPointer > 0)
		this.previousStatementsPointer--;
}

//(Void) move down in remembered statements
History.prototype.moveDown = function History_moveDown()
{
	if (this.previousStatementsPointer < this.previousStatements.length - 1)
		this.previousStatementsPointer++;
}