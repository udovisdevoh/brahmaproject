function rateBotAjax(aiUnitId, isUp, outputMessageDomId)
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
	/*xmlhttp.setRequestHeader("Content-length", 2);
	xmlhttp.setRequestHeader("Connection", "close");*/
	
	xmlhttp.send('id=' + aiUnitId + '&isUp=' + isUp);
}

function signInAjax(user, password, outputMessageDomId)
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
  	    }
	}
	
	xmlhttp.open("POST", './signin.php', true);
	
	var postData = 'user=' + escape(user) + '&password=' + escape(password);
	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	/*xmlhttp.setRequestHeader("Content-length", postData.length);
	xmlhttp.setRequestHeader("Connection", "close");*/
	xmlhttp.send(postData);
}

function signOutAjax(id, outputMessageDomId)
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
  	    }
	}
	
	xmlhttp.open("POST", './signout.php', true);
	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	/*xmlhttp.setRequestHeader("Content-length", 1);
	xmlhttp.setRequestHeader("Connection", "close");*/
	
	xmlhttp.send('id=' + id);
}

function saveAjax(aiUnitId, talkingRouter, outputMessageDomId)
{
	var memory = talkingRouter.memoryIo.getExportedMemory();
	alert(memory);
	
	
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
	
	xmlhttp.open("POST", './save.php', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send('ai=' + aiUnitId + '&memory=' + escape(memory));
}