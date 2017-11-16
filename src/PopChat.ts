// 聊天弹窗
class PopChat extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.drawChat();
    }
    private drawChat(){
       //弹窗蒙层
       let popLayer:egret.Shape = new egret.Shape();
       popLayer.graphics.beginFill(0x000000,0);
       popLayer.graphics.drawRect(0,0,window['store']['stage_Width'],window['store']['stage_Height'])
       popLayer.graphics.endFill();
       this.addChild(popLayer);

        //背景
        let popBgLayer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

        popBgLayer.width = window['store']['stage_Width'];
        popBgLayer.height = 534;
        popBgLayer.anchorOffsetY = popBgLayer.height;
        popBgLayer.y = window['store']['stage_Height'];
        this.addChild(popBgLayer);

        let popBg:egret.Bitmap = new egret.Bitmap(RES.getRes('bg-chat_png'));
        popBgLayer.addChild(popBg);

       //关闭按钮85*58
       let popClose:egret.Bitmap = new egret.Bitmap(RES.getRes('bgChatClose_png'));
       popClose.anchorOffsetX = 85;
       popClose.x = 750;
       popClose.y = 0;
       popBgLayer.addChild(popClose);
       popClose.touchEnabled = true;
       popClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //    this.removeChild(this);
        console.log('关闭弹窗')
       },this)


       //聊天内容大容器
        let popScroll:eui.Group = new eui.Group();

       // 聊天内容  ，这里有个bug，向下滚动有时无法复原，待修复
       for(let i=0;i<10;i++){
           let meg = this.message('保佑保佑,逢买必中');
           meg.y = i*80;
           popScroll.addChild(meg);
       }

        var group = new eui.Group();
        
        group.addChild(popScroll);
        //创建一个Scroller
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 750;
        myScroller.height = 482;
        myScroller.y = 52;
        //设置viewport
        myScroller.viewport = group;
        popBgLayer.addChild(myScroller);


    }
    private message(t){
        let wrap:eui.Group = new eui.Group();
        wrap.width = 750;
        wrap.height = 80;

        let text:egret.TextField = new egret.TextField();
        text.textColor = 0xffffff;
        text.size = 30;
        text.text = t;
        text.height = 78;
        text.x = 66;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.textAlign = egret.HorizontalAlign.CENTER;
        wrap.addChild(text);

        let line:egret.Shape = new egret.Shape();
        line.graphics.lineStyle(2,0x8070a5);
        line.graphics.moveTo(0,80);
        line.graphics.lineTo(750,80);
        wrap.addChild(line);

        return wrap;
    }
}