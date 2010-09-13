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
	subject.connections[verb][complement] = true;
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
		return subject.connections[verb][complement] == true;
	}
}