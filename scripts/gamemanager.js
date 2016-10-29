class GameManager{
	constructor(){
		console.log("GameManager");
    this.numOfMosquitoes = 0;
		this.mosquitoes = [];
		this.clearTotalKill();//this.killed = 0;
		this.clearScore();//this.score = 0;
		//this.generateMosquitoes(3,1);
		this.start();
		this.won = true;
	}
	timeCountStart(initTime){
		this.setIntervalIdTimer=setInterval(timeCount,progressbarRefresh);
		var time = initTime;
		var me=this;
		function timeCount(){
			var progress = (time / initTime) * 100;
			progress = Math.floor(progress);

      redrawProgressBar(progress)

			if(progress <= 0){
				me.gameover();
			}

			time -= progressbarRefresh;
		}
	}
	gameover(){
		this.stop_progressbar();
	}
	stop_progressbar(){
		if (this.setIntervalIdTimer){
			clearInterval(this.setIntervalIdTimer);
			console.log("stop progressbar");
		}
	}
	getTimeRemain(){
		var time = $("#timebar").attr("aria-valuenow");
		return time;
	}
	start(){
    var me = this;
    this.setIntervalIdStatus=setInterval(statusChecker,100);
		function statusChecker(){
      if(me.won == true){
        me.won = false;
        var data = stages.shift();
        if(data){
          var mosquito = data[0];
          var speed = data[1];
          var message = data[2];
          me.createStage(mosquito,speed,message);          
        }
        me.timeCountStart(5000);
      }
			else if(parseInt($("#num_of_mosquitoes").text()) <= 0){
				if(me.won === false){
          me.numOfMosquitoes = 0;
          me.killed = 0;
					me.win();
          me.won = true;
				}
			}
    }
	}
  createStage(mosquitoes, time, message){
    this.numOfMosquitoes = this.createMosquitoes(mosquitoes[0],mosquitoes[1],mosquitoes[2]);
    this.setMessage(message);
    this.refreshStatus();
    console.log(this.numOfMosquitoes + "/"  + this.killed);
  }
  setMessage(str){
    $("#message").text(str);
  }
	win(){
    this.setMessage("Clear");
		this.stop_progressbar();
		this.getTimeRemain();
    this.clearMosquitoes();
		//if (this.setIntervalIdStatus){
		//	clearInterval(this.setIntervalIdStatus);
		//}
	}
  clearMosquitoes(){
    console.log("clearMosquitoes");
    //console.log(this.mosquitoes.length)
    this.mosquitoes.forEach(function(mosquito, index){
      mosquito.reset();
    });
    this.mosquitoes = [];
  }
	click(e){
		var killed = 0;
		var score = 0;
		this.mosquitoes.forEach(function(mosquito, index){
			var position = mosquito.getPosition();
			if(e.clientX-handSize < position.x && position.x < e.clientX && e.clientY-handSize < position.y && position.y < e.clientY){
				if(!mosquito.dead)
				{
					score += mosquito.crash();
					killed++;
				}
			}
		});
		this.addTotalKill(killed);
		this.addScore(score);
		this.refreshStatus();
	}

  addScore(score){
    this.score += score;
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
    console.log("createMosquitoes()");
		var count = 0;
		var offset = this.mosquitoes.length;
    console.log(offset)
		var max = Math.min(maxMosquitoes, number + offset);
		for(var i = offset + 1; i <= max; i++){
			this.mosquitoes.push(new Mosquito($('#mos' + i), speed, power));
			count++;
		}
    console.log("createMosquitoes()" + count);
		return count;
	}

	refreshStatus(){
		//var str_mos = "mosquitoes:" + (this.numOfMosquitoes - this.killed);
		//var str_score = ",score:" + this.score;
		//$("#info").text(str_mos + str_score);
		$("#num_of_mosquitoes").text(this.numOfMosquitoes - this.killed);
		$("#score").text(this.score);
	}
}
