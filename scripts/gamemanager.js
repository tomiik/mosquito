class GameManager{
	constructor(){
		//console.log("GameManager");
    this.numOfMosquitoes = 0;
		this.mosquitoes = [];
		this.clearTotalKill();//this.killed = 0;
		this.clearScore();//this.score = 0;
		//this.generateMosquitoes(3,1);
		this.start();
		this.won = true;
    this.creating = false;
    this.gameover = false;
		this.level = 1;
		this.strength = 10;
		this.luck = 1;
		this.money = 0;
		this.exp = 0;
	}
	start(){
    var me = this;
    this.setIntervalIdStatus=setInterval(statusChecker,50);
		function statusChecker(){
      if(me.won == true && me.creating == false && parseInt($("#num_of_mosquitoes").text()) <= 0 ){
        me.creating = true;
        me.won = false;
        var data = stages.shift();
        if(data){
          var mosquito = data[0];
          var speed = data[1];
          var message = data[2];
          console.log("creating" + message)
          me.createStage(mosquito,speed,message);
          this.redrawProgressBar(100);
        }
      }
			else if(parseInt($("#num_of_mosquitoes").text()) <= 0 && me.won == false && me.creating == false){
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          me.numOfMosquitoes = -1;
          me.killed = 0;
					me.win();
          //me.won = true;
			}
    }
	}
	timeCountStart(initTime){
		console.log("timeCountStart():" + initTime)
		this.setIntervalIdTimer=setInterval(timeCount,progressbarRefresh);
		var time = initTime;
		var me=this;
		function timeCount(){
			var progress = (time / initTime) * 100;
			progress = Math.floor(progress);

			redrawProgressBar(progress)

			if(progress <= 0){
				me.timeup();
			}

			time -= progressbarRefresh;
		}
	}
	timeup(){
		var me = this;
		this.stop_progressbar();
		setTimeout(function(){
			$("#message").text("Gameover");
			$("#message").removeClass("bounceOutDown");
			$("#message").removeClass("bounceInDown");

			console.log("gameover");
			me.gameover = true;
		},500)
	}
	stop_progressbar(){
		if (this.setIntervalIdTimer){
			clearInterval(this.setIntervalIdTimer);
			console.log("stop_progressbar()")
		}
	}
	getTimeRemain(){
		var time = $("#timebar").attr("aria-valuenow");
		return time;
	}
  createStage(mosquitoes, time, message){
    var me = this;
    setTimeout(function(){
      me.setMessage(message,1000);
    },0)
    setTimeout(function(){
      me.setMessage("kill " + mosquitoes[0] + " mosquitoes in " + time + " seconds",1000);
    },2000)
    setTimeout(function(){
      me.setMessage("Go",10);
      me.numOfMosquitoes = me.createMosquitoes(mosquitoes[0],mosquitoes[1],mosquitoes[2]);
      me.refreshStatus();
			sfxStageStart();
      me.timeCountStart(time*1000);
      me.creating = false;
      console.log("me.creating = false")
    },4000)
  }
  setMessage(str,time){
    //console.log("setMessage")
    var me = this;
		consoleWrite(str);

    $("#message").text(str);
    me.messageFadeIn();
    setTimeout(function(){
      //console.log("fadeout")
      me.messageFadeOut();
    },time)

  }
  messageFadeIn(){
    $("#message").removeClass("bounceOutDown");
    $("#message").addClass("bounceInDown");
  }
  messageFadeOut(){
    $("#message").removeClass("bounceInDown");
    $("#message").addClass("bounceOutDown");
  }
	win(){
    var me = this;
    this.setMessage("Clear",1000);
		this.checkLevelUp();

		this.stop_progressbar();
		var time = this.getTimeRemain();
		console.log("remain time: " +time);
		var bonus = Math.floor((time/100) * this.getScore());
		this.addScore(bonus);
		consoleWrite("You got " + bonus + "point.")
		this.refreshStatus();
    this.clearMosquitoes();
    me.won = true;

	}
  clearMosquitoes(){
    console.log("clearMosquitoes()");
    //console.log(this.mosquitoes.length)
    this.mosquitoes.forEach(function(mosquito, index){
      mosquito.reset();
    });
    this.mosquitoes = [];
  }
	click(e){
		var me = this;
    if(this.gameover == false){
      var killed = 0;
      var score = 0;
      this.mosquitoes.forEach(function(mosquito, index){
        var position = mosquito.getPosition();
				var offset = $("#playArea").position();
				var offsetX = offset["left"];
				var offsetY = offset["top"];

        if(e.clientX-offsetX-handSize < position.x && position.x < e.clientX-offsetX && e.clientY-offsetY-handSize < position.y && position.y < e.clientY-offsetY){
          if(!mosquito.dead)
          {
						var damage = me.damageCalc();
						var consoleOutStr = "Mosquito" + mosquito.num + " got damage " + damage + ".";
            score += mosquito.crash(damage);
						//console.log("score:" + score)
						if(score != 0){
							SfxDie();
							consoleOutStr += " Mosquito" + mosquito.num + " is dead.";
							consoleOutStr += " " + score + " points." ;
							killed++;
						}else{
							SfxHit();
						}
						consoleWrite(consoleOutStr);
          }
        }else{
					//SfxMiss();
				}
      });
      this.addTotalKill(killed);
      this.addScore(score);
			this.addExp(Math.round(score/100))
			this.addMon(Math.ceil(Math.random() * this.luck*score/10));
      this.refreshStatus();
    }
	}
	damageCalc(strength,luck){
		var damage = Math.round((this.strength * (Math.random() + 0.5))/2)+ Math.round(this.luck * Math.random());
		return damage;
	}
  addScore(score){
    this.score += score;
  }
	getScore(){
		return this.score;
	}
	addMon(mon){
		this.money += mon;
	}
	reducMon(mon){
		this.money -= mon;
	}
	addExp(exp){
		this.exp += exp;
	}

	addStrength(str){
		this.strength += str;
	}
	addLuck(luck){
		this.luck += luck;
	}
  clearScore(){
    this.score = 0;
  }
  addTotalKill(n){
    this.killed += n;
  }
  clearTotalKill(){
    this.killed = 0;
  }
	levelUp(){
		this.level++;
		consoleWrite("Lvel Up!");
		var str = Math.round(Math.random()*2) + Math.round(Math.random() * this.luck);
		var luck = Math.round(Math.random());
		consoleWrite("Lvel Up! str:+" + str + ", lck:+" +luck);
		this.addStrength(str);
		this.addLuck(luck);
		this.refreshStatus();
	}
	createMosquitoes(number, speed, power){
    //console.log("createMosquitoes()");
		var count = 0;
		var offset = this.mosquitoes.length;
    var max = Math.min(maxMosquitoes, number + offset);
		for(var i = offset + 1; i <= max; i++){
			this.mosquitoes.push(new Mosquito($('#mos' + i),i, speed, power));
			count++;
		}
    console.log("createMosquitoes()" + count);
		return count;
	}

	refreshStatus(){
		//var str_mos = "mosquitoes:" + (this.numOfMosquitoes - this.killed);
		//var str_score = ",score:" + this.score;
		//$("#info").text(str_mos + str_score);
		this.refreshScore();
		this.refreshStrength();
		this.refreshLuck();
		this.refreshLevel();
		this.refreshMon();
		this.refreshExp();
		this.refreshNumOfMosquitoes();
	}
	refreshScore(){
		$("#score").text(this.score);
	}
	refreshStrength(){
		$("#strength").text(this.strength);
	}
	refreshLuck(){
		$("#luck").text(this.luck);
	}
	refreshMon(){
		$("#money").text(this.money);
	}
	refreshExp(){
		$("#exp").text(this.exp);
	}
	refreshLevel(){
		$("#level").text(this.level);
	}
	refreshNumOfMosquitoes(){
		$("#num_of_mosquitoes").text(this.numOfMosquitoes - this.killed);
	}
	checkLevelUp(){
		if(this.level * this.level * 10 < this.exp ){
			this.levelUp();
		}
	}
	widenCursor(size){
		handSize += size;
		handSize_2 = handSize/2;
		$("#hand").css({"width": handSize +"px", "height": handSize+"px"});
	}
	buy(str){
		if(str == "weapon"){
			var price = parseInt($("#buy_weapon_price").text());
			console.log(price);
			if(this.money >= price){
				this.addStrength(3);
				this.reducMon(price);
				consoleWrite("Str: +2, Mon: - 100.");
				$("#buy_weapon_price").text(price*2);
				sfxBought();
			}
			else{
				this.broke();
			}
		}else if(str == "widen"){
			var price = parseInt($("#buy_weapon_price").text());
			if(this.money >= price){
				this.widenCursor(3);
				this.reducMon(price);
				consoleWrite("Size: +3, Mon: - 100.");
				$("#buy_weapon_price").text(price*2);
				sfxBought();
			}
			else{
				this.broke();
			}
		}
	}
	broke(){
		consoleWrite("You don't have enough money.");
		sfxBroke();
	}
}
