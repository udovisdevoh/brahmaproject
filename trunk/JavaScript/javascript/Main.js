var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var is_ie = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);

if (!Array.prototype.indexOf && is_ie)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			? Math.ceil(from)
			: Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++)
		{
			if (from in this && this[from] === elt)
				return from;
		}
		return -1;
	};
}

if (typeof String.prototype.trim !== 'function')
{
	String.prototype.trim = function()
	{
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

String.prototype.hardTrim = function String_hardTrim()
{
	var text = this.trim().toLowerCase();
	while (text.indexOf("  ") != -1)
		text = text.replace('  ',' ');
	
	/*while (text.indexOf(" (") != -1)
		text = text.replace(" (","(");
		
	while (text.indexOf("( ") != -1)
		text = text.replace('( ','(');
		
	while (text.indexOf(" )") != -1)
		text = text.replace(' )',')');
		
	while (text.indexOf(") ") != -1)
		text = text.replace(') ',')');*/
	
	return text;
}

String.prototype.startsWith = function String_startsWith(str)
{
	return (this.match("^"+str)==str);
}

function print_r(theObj)
{
	if(theObj.constructor == Array || theObj.constructor == Object)
	{
		document.write("<ul>");
		for(var p in theObj)
		{
			if(theObj[p].constructor == Array|| theObj[p].constructor == Object)
			{
				document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
				document.write("<ul>");
				print_r(theObj[p]);
				document.write("</ul>");
			}
			else
			{
				document.write("<li>["+p+"] => "+theObj[p]+"</li>");
			}
		}
		document.write("</ul>");
	}
}

function Hash()
{
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof(arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}
   
	this.removeItem = function(in_key)
	{
		var tmp_previous;
		if (typeof(this.items[in_key]) != 'undefined') {
			this.length--;
			var tmp_previous = this.items[in_key];
			delete this.items[in_key];
		}
	   
		return tmp_previous;
	}

	this.getItem = function(in_key) {
		return this.items[in_key];
	}

	this.setItem = function(in_key, in_value)
	{
		var tmp_previous;
		if (typeof(in_value) != 'undefined') {
			if (typeof(this.items[in_key]) == 'undefined') {
				this.length++;
			}
			else {
				tmp_previous = this.items[in_key];
			}

			this.items[in_key] = in_value;
		}
	   
		return tmp_previous;
	}

	this.hasItem = function(in_key)
	{
		return typeof(this.items[in_key]) != 'undefined';
	}

	this.clear = function()
	{
		for (var i in this.items) {
			delete this.items[i];
		}

		this.length = 0;
	}
}
