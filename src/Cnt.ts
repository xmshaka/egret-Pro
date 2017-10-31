class Cnt extends egret.DisplayObjectContainer{
    public constructor(Width,Height,anWidth,anHeight){
        super();
        this.drawCnt(Width,Height,anWidth,anHeight);
    }
    // 缩放系数
    private scale:number = 0.85;
    private drawCnt(Width,Height,anWidth,anHeight){
        // 内容区
        let wrap:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        wrap.width = Width;
        wrap.height = Height; 
        wrap.x = 0;
        wrap.y = 0;
        this.addChild(wrap);

         // 背景 
        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes('bg_jpg'));
        bg.anchorOffsetX = anWidth;
        bg.x = anWidth;
        bg.y = 0;
        wrap.addChild(bg);
         // 背景 桌子区域，用来定位桌子计时器和里面的足球场等
        let bgCourtWrap:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        bgCourtWrap.width = Width;
        bgCourtWrap.height = 1035; //963+30+42  桌子的高度加上计时器突出高度+头像突出高度
        bgCourtWrap.anchorOffsetX = bgCourtWrap.width/2;
        bgCourtWrap.anchorOffsetY = bgCourtWrap.height/2;
        bgCourtWrap.x = anWidth;
        bgCourtWrap.y = anHeight;
        //问题，测试屏幕大小进行缩放
        bgCourtWrap.scaleX=this.scale;
        bgCourtWrap.scaleY=this.scale;
        wrap.addChild(bgCourtWrap);
        

        // 背景 桌子
        let bgCourt:egret.Bitmap = new egret.Bitmap(RES.getRes('bg-court_png'));
        bgCourt.anchorOffsetX = bgCourt.width/2;
        bgCourt.x = anWidth;
        bgCourt.y = 30;
        bgCourtWrap.addChild(bgCourt);

        //倒计时
        let timer:Timer = new Timer(Width,Height,anWidth,anHeight);
        timer.anchorOffsetX = timer.width/2;
        timer.x = anWidth;
        timer.y = 0;
        bgCourtWrap.addChild(timer);

        //生成四个足球场，1/4比赛  485为小球场宽度，应该可以在构造函数里设置，需要优化
        for(let i=0;i<4;i++){
            let _field4:Field4 = new Field4(485,anWidth,'team-01_jpg','克罗地亚',3.78,'team-02_jpg','德国',1.26);
            _field4.y = 120+202*i;
            bgCourtWrap.addChild(_field4);
        }
        // 左边其他用户 头像实例 ,（名字，头像，金币）,位置为数组中的随机一个{x=15,y=80+220*i} 
        for(let i=0;i<4;i++){
            let userImg:userImage = new userImage('飞翔小七','https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG','23万');
            userImg.x = 15;
            userImg.y = 80+220*i;
            bgCourtWrap.addChild(userImg);
        }
        // 右边其他用户 头像实例 ,（名字，头像，金币）,位置为数组中的随机一个{x=15,y=80+220*i} 
        for(let i=0;i<4;i++){
            let userImg:userImage = new userImage('飞翔小七','https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG','23万');
            userImg.x = Width-104;
            userImg.y = 80+220*i;
            bgCourtWrap.addChild(userImg);
        }
         // //自己的头像
        let myImg:userImage = new userImage('飞翔小七','https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG','23万');
        myImg.anchorOffsetX = 44;
        myImg.anchorOffsetY = 124;
        myImg.x = anWidth;
        myImg.y = bgCourtWrap.height;
        bgCourtWrap.addChild(myImg);

    }
}