//To find objections to statements
function ObjectionFinder(flattenizer)
{
	this.flattenizer = flattenizer;
}

//(Statement) objection statement or null
ObjectionFinder.prototype.findObjection = function ObjectionFinder_findObjection(subject, verb, complement)
{
	for (var index = 0; index < verb.mutuallyExclusiveOperators.length; index++)
	{
		var mutuallyExclusiveVerb = verb.mutuallyExclusiveOperators[index];
		if (this.flattenizer.testConnection(subject, mutuallyExclusiveVerb, complement))
		{
			return new Statement(subject, mutuallyExclusiveVerb, complement);
		}
	}

	return null;
}