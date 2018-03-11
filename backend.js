var channels = ["freecodecamp", "ubisoft", "sodapoppin", "shroud", "imdb"];

function makeURL(type, name){
	return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
};

function getChannelInfo(){
	channels.forEach(function(val){
		$.getJSON(makeURL("streams", val), function(data){
			var game, status = data.stream !== null && data.stream !== undefined ? "stream" : "offline";
			if(data.stream === null) game = "Offline";
			else if(data.stream === undefined) game = "Account not found.";
			else game = data.stream.game;
			$.getJSON(makeURL("channels", val), function(data){
				var logo = data.logo != null ? data.logo : "https://raw.githubusercontent.com/Chris6077/Portfolio/master/images/logo.png", description = status === "stream" ? ": " + data.status : "";
				html = "<div class='" + status + "'><div id='pic'><img src='" + logo + "' class='pic'></div><div id='name'><a href='" + data.url + "' target='_blank'>" + data.name + "</a></div><div id='streaming'>" + game + "<span class='hidden'>" + description + "</span></div></div>";
				status === "stream" ? $("#streamers").prepend(html) : $("#streamers").append(html);
			});
		});
		first = "";
	});
};

$(document).ready(function() {
	getChannelInfo();
	$(".rad").click(function() {
		$(".rad").removeClass("active");
		$(this).addClass("active");
		var status = $(this).attr("id");
		if(status === "all") $(".stream, .offline").show();
		else if(status === "st"){
			$(".stream").show();
			$(".offline").hide();
		} else if(status === "offline"){
			$(".stream").hide();
			$(".offline").show();
		}
	});
});