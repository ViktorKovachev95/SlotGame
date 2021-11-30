const symbolContainer = new PIXI.Container();

class Service {
    constructor(balance, symbols){
        this.balance = balance
        this.symbolsAllowed = symbols
        this.symbolArr = []
        this.bet = 20;
    }

    getBalance(){
        return this.balance;
    }

    setBalance(newBalance){
        this.balance = newBalance;
    }

    getBet(){
        return this.bet;
    }

    setBet(bet){
        this.bet = bet
    }

    getSymbols(){
        return this.symbolArr
    }

    

    checkWin(){        
        var counts = {};
        if(this.symbolArr.length){
               var middleColumn = this.symbolArr.map(column => {
                   return column.find((symbol, index) => index === 0)
               }).sort((a, b) => a - b)
        }

        middleColumn.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
        });

        console.log(middleColumn);
        return Object.values(counts).find(count => count >= 3);
    }

    hasBalance(){
        return this.balance > 0 && this.bet <= this.balance
    }

    clearSymbols(){
        for (var i = symbolContainer.children.length - 1; i >= 0; i--) {	
            symbolContainer.removeChild(symbolContainer.children[i]);
        };
    }

    spin(){
        this.clearSymbols();
        this.symbolArr = [];
        let tempArr = [];
        
        for(let i=1; i<=15 ; i++){
            const symbolNum = Math.trunc(Math.random() * this.symbolsAllowed) + 1;
            const symbol = new PIXI.Sprite(PIXI.Texture.from(`Symbol_${symbolNum}.png`));
            symbol.x = (i%5)*270;
            symbol.y = (i%3)*270;
            if (i % 3 === 0){
                tempArr.push(symbolNum);
                this.symbolArr.push(tempArr);
                tempArr = [];
            } else {
                tempArr.push(symbolNum);
            }
            symbolContainer.addChild(symbol);
        };

        app.stage.addChild(symbolContainer);

        if(this.checkWin()){
            this.setBalance(this.balance + this.bet*2);
        } else {
            this.setBalance(this.balance - this.bet);
        }
    }

    
}

export default Service;