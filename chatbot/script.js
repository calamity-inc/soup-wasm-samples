function doSubmit()
{
	try
	{
		soup.scope(function()
		{
			let res = soup.Chatbot.process(document.querySelector("input").value);
			document.getElementById("text-response").textContent = soup.cbResult.getResponse(res);
		});
	}
	catch(e)
	{
		alert(e);
	}
	return false;
}