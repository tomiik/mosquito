class GameManager{
	constructor(){
		//console.log("GameManager");
    this.numOfMosquitoes = 0;
		this.mosquitoes = [];
		this.clearData();
		this.start();
		this.won = true;
    this.creating = false;
    this.gameover = false;
		this.stageNum = 0;
	}
	start(){
    var me = this;
    this.setIntervalIdStatus=setInterval(statusChecker,50);
		function statusChecker(){
      if(me.won == true && me.creating == false && (me.numOfMosquitoes - me.killed) <= 0 ){
        me.creating = true;
        me.won = false;

				//Load stage data
        //var data = stages.shift();
				var data = generateStage(++me.stageNum)
				if(data){
          var mosquito = data[0];
          var time = data[1];
          var message = data[2];
          console.log("creating" + message)
          me.createStage(mosquito,time,message);
          this.redrawProgressBar(100);
        }
      }
			else if((me.numOfMosquitoes - me.killed) <= 0 && me.won == false && me.creating == false){
          me.numOfMosquitoes = -1;
          me.killed = 0;
					me.win();
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

			View.redrawProgressBar(progress)

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
	createMosquitoes(number, speed){
		//console.log("createMosquitoes()");
		var count = 0;
		var offset = 0;//this.mosquitoes.length;
		var max = number;//Math.min(maxMosquitoes, number + offset);
		this.clearMosquitoes();
		this.mosquitoes=[];
		var mosquito;
		var playArea = document.getElementById("playArea");
		for(var i = offset + 1; i <= max; i++){
			mosquito = document.createElement("div");
			mosquito.setAttribute("id", "mos" + i);
			mosquito.setAttribute("class", "mosquito");
			playArea.appendChild(mosquito);

			this.mosquitoes.push(new Mosquito(mosquito,i, speed));
			count++;
		}
		console.log("createMosquitoes()" + count);
		return count;
	}
	clearMosquitoes(){
		console.log("clearMosquitoes()");
		//console.log(this.mosquitoes.length)
		this.mosquitoes.forEach(function(mosquito, index){
			mosquito.remove();
		});
		this.mosquitoes = [];
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
      View.setMessage(message,1000);
    },0)
    setTimeout(function(){
      View.setMessage("Go",10);
      me.numOfMosquitoes = me.createMosquitoes(mosquitoes[0],mosquitoes[1]);
      me.refreshStatus();
			sfxStageStart();
      me.timeCountStart(time*1000);
      me.creating = false;
      console.log("me.creating = false")
    },2000)
  }

	win(){
    var me = this;

		this.stop_progressbar();
		var time = this.getTimeRemain();
		this.refreshStatus();
    this.clearMosquitoes();
    me.won = true;
	}

	tap(clickPos){
		this.click(clickPos)
	}

	click(clickPos){
		var me = this;
    if(this.gameover == false){
      var killed = 0;
      var score = 0;
			var offset = $("#playArea").position();
			var offsetX = offset["left"];
			var offsetY = offset["top"];
      this.mosquitoes.forEach(function(mosquito, index){

        if(me.hitJudge(clickPos, mosquito, offsetX, offsetY)){
          if(mosquito.crash()){
						SfxDie();
						killed++;
						score++;
					};
      	};
			});
      this.addTotalKill(killed);
      this.addScore(score);
      this.refreshStatus();
    }
	}

	hitJudge(clickPos, mosquito,offsetX, offsetY){
		var position = mosquito.getCenterPosition();
		console.log(clickPos)
		// var distance = Math.sqrt(Math.pow((clickPos.x - offsetX - position.x),2) + Math.pow((clickPos.y - offsetY - position.y),2));
		// console.log(distance)
		// var ret =  distance < handSize
		 var ret = (clickPos.x - offsetX - (handSize/2) < position.x &&
		 			position.x < clickPos.x - offsetX + (handSize/2)&&
		 			clickPos.y - offsetY-(handSize/2) < position.y &&
		 			position.y < clickPos.y - offsetY + (handSize/2));
		return ret
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

	clearData(){
		this.clearTotalKill();//this.killed = 0;
		this.clearScore();//this.score = 0;
	}
  clearTotalKill(){
    this.killed = 0;
  }
	refreshStatus(){
		View.refreshScore(this.score);
		View.refreshNumOfMosquitoes(this.numOfMosquitoes - this.killed);
	}


}
