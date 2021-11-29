class Service {
    constructor(balance, symbols){
        this.balance = balance
        this.symbolsAllowed = symbols
        this.symbolArr = []
    }

    getBalance(){
        return this.balance;
    }

    setBalance(newBalance){
        this.balance = newBalance;
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
        });console.log(middleColumn)
;
        return Object.values(counts).find(count => count >= 3);
    }

    spin(){
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
            app.stage.addChild(symbol);
        };


        if(this.checkWin()){
            this.setBalance(this.balance + 1000);
        } else {
            this.setBalance(this.balance - 20);
        }
    } 
}

export default Service;