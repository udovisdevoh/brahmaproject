//Represents a concept (subject, verb or complement)
function ConnectionManager()
{
}

//Add a connection from subject through verb to complement
ConnectionManager.prototype.addConnection = function ConnectionManager_addConnection(subject, verb, complement)
{
	if (subject.connections[verb] == null)
	{
		subject.connections[verb] = Array();
	}
	subject.connections[verb][complement] = complement;
}

//Remove a connection from subject through verb to complement
ConnectionManager.prototype.removeConnection = function ConnectionManager_removeConnection(subject, verb, complement)
{
	if (subject.connections[verb] != null)
	{
		if (subject.connections[verb][complement] != null)
		{
			subject.connections[verb].splice(complement, 1);
		}
	}
}

//Add a connection from subject through verb to complement
ConnectionManager.prototype.testConnection = function ConnectionManager_testConnection(subject, verb, complement)
{
	if (subject.connections[verb] == null)
	{
		return false;
	}
	else
	{
		var complementExistence = subject.connections[verb][complement];
		return subject.connections[verb][complement] == complement;
	}
}