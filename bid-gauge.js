function bidGauge(values) {

		var maxVal = values.maxVal;
		var increment = maxVal/10;
		var cMove = (values.committedBP/increment);
		var mMove = (values.maxBP/increment);
		var cMod = cMove % 1;
		var mMod = mMove % 1;
		var avail = values.maxBP - values.committedBP;
		var mValOffset = 39;
		var mValOffsetSmall = 20;
		var cValOffset = 7;

		for(i=increment;i<= maxVal;i+=increment){
			var inc = i/1000;
			$('.gauge-nums').append("<li><span>|</span>" + inc + "K</li>");
		}

		if(values.committedBP < 1){
			$('.gauge-front-blue').show();
			$('.gauge-front').hide();
			$('.gauge-bar-red').hide();
		}else if(values.committedBP < increment && values.committedBP > 0){
			$('.gauge-bar-red').hide();
		}

		$('.gauge-nums li').eq(Math.floor(cMove-1)).addClass('c-val');
		$('.gauge-nums li').eq(Math.floor(mMove-1)).addClass('m-val');

		$.each(values, function(c, m){
			var firstItem = $('.gauge-nums li').eq(0).position().left + $('.gauge-nums li').eq(0).width() / 2;
			var secondItem = $('.gauge-nums li').eq(1).position().left + $('.gauge-nums li').eq(1).width() / 2;
			var difference = secondItem-firstItem;
			if($('.small-gauge').length > 0){
				var mWidth = $('.m-val').position().left-mValOffsetSmall;
			}else{
				var mWidth = $('.m-val').position().left-mValOffset;
			}
			var cWidth = $('.c-val').position().left-cValOffset;

			if(mMod%1 != 0){
				mWidth = mWidth + (mMod * difference);
			}else if(cMod%1 != 0){
				cWidth = cWidth + (cMod * difference);
			}
			if(c == "maxBP"){
				$(".gauge-bar").animate({"width":mWidth});
				$(".green-amount").text("$" + avail);
			}else if(c == "committedBP"){
				if(cMove >= 1){
					$(".gauge-bar-red").animate({"width":cWidth});
				}
			}
		})

		$('.gauge-bar').tooltip({content:"Maximum Buying Power: $"+values.maxBP});
		$('.gauge-bar-red').tooltip({content:"Committed Buying Power: $"+values.committedBP});
		$('#current').change(function(){
			var current = parseInt($(this).val());
			bidGauge({committedBP:current,maxBP:4500,maxVal:5000});
		});
	}
