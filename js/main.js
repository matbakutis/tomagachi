// Pokemon JavaScript

let night = 1;
class Pokemon {
	constructor(name){
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.sleepiness = 0;
	}
	increaseAge(){
		$('#age').text(++this.age);
	}
	increaseHunger(){
		$('#hunger').text(++this.hunger);
	}
	increaseBoredom(){
		$('#boredom').text(++this.boredom);
	}
	increaseSleep(){
		$('#sleepiness').text(++this.sleepiness);
	}
	decreaseHunger(){
		if (this.hunger > 0){
			$('#hunger').text(--this.hunger);
		};
	}
	decreaseBoredom(){
		if (this.boredom > 0){
			$('#boredom').text(--this.boredom);
		};
	}
	decreaseSleep(){
		if (this.sleepiness > 0){
			$('#sleepiness').text(--this.sleepiness);
		};
	}
	checkDeath(interval){
		if (this.hunger === 10 || this.boredom === 10 || this.sleepiness === 10) {
			clearInterval(interval);
			$('#deathModal').modal('show');
		};
	}
	checkHappiness(){
		$('#happiness').text(10 - Math.floor(((this.hunger + this.boredom + this.sleepiness) / 3)));
	}
	checkEvolve(){
		if (this.age === 16){
			this.evolveCharmeleon();
		}else if (this.age === 36){
			this.evolveCharizard();
		};
	}
	evolveCharmeleon(){
		$('#charmander').attr('src', 'charmanderPictures/charmeleonGIF.gif');
	}
	evolveCharizard(){
		$('#charmander').attr('src', 'charmanderPictures/charizardGIF.gif');
	}
	hungerInterval(){
		let thisthis = this;
		const hungerInterval = setInterval( () =>{
			this.increaseHunger();
			this.checkHappiness();
			this.checkDeath(hungerInterval);
		}, 1000);	
		$('#feed').click(()=>{
			thisthis.decreaseHunger();
		});
	}
	boredomInterval(){
		let thisthis = this;
		const boredomInterval = setInterval( () =>{
			this.increaseBoredom();
			this.checkHappiness();
			this.checkDeath(boredomInterval);
		}, 1000);
		$('#play').click(()=>{
			thisthis.decreaseBoredom();
		});
	}
	sleepInterval(){
		let thisthis = this;
		const sleepInterval = setInterval( () =>{
			this.increaseSleep();
			this.checkHappiness();
			this.checkDeath(sleepInterval);
		}, 1000);
		$('#sleep').click(()=>{
			thisthis.decreaseSleep();
			$('#screen').toggle();
		});
	}
	ageInterval(){
		const ageInterval = setInterval( () =>{
			this.increaseAge();
			this.checkEvolve();
			this.checkHappiness();
			this.checkDeath(ageInterval);
		}, 1000);
	}
	createIntervals(){
		this.hungerInterval();
		this.boredomInterval();
		this.sleepInterval();
		this.ageInterval();
	}
};

$('#startModal').modal('show');
$('#closeButton').on('click', ()=>{
	let pokemonName = $('#pokemonName')[0].value;
	$('#startModal').modal('hide');
	$('#name').text(pokemonName);
	startGame(pokemonName);
});






const startGame = (name) => {
	const myPokemon = new Pokemon(name);
	console.log(myPokemon);
	myPokemon.createIntervals();
};












