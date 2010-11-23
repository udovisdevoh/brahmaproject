//Imports and exports memory
function MemoryIo(conceptNameMapper, flattenizer, instinct)
{
	this.conceptNameMapper = conceptNameMapper;
	this.flattenizer = flattenizer;
	this.instinct = instinct;
}

//(String)
//export memory to something serialized
MemoryIo.prototype.getExportedMemory = function MemoryIo_getExportedMemory()
{
	var exportedMemory = '';
	
	for (var subjectIndex = 0; subjectIndex < this.conceptNameMapper.conceptList.length; subjectIndex++)
	{
		var subject = this.conceptNameMapper.conceptList[subjectIndex];
		exportedMemory += this.getExportedMemoryForSubject(subject);
	}
	
	return exportedMemory;
}

//(String)
//export memory to something serialized
MemoryIo.prototype.getExportedMemoryForSubject = function MemoryIo_getExportedMemoryForSubject(subject)
{
	var exportedMemory = '';

	for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
	{
		var verb = this.instinct.verbList[verbIndex];
		
		if (verb.isNaturalOperator)
		{
			var implicitBranch = subject.getImplicitBranch(verb);
			if (!implicitBranch.isFlat)
				if (!implicitBranch.isLocked)
					this.flattenizer.flattenBranch(implicitBranch, subject, verb);					
			var tautologicBranch = subject.getTautologicBranch(verb);
			
			var branchToUse = tautologicBranch;
			
			var counter = 0;
			if (branchToUse.complementList.length > 0)
			{
				exportedMemory += '[' + verb.toString() + ':';
				
				for (var complementIndex = 0; complementIndex < branchToUse.complementList.length; complementIndex++)
				{
					var complement = branchToUse.complementList[complementIndex];
					exportedMemory += complement.toString();
					
					if (complementIndex < branchToUse.complementList.length - 1)
						exportedMemory += ',';
				}
				
				exportedMemory += ']';
			}
		}
	}
	
	
	
	//We export aliases
	var nameList = this.conceptNameMapper.mapConceptToName.getItem(subject);
	var aliasString = '';
	for (var nameIndex = 0; nameIndex < nameList.length; nameIndex++)
	{
		var otherName = nameList[nameIndex];
		if (otherName != subject.toString())
		{
			aliasString += otherName + ',';
		}
	}
	if (aliasString.length > 0)
	{
		aliasString = aliasString.substr(0, aliasString.length - 1);
		aliasString = '[aliasof:' + aliasString + ']';
		exportedMemory += aliasString;
	}
	
	
	
	if (exportedMemory.length > 0)
		exportedMemory = '{' + subject.toString() + ':' + exportedMemory + '}';
		
	return exportedMemory;
}