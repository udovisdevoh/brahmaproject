function rateBot(aiUnitId, isUp, outputMessageDomId)
{
	var xmlhttp;
	
	if (window.XMLHttpRequest)
  		xmlhttp=new XMLHttpRequest();
	else
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		
	xmlhttp.onreadystatechange = function()
	{
	    if (xmlhttp.readyState == 4)
		{
			var outputElement = document.getElementById(outputMessageDomId);
			outputElement.innerHTML = xmlhttp.responseText;
			outputElement.style.display = 'block';
  	    }
	}
	
	xmlhttp.open("POST", './ratebot.php', true);
	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", 2);
	xmlhttp.setRequestHeader("Connection", "close");
	
	xmlhttp.send('id=' + aiUnitId + '&isUp=' + isUp);
}