class GameManager{
	constructor(){
		console.log("GameManager");
		this.mosquitoes = [];
		this.numOfMosquitoes = this.createMosquitoes(3,0.5,1);
		this.clearTotalKill();//this.killed = 0;
		this.clearScore();//this.score = 0;
		//this.generateMosquitoes(3,1);
		this.refreshStatus();
		this.start();
		this.timeCountStart(5000);
		this.won = false;
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
		var mosquitoes = this.mosquitoes.length;
		var killed = this.killed;
		var me = this;
		this.setIntervalIdStatus=setInterval(statusChecker,100)
		function statusChecker(){
			if(parseInt($("#num_of_mosquitoes").text()) <= 0){
				if(me.won === false){
					me.won = true;
					me.win();
				}
			}
		}
	}
	win(){
		$("#message").text("Clear");
		this.stop_progressbar();
		this.getTimeRemain();
		if (this.setIntervalIdStatus){
			clearInterval(this.setIntervalIdStatus);
		}
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
		var count = 0;
		var offset = this.mosquitoes.length;
		var max = Math.min(maxMosquitoes, number + offset);
		for(var i = offset + 1; i <= max; i++){
			this.mosquitoes.push(new Mosquito($('#mos' + i), speed, power));
			count++;
		}
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
