//Verb branch
function VerbBranch()
{
	//(Bool) whether the branch is flat (needs to be flattenized when not flat)
	this.isFlat = false;
	
	//(Bool) whether the branch is currently locked
	this.isLocked = false;
	
	//(Array of concept) list of complements
	this.complementList = Array();
}

//(Void) add complement to branch
VerbBranch.prototype.addComplement = function VerbBranch_addComplement(complement)
{
	if (!this.hasComplement(complement))
		this.complementList.push(complement);
}

//(Bool) whether verb branch has complement
VerbBranch.prototype.hasComplement = function VerbBranch_hasComplement(complement)
{
	return this.complementList.indexOf(complement) != -1;
}

//(Void) remove complement from branch
VerbBranch.prototype.removeComplement = function VerbBranch_addComplement(complement)
{
	var index = this.complementList.indexOf(complement);
	
	if (index != -1)
		this.complementList.splice(index, 1);
}

//(String) get string representation
VerbBranch.prototype.toString = function VerbBranch_toString(complement)
{
	var stringRepresentation = "";
	for (var index in this.complementList)
	{
		stringRepresentation += this.complementList[index] + ", ";
	}
	return stringRepresentation;
}