'use strict'
// Application build
import Service from './Service.js';
const app = new PIXI.Application({});
app.renderer.backgroundColor = 0x000000;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);

Object.assign(window, { app })

//Loading Assets

app.loader
   .add('SpriteSheet', 'assets/SpriteSheet.json')

function onAssetsLoaded() {
   //Slot Frame
   const slotFrame = new PIXI.Sprite(PIXI.Texture.from('SlotFrame.png'));
   app.stage.addChild(slotFrame);
   var service = new Service(1000, 3);
   
   //Symbols    
   const symbolArrContainer = new PIXI.Container();
   const symbolContainer = new PIXI.Container();
   
   //Button
   const button = new PIXI.Sprite(PIXI.Texture.from(`SpinButton_Normal.png`));
   button.interactive= true;
   button.buttonMode = true;
   button.x =  app.screen.width/1.53;
   button.y =  app.screen.height/1.16;

   button.addListener("pointerdown", onClick);
   app.stage.addChild(button);

   //winner
   const winText = new PIXI.Text('YOU WIN !!!!');
   winText.style.fill = "green";
   winText.visible = false;
   winText.x = 1400;
   winText.y = 20;
   app.stage.addChild(winText);

   //balance
   const balanceText = new PIXI.Text(`Balance: ${service.getBalance()}`)
   balanceText.style.fill = "red";
   balanceText.x = 1400;
   balanceText.y = 60;
   app.stage.addChild(balanceText);   

   function onClick(){
      service.spin();
      if(service.checkWin()){
         winText.visible = true;
      } else {
         winText.visible = false;
      }
      balanceText.text = `Balance: ${service.getBalance()}`
   };
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

