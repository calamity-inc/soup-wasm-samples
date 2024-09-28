const nullptr = 0;

function inquire(cmd)
{
	if (!soup.ready)
	{
		document.getElementById("result").textContent = "[not ready]";
		return;
	}
	let m = nullptr;
	try
	{
		m = soup.InquiryLang.execute(cmd);
		if (m == nullptr)
		{
			document.getElementById("result").textContent = "[no result]";
			return;
		}
		if (soup.Mixed.isCanvas(m))
		{
			let c = soup.Mixed.getCanvas(m);
			soup.Canvas.upscaleMultiply(c, 4);
			let ps = soup.Canvas.toNewPngString(c);
			let pb = soup.base64.encode(ps);

			let img = document.createElement("img");
			img.src = "data:image/png;base64," + pb;
			document.getElementById("result").innerHTML = "";
			document.getElementById("result").appendChild(img);

			soup.free(ps);
		}
		else
		{
			document.getElementById("result").textContent = soup.InquiryLang.formatResultLine(m);
		}
	}
	catch(e)
	{
		document.getElementById("result").textContent = "Error: " + soup.exception.what(e);
	}
	if (m != nullptr)
	{
		soup.free(m);
	}
}

function submitCommand()
{
	let cmd = document.getElementById("cmd").value;
	location.hash=cmd;
	inquire(document.getElementById("cmd").value);
	return false;
}

soup.use(function()
{
	setTimeout(()=>{
	if(location.hash)
	{
		inquire(document.getElementById("cmd").value = decodeURIComponent(location.hash.substr(1)));
	}
	else
	{
		inquire("help");
	}
});
});