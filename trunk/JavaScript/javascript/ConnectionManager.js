//Represents a concept (subject, verb or complement)
function ConnectionManager()
{
}

//Add a connection from subject through verb to complement
ConnectionManager.prototype.addConnection = function ConnectionManager_addConnection(subject, verb, complement)
{
	if (subject.totologyConnections[verb] == null)
	{
		subject.totologyConnections[verb] = Array();
	}
	if (subject.totologyConnections[verb].indexOf(complement) == -1)
	{
		subject.totologyConnections[verb].push(complement);
	}
}

//Remove a connection from subject through verb to complement
ConnectionManager.prototype.removeConnection = function ConnectionManager_removeConnection(subject, verb, complement)
{
	if (subject.totologyConnections[verb] != null)
	{
		var index = subject.totologyConnections[verb].indexOf(complement);
		if (index != -1)
		{
			subject.totologyConnections[verb].splice(index, 1);
		}
	}
}

//Add a connection from subject through verb to complement
ConnectionManager.prototype.testConnection = function ConnectionManager_testConnection(subject, verb, complement)
{
	if (subject.totologyConnections[verb] == null)
	{
		return false;
	}
	else
	{
		return subject.totologyConnections[verb].indexOf(complement) != -1;
	}
}