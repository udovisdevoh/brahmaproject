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
	if (subject.connections[verb].indexOf(complement) == -1)
	{
		subject.connections[verb].push(complement);
	}
}

//Remove a connection from subject through verb to complement
ConnectionManager.prototype.removeConnection = function ConnectionManager_removeConnection(subject, verb, complement)
{
	if (subject.connections[verb] != null)
	{
		var index = subject.connections[verb].indexOf(complement);
		if (index != -1)
		{
			subject.connections[verb].splice(index, 1);
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
		return subject.connections[verb].indexOf(complement) != -1;
	}
}