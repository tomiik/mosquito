class GameManager{
	constructor(){
		//console.log("GameManager");
    this.numOfMosquitoes = 0;
		this.mosquitoes = [];
		this.clearTotalKill();//this.killed = 0;
		this.clearScore();//this.score = 0;
		this.start();
		this.won = true;
    this.creating = false;
    this.gameover = false;
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

		this.stop_progressbar();
		var time = this.getTimeRemain();
		this.refreshStatus();
    this.clearMosquitoes();
    me.won = true;
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
          }
        }else{
					//SfxMiss();
				}
      });
      this.addTotalKill(killed);
      this.addScore(score);
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
  clearScore(){
    this.score = 0;
  }
  addTotalKill(n){
    this.killed += n;
  }
  clearTotalKill(){
    this.killed = 0;
  }
	createMosquitoes(number, speed, power){
    //console.log("createMosquitoes()");
		var count = 0;
		var offset = 0;//this.mosquitoes.length;
    var max = number;//Math.min(maxMosquitoes, number + offset);
		power = 1;
		this.clearMosquitoes();
		this.mosquitoes=[];
		for(var i = offset + 1; i <= max; i++){
			this.mosquitoes.push(new Mosquito($('#mos' + i),i, speed, power));
			count++;
		}
    console.log("createMosquitoes()" + count);
		return count;
	}
	clearMosquitoes(){
    console.log("clearMosquitoes()");
    //console.log(this.mosquitoes.length)
    this.mosquitoes.forEach(function(mosquito, index){
      mosquito.reset();
    });
    this.mosquitoes = [];
  }
	refreshStatus(){
		this.refreshScore();
		this.refreshNumOfMosquitoes();
	}
	refreshScore(){
		$("#score").text(this.score);
	}
	refreshNumOfMosquitoes(){
		$("#num_of_mosquitoes").text(this.numOfMosquitoes - this.killed);
	}
}
