var LaunchDungeons=function()
{
	Game.GetWord=function(type)
	{
		if (type=='secret') return choose(['hidden','secret','mysterious','forgotten','forbidden','lost','sunk','buried','concealed','shrouded','invisible','elder']);
		if (type=='ruined') return choose(['ancient','old','ruined','ravaged','destroyed','collapsed','demolished','burnt','torn-down','shattered','dilapidated','abandoned','crumbling','derelict','decaying']);
		if (type=='magical') return choose(['arcane','magical','mystical','sacred','honed','banished','unholy','holy','demonic','enchanted','necromantic','bewitched','haunted','occult','astral']);
		return '';
	}
	
	/*=====================================================================================
	DUNGEONS
	=======================================================================================*/
	Game.DungeonTypes=[];
	Game.DungeonType=function(name)
	{
		this.name=name;
		this.nameGenerator=function(){return 'Mysterious dungeon';};
		this.roomTypes=[];
		Game.DungeonTypes[this.name]=this;
		return this;
	};
	
	/*=====================================================================================
	CREATE DUNGEON TYPES
	=======================================================================================*/
	new Game.DungeonType('Factory').
	nameGenerator=function(){
		var str='';
		str+=Game.GetWord(choose(['secret','ruined','magical']))+' '+choose(['factory','factories','bakery','bakeries','confectionery','laboratory','research center','chocolate forge','chocolate foundry','manufactory','warehouse','machinery','works','bakeworks','workshop','assembly line']);
		return str;
	};
	
	new Game.DungeonType('Mine').
	nameGenerator=function(){
		var str='';
		str+=Game.GetWord(choose(['secret','ruined','magical']))+' '+choose(['chocolate','chocolate','chocolate','white chocolate','sugar','cacao'])+' '+choose(['mine','mines','pit','pits','quarry','excavation','tunnel','shaft','lode','trench','mountain','vein','cliff','peak','dome','crater','abyss','chasm','hole','burrow']);
		return str;
	};
	
	new Game.DungeonType('Portal').
	nameGenerator=function(){
		var str='';
		str+=Game.GetWord(choose(['secret','ruined','magical']))+' '+choose(['portal','gate','dimension','warpgate','door']);
		return str;
	};
	
	new Game.DungeonType('Secret zebra level').
	nameGenerator=function(){
		var str='';
		str+=Game.GetWord(choose(['secret']))+' '+choose(['zebra level']);
		return str;
	};
	
	
	/*=====================================================================================
	DUNGEON MECHANICS
	=======================================================================================*/
	Game.DungeonTiles=[];
	Game.DungeonTile=function(name,pic,obstacle)
	{
		this.name=name;
		this.pic=pic;
		this.obstacle=obstacle;
		this.id=Game.DungeonTiles.length;
		Game.DungeonTiles[this.id]=this;
	}
	
	new Game.DungeonTile('void',[0,0],1);
	new Game.DungeonTile('path',[1,0],0);
	new Game.DungeonTile('path2',[2,0],0);
	new Game.DungeonTile('land',[1,1],0);
	new Game.DungeonTile('land2',[2,1],0);
	new Game.DungeonTile('wall1',[0,1],1);
	new Game.DungeonTile('wall2',[0,2],1);
	new Game.DungeonTile('water',[2,2],1);
	new Game.DungeonTile('bridge',[1,2],0);
	
	Game.Item=function(type,x,y)//not loot, just objects you could find on the map : mobs, interactables, player, exits...
	{
		this.type=type;
		this.x=x;
		this.y=y;
		this.dungeon=-1;
		this.targets=[];
		this.stuck=0;
		
		this.Draw=function()
		{
			var pic=[0,0];
			if (this.type=='monster') pic=[4,0];
			return '<div class="thing" style="left:'+(this.x*16)+'px;top:'+(this.y*16)+'px;background-position:'+(-pic[0]*16)+'px '+(-pic[1]*16)+'px;"></div>';
		}
		this.Wander=function()
		{
			this.targets=[];
			if (this.dungeon.CheckObstacle(this.x-1,this.y)==0) this.targets.push([-1,0]);
			if (this.dungeon.CheckObstacle(this.x+1,this.y)==0) this.targets.push([1,0]);
			if (this.dungeon.CheckObstacle(this.x,this.y-1)==0) this.targets.push([0,-1]);
			if (this.dungeon.CheckObstacle(this.x,this.y+1)==0) this.targets.push([0,1]);
			this.Move();
		}
		this.GoTo=function(x,y)
		{
			this.targets=[];
			if (this.x<x) this.targets.push([1,0]);
			if (this.x>x) this.targets.push([-1,0]);
			if (this.y<y) this.targets.push([0,1]);
			if (this.y>y) this.targets.push([0,-1]);
			this.Move();
		}
		this.Move=function()
		{
			if (this.targets.length>0)
			{
				var target=choose(this.targets);
				if (this.dungeon.CheckObstacle(this.x+target[0],this.y+target[1])==0)
				{
					this.x+=target[0];
					this.y+=target[1];
				}
				else this.stuck++;
			}
		}
		this.Turn=function()
		{
			if (this.type=='monster')
			{
				this.GoTo(this.dungeon.heroItem.x,this.dungeon.heroItem.y);//track the player
				if (this.stuck || this.targets.length==[]) this.Wander();//can't reach the player? walk around randomly
			}
			this.stuck=0;
		}
	}
	
	Game.Dungeons=[];
	Game.Dungeon=function(type,id)
	{
		this.type=type;
		this.id=id;
		Game.Dungeons[this.id]=this;
		this.log=[];
		this.name=Game.DungeonTypes[this.type].nameGenerator();
		this.hero=null;
		
		this.Log=function(what)
		{
		}
		
		this.items=[];
		this.GetItem=function(x,y)
		{
			for (var i in this.items) {if (this.items[i].x==x && this.items[i].y==y) return i;}
			return -1;
		}
		this.AddItem=function(what,x,y)
		{
			this.RemoveItem(x,y);
			var item=new Game.Item(what,x,y);
			this.items.push(item);
			item.dungeon=this;
			return item;
		}
		this.RemoveItem=function(x,y)
		{
			var item=this.GetItem(x,y);
			if (item!=-1) this.items.splice(this.items.indexOf(item),1);
		}
		this.DrawItems=function()
		{
			var str='';
			for (var i in this.items) {str+=this.items[i].Draw();}
			return str;
		}
		
		this.CheckObstacle=function(x,y)
		{
			if (x<0 || x>=this.map.w || y<0 || y>=this.map.h) return 1;
			if (this.GetItem(x,y)!=-1) return 1;
			return this.map.data[x][y].obstacle;
		}
		
		this.map={};
		this.Generate=function()
		{
			this.map={data:[],w:50,h:50,str:'',things:[],entrance:[0,0]};
			this.map.entrance=[Math.floor(Math.random()*this.map.w),Math.floor(Math.random()*this.map.h)];
			this.map.str='';
			for (var x=0;x<this.map.w;x++)
			{
				this.map.data[x]=[];
				for (var y=0;y<this.map.h;y++)
				{
					this.map.data[x][y]=Game.DungeonTiles[5];
					if ((x%5>0 && y%5>0) || (x%5==2 || y%5==2)) this.map.data[x][y]=Game.DungeonTiles[choose([1,2,3,4])];
					this.map.str+='<div class="tile" id="tile-'+this.id+'-'+x+'-'+y+'" style="left:'+(x*16)+'px;top:'+(y*16)+'px;background-position:'+(-this.map.data[x][y].pic[0]*16)+'px '+(-this.map.data[x][y].pic[1]*16)+'px;"></div>';
				}
			}
			
			for (var i=0;i<50;i++) {this.AddItem('monster',Math.floor(Math.random()*this.map.w),Math.floor(Math.random()*this.map.h));}
		}
		
		this.onTile=-1;
		
		this.Draw=function()
		{
			var str='';
			var x=-this.hero.x;
			var y=-this.hero.y;
			str+='<div id="map'+this.id+'" class="map" style="width:'+(9*16)+'px;height:'+(9*16)+'px;"><div id="mapcontainer'+this.id+'" style="position:absolute;left:'+(x*16)+'px;top:'+(y*16)+'px;"><div id="mapitems'+this.id+'"></div>'+this.map.str+'</div></div>';
			str+='<div style="position:absolute;left:'+(9*16+16)+'px;">'+
			'<a onclick="Game.ObjectsById['+this.id+'].setSpecial(0);">Exit</a><br>'+
			'<a class="control west" onclick="Game.HeroesById['+this.hero.id+'].Move(-1,0);"></a><br>'+
			'<a class="control east" onclick="Game.HeroesById['+this.hero.id+'].Move(1,0);"></a><br>'+
			'<a class="control north" onclick="Game.HeroesById['+this.hero.id+'].Move(0,-1);"></a><br>'+
			'<a class="control south" onclick="Game.HeroesById['+this.hero.id+'].Move(0,1);"></a><br>'+
			'<a class="control middle" onclick="Game.HeroesById['+this.hero.id+'].Move(0,0);"></a><br>'+
			'</div>';
			l('rowSpecial'+this.id).innerHTML='<div style="width:100%;height:100%;z-index:10000;position:absolute;left:0px;top:0px;">'+str+'</div>';
		}
		this.Refresh=function()
		{
			if (!l('mapcontainer'+this.id)) this.Draw();
			var x=4-this.hero.x;
			var y=4-this.hero.y;
			l('mapcontainer'+this.id).style.left=(x*16)+'px';
			l('mapcontainer'+this.id).style.top=(y*16)+'px';
			l('mapitems'+this.id).innerHTML=this.DrawItems();
		}
		this.Turn=function()
		{
			for (var i in this.items)
			{
				this.items[i].Turn();
			}
			this.Refresh();
		}
		
		this.DrawButton=function()
		{
			var str='';
			str+='<div style="text-align:center;margin:48px auto;color:#999;"><a onclick="Game.ObjectsById['+this.id+'].setSpecial(1);">Enter</a></div>';
			return str;
		}
	}
	
	
	
	/*=====================================================================================
	CREATE DUNGEONS
	=======================================================================================*/
	Game.Objects['Factory'].special=function()
	{
		this.dungeon=new Game.Dungeon('Factory',this.id);
		this.dungeon.Generate();
		this.specialDrawFunction=function(){this.dungeon.Refresh();};
		this.drawSpecialButton=function(){return this.dungeon.DrawButton();};
		
		Game.HeroesById[0].EnterDungeon(this.dungeon,this.dungeon.map.entrance[0],this.dungeon.map.entrance[1]);
	}
	
	/*=====================================================================================
	HEROES
	=======================================================================================*/
	Game.Heroes=[];
	Game.HeroesById=[];
	Game.Hero=function(name,pic)
	{
		this.name=name;
		this.pic=pic;
		this.stats={
			hp:20,
			hpm:20,
			might:5,
			guard:5,
			speed:5,
			dodge:5,
			luck:5
		};
		this.dialogue={
			'greeting':'Oh hey.|Sup.',
			'entrance':'Here we go.|So exciting.',
			'completion':'That was easy.|All done here.',
			'defeat':'Welp.|Better luck next time.'
		};
		this.gear={
			'armor':-1,
			'weapon':-1
		};
		this.inDungeon=-1;
		this.completedDungeons=0;
		
		this.x=0;
		this.y=0;
		
		this.EnterDungeon=function(dungeon,x,y)
		{
			this.inDungeon=dungeon.id;
			dungeon.hero=this;
			this.x=x;
			this.y=y;
			dungeon.heroItem=dungeon.AddItem('hero',x,y);
			Game.Dungeons[this.inDungeon].Refresh();
		}
		this.Move=function(x,y)
		{
			var dungeon=Game.Dungeons[this.inDungeon];
			if (1 || dungeon.CheckObstacle(this.x+x,this.y+y)==0 || (x==0 && y==0))
			{
				this.x=this.x+x;
				this.y=this.y+y;
				dungeon.heroItem.x=this.x;
				dungeon.heroItem.y=this.y;
				dungeon.Turn();
			}
		}
		
		this.save=function()
		{
			var str='';
			str+=
			this.inDungeon+','+
			this.completedDungeons+','+
			this.gear.armor+','+
			this.gear.weapon
			;
			return str;
		}
		this.load=function(data)
		{
			var str=data.split(',');
			this.inDungeon=parseInt(str[0]);
			this.completedDungeons=parseInt(str[1]);
			this.gear.armor=parseInt(str[2]);
			this.gear.weapon=parseInt(str[3]);
		}
		this.id=Game.Heroes.length;
		Game.Heroes[this.name]=this;
		Game.HeroesById[this.id]=this;
	}
	
	/*=====================================================================================
	CREATE HEROES
	=======================================================================================*/
	new Game.Hero('Mysterious hero','nopic.png');
};