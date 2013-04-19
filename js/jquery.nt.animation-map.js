var initScale = 0.75;
var initX = -260;
var initY = -140;
var pointArr = [
	{
		pos: [1650, 0, 700, 40],
		scale: 4,
		head: "Våre Kunder",
		txt: '<div class="big">2 151 856</div>spillerkort var utstedt ved utgangen av 2012. I fjor kjøpte mer enn 1,9 millioner mennesker ett eller flere spill. Det ble solgt spill for 19,2 milliarder kroner.'
	},
	{
		pos: [1650, -500, 700, 40],
		scale: 4,
		head: "Premiene",
		txt: '<div class="big">12,9</div>milliarder kroner gikk tilbake til spillerne i form av premier (av 19,2 milliarder kroner i brutto omsetning). 417 spillere ble millionærer på ett av spillene i 2012.'
	},
	{
		pos: [780, -950, 100, 140],
		scale: 3,
		head: "Drifts-kostnader",
		txt: '<div class="big">2,4</div>milliarder kroner gikk<br>til drift av selskapet.<br>Dette beløpet inkluderer blant annet 864 millioner kroner i provisjon til kommisjonærene og 105 millioner til sponsoravtaler. Norsk Tipping har 362 ansatte.'
	},
	{
		pos: [34, -300, 700, 40],
		scale: 3,
		head: "Til Idrett",
		txt: '<div class="big">1,56</div>milliarder blir fordelt til idrettsformål, via den såkalte Tippenøkkelen. Idrett får 45,5%. Idrettens andel skal økes til 47,9% i år og opp til 64% i 2015.'
	},
	{
		pos: [-730, -150, 700, 40],
		scale: 3,
		head: "Til Kultur",
		txt: '<div class="big">1,25</div>milliarder går til kultur-<br>formål, som er 36,5% av Tippenøkkelen. Øremerkede tiltak er blant annet Den kulturelle skolesekken og Frifond (tiltak for barn og unge).'
	},
	{
		pos: [-1300, -800, 700, 40],
		scale: 3,
		head: "Grasrot-andelen",
		txt: '<div class="big">340</div>millioner kroner blir fordelt til lag og foreninger via Grasrotandelen. Myndighetene bestemmer hvem som kan være grasrotmottaker, mens Norsk Tipping utbetaler pengene.'
	},
	{
		pos: [-1170, 0, 700, 40],
		scale: 2,
		head: "Humanitære formål",
		txt: '<div class="big">616</div>millioner går til samfunnsnyttige og humanitære organisasjoner (18% av Tippenøkkelen). Norges Røde Kors er den største mottakeren.'
	},
	{
		pos: [-1670, 600, 50, 100],
		scale: 3,
		head: "Til Spille-avhengighet",
		txt: '<div class="big">12</div>millioner kroner ble brukt i Regjeringens handlingsplan mot pengespillproblemer. Pengene tas fra Norsk Tippings overskudd.'
	},
	{
		pos: [-800, 100, 700, 40],
		scale: 3,
		head: "Til frivillige",
		txt: '<div class="big">22,4</div>millioner kroner av overskuddet fra spillet Belago (Norsk Tippings spilltilbud i bingohaller)<br>går til frivillige lag og organisasjoner i lokalsamfunnet.'
	},
	{
		pos: [200, 400, 50, 100],
		scale: 2,
		head: "Til helse",
		txt: '<div class="big">220</div>millioner kroner, fordelt på 527 prosjekter, ble delt ut av ExtraStiftelsen Helse og Rehabilitering. Norsk Tipping er operatør for Extra-spillet og stiftelsen fordeler overskuddet.'
	}
	
];
$(document).ready(function() {
	//Create menu
	var createMenu = function() {
		var m = $("#menu");
		for (var i = 0; i < pointArr.length; i++) {
			var str = '<a href="#" class="menuItem normal" data-nr="'+(i+1)+'">';
			str += '<div class="yellowDot">'+(i+1)+'</div>';
			str += '<div class="menuTxt">'+pointArr[i].head+'</div></a>';
			m.append(str);
		}

		$("a.menuItem").on("click", function() {
			$("#map").removeClass();
			var nr = parseInt($(this).data("nr"))-1;
			//IE9 hack!
			var xpos = (!Modernizr.csstransitions) ?  pointArr[nr].pos[0]/pointArr[nr].scale : pointArr[nr].pos[0];
			var ypos = (!Modernizr.csstransitions) ?  pointArr[nr].pos[1]/pointArr[nr].scale : pointArr[nr].pos[1];
			var scale_nr = (!Modernizr.csstransitions) ? 1 : pointArr[nr].scale; // 1 : 
			//$("#log").append("<br>xpos: "+xpos+" > ypos > "+ypos+ " > scale > "+scale_nr);
			var infoTop = ($("#infoBox").height() == null) ? "-200px" : -$("#infoBox").height();

			$("#infoBox").animate({
				top: infoTop
			});
			
			$("#menu a.menuItem").each(function() {
				if ($(this).hasClass("active")) $(this).removeClass("active");
			});
			$(this).addClass("active");
			if (Modernizr.csstransitions) {
				$("#map")
					.stop().animate({
						left: xpos,
						top: ypos,
						scale: scale_nr
						
					}, 800, function() {
					openInfo(nr);
				});
			} else {
				openInfo(nr);
			}
			
		});
	}
	var oldIE = [];
	if (!Modernizr.csstransforms) {
	    oldIE.push("Din nettleser støtter ikke siste versjon av css3(csstransforms)")
	};

	if (!Modernizr.csstransitions) {
		oldIE.push("Din nettleser støtter ikke siste versjon av css3(csstransitions)");
		$.fn.transition = $.fn.animate;
	};

	if (!$.support.opacity) {
		oldIE.push("Din nettleser er utdatert");
	};

	// If ie - show something else ;) 
	if (oldIE.length > 0) {
		for (var i = 0; i < oldIE.length; i++) {
			$("#log").append(oldIE[i]+"<br>");
		}
		$("#map").html('<img src="img/tegningen_small.jpg" border="0" />');
		$("#extraMenu").css("display", "none");
		createMenu();
	} else {
		$("#map").html("Laster svg...");
		$("#map").load("tegningen.svg", function(res) {
			$(this).addClass("svgLoaded");
			$(this)
				.animate({
					left: initX,
					top: initY,
					scale: initScale
				}, 800, function() {
					createMenu();
				});

			if (!res) {
				$(this).html("klarte ikke å laste svg");
			};
		});	
	}
	
	var log = function(str) {
		$("#log").html(str+"<br>");
	}
	
	var openInfo = function(nr) {
		//$("#log").append("<br>after left: "+$("#map").css("left")+" > top > "+$("#map").css("top"));
		$("#info").html('<div id="infoBox"><div class="header"><div class="nr yellowDot">'+(nr+1)+'</div><div class="headerTxt">'+pointArr[nr].head+'</div></div><div class="txt">'+pointArr[nr].txt+'</div></div>');
		
		var infoTop = ($("#infoBox").height() == null) ? "-200px" : -$("#infoBox").height();
		$("#infoBox").css({
			left: pointArr[nr].pos[2],
			top: infoTop
		});

		$("#infoBox").stop().animate({
			left: pointArr[nr].pos[2],
			top: pointArr[nr].pos[3]
		});
	}

	$("#extraMenu .reset").on("click", function() {
		//log("reset");
		$("#menu a.menuItem").each(function() {
			if ($(this).hasClass("active")) $(this).removeClass("active");
		});
		var infoTop = ($("#infoBox").height() == null) ? "-200px" : -$("#infoBox").height();
		$("#infoBox").stop().animate({
			top: infoTop
		});
		$("#map").stop().animate({
			left: initX,
			top: initY,
			scale: initScale	
		})
	})
});	