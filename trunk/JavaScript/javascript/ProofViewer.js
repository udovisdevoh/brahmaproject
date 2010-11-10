//To produce output from proofs
function ProofViewer(flattenizer, proofCache)
{
	this.flattenizer = flattenizer;
	this.proofCache = proofCache;
}

//(String (HTML) view the proof
ProofViewer.prototype.viewProof = function ProofViewer_viewProof(subject, verb, complement, depth)
{
	if (depth == null)
		depth = 0;

	var isPositive = this.flattenizer.testConnection(subject, verb, complement);

	var proof = this.proofCache.getProof(subject, verb, complement);
	
	if (proof == null || proof.length == 0)
		return null;
	
	if (depth == 0)
		var htmlProof = "because<br />";
	else
		var htmlProof = '';
		
	for (var index = 0; index < proof.length; index++)
	{
		var statement = proof[index];
		try
		{
			var subProof = this.viewProof(statement.subject, statement.verb, statement.complement, depth + 1);
			
			if (subProof == null)
			{
				/*if (!statement.verb.isNaturalOperator && statement.verb.complementaryOperators.length > 0)
				{
					htmlProof += '<span class="AiConcept">' + statement.complement + '</span> <span class="AiOperator">' + statement.verb.complementaryOperators[0] + '</span> <span class="AiConcept">' + statement.subject + '</span>,<br />';
				}
				else
				{
					htmlProof += '<span class="AiConcept">' + statement.subject + '</span> <span class="AiOperator">' + statement.verb + '</span> <span class="AiConcept">' + statement.complement + '</span>,<br />';
				}*/
				htmlProof += '<span class="AiConcept">' + statement.subject + '</span> <span class="AiOperator">' + statement.verb + '</span> <span class="AiConcept">' + statement.complement + '</span>,<br />';
			}
			else
			{
				htmlProof += subProof;
			}
		}
		catch (err)
		{
			//some fault tolerance for IE
		}
	}
	
	if (depth == 0)
		htmlProof += 'therefore, <span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + verb + '</span> <span class="AiConcept">' + complement + '</span>';
	
	return htmlProof;
}