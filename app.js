'use strict'
// Application build
import Service from './Service.js';
const app = new PIXI.Application({resizeTo:window});
app.renderer.backgroundColor = 0x000000;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);
const BET_STEP = 20;

Object.assign(window, { app })

//Loading Assets

app.loader
   .add('SpriteSheet', 'assets/SpriteSheet.json')

function onAssetsLoaded() {
   // TODO: Number Validation , chereshkata na tortatata , che bugva :D

   var balance = Number(prompt('Enter balance'));
   //Slot Frame
   const slotFrame = new PIXI.Sprite(PIXI.Texture.from('SlotFrame.png'));
   app.stage.addChild(slotFrame);
   var service = new Service(balance, 8);
   
   //TODO: Switch funtion button while spinning the reels after you do the animation
   // https://codepen.io/ulx/pen/NpqmWq?editors=0010 izplqskai go onCLick po dolu v toq file 
   //Spin button
   const spinButtonNormal = new PIXI.Sprite(PIXI.Texture.from(`SpinButton_Normal.png`));
   const spinButtonActive = new PIXI.Sprite(PIXI.Texture.from(`SpinButton_Active.png`));

   spinButtonNormal.interactive= true;
   spinButtonNormal.buttonMode = true;
   spinButtonNormal.x =  app.screen.width/1.53;
   spinButtonNormal.y =  app.screen.height/1.16;
   spinButtonNormal.addListener("pointerdown", onClick);
   app.stage.addChild(spinButtonNormal);   

   //Increase credit
   const addCreditBtn = new PIXI.Graphics();
   addCreditBtn.beginFill(0x687623);
   addCreditBtn.drawCircle(20,20,20);
   addCreditBtn.endFill();
   addCreditBtn.x = 1540;
   addCreditBtn.y = 200;
   addCreditBtn.interactive= true;
   addCreditBtn.buttonMode = true;
   addCreditBtn.addListener("pointerdown", onAddCreditClick);
   app.stage.addChild(addCreditBtn);
   console.log("hi");

   //Decrease credit
   const decreaseCreditBtn = new PIXI.Graphics();
   decreaseCreditBtn.beginFill(0x123456);
   decreaseCreditBtn.drawCircle(20,20,20);
   decreaseCreditBtn.endFill();
   decreaseCreditBtn.x = 1440;
   decreaseCreditBtn.y = 200;
   decreaseCreditBtn.interactive= true;
   decreaseCreditBtn.buttonMode = true;
   decreaseCreditBtn.addListener("pointerdown", onDecreaseCreditClick);
   app.stage.addChild(decreaseCreditBtn);

   //winner
   const winText = new PIXI.Text('YOU WIN !!!!');
   winText.style.fill = "green";
   winText.visible = false;
   winText.x = 1400;
   winText.y = 20;
   app.stage.addChild(winText);

   //loser
   const loseText = new PIXI.Text('YOU LOSE !!!!');
   loseText.style.fill = "red";
   loseText.visible = false;
   loseText.x = 1400;
   loseText.y = 20;
   app.stage.addChild(loseText);

   //balance
   const balanceText = new PIXI.Text(`Balance: ${service.getBalance()}`)
   balanceText.style.fill = "red";
   balanceText.x = 1400;
   balanceText.y = 60;
   app.stage.addChild(balanceText);

   //bet
   const betText = new PIXI.Text(`Current bet: ${service.getBet()}`)
   betText.style.fill = "red";
   betText.x = 1400;
   betText.y = 120;
   app.stage.addChild(betText);
   
   function onAddCreditClick(){
      if (service.getBet() + BET_STEP <= service.getBalance()){
         service.setBet(service.getBet() + 20);
         betText.text = `Current bet: ${service.getBet()}`;
      }
   }

   function onDecreaseCreditClick(){
      if (service.getBet() - BET_STEP >= BET_STEP){
         service.setBet(service.getBet() - BET_STEP);
         betText.text = `Current bet: ${service.getBet()}`;
      }
   }

   function onClick(){
      if(service.hasBalance()){
         service.spin();
      } else {
         loseText.visible = true;
      }

      if(service.checkWin()){
         winText.visible = true;
      } else {
         winText.visible = false;
      }
      balanceText.text = `Balance: ${service.getBalance()}`
   };

   //More magic
   const service=new Service(8000);
   Object.assign(windows,{service})
   //Magic
   // app.ticker.add((delta)=> {
   //    for(let i=0; i<service.symbolArr.length; i++){
   //       const r = service.symbolArr[i];
   //       for (let j=0; j<r.service.symbolsAllowed; j++){
   //          const s = r.symbols[j];
   //          const prevy = s.y;
   //          s.y = (i%3)*270;
   //          if(s.y<0 %% prevy > symbolArr.length) * 
   //       }
   //    }
   // })

};
app.loader.load(onAssetsLoaded);


/*
// ReelSpinning (Virtual Scrolling Dom)
// 1.Infrastructure

const SETTINGS = {
   minIndex: 1,
   maxIndex: 8,
   startIndex: 3,
   itemHeight: 20, // Need to check container(flexability)
   amount: 3,
   tolerance: 1
};

const getData = (offset, limit) => {
   const data = [];
   const start = Math.max(SETTINGS.minIndex, offset);
   const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
   if (start <= end) {
      for (let i = start; i <= end; i++) {
         data.push({ index: i, text: 'item${i}' })
      };
   };
};

const rowTemplate = item =>
   <div className="item" key={item.index}>
      {item.text}
   </div>
*/

// // 2. ????????????
// render() {
//    const { viewportHeight, topPaddingHeight, bottomPaddingHeight, data } = this.state;
//    return (
//       <div className='viewport' style={{ height: viewportHeight }}>
//          <div style={{ height: topPaddingHeight }}></div>
//          {data.map(this.props.row)}
//          <div style={{ height: bottomPaddingHeight }}></div>
//       </div>
//    )
// }

