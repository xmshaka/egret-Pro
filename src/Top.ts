class Top extends egret.DisplayObjectContainer{
    // 头部
    public constructor(Width){
        super();
        this.drawTop(Width);
    }
    //冠军记录弹窗
    private pop02Cham;
    private textTitle:egret.TextField;
    private textDate:egret.TextField;

    private drawTop(Width){

        window['store'].$Top = this ;
        //    左上角标题
        this.textTitle = new egret.TextField();
        this.textTitle.text = '欧洲杯1/4决赛';
        this.textTitle.textColor = 0xffffff;
        this.textTitle.size = 30;
        this.textTitle.x = 20;
        this.textTitle.y = 14;
        this.addChild(this.textTitle);

        this.textDate= new egret.TextField();
        this.textDate.text = '当日第55期';
        this.textDate.textColor = 0xffffff;
        this.textDate.size = 18;
        this.textDate.x = 20;
        this.textDate.y = 54;
        this.addChild(this.textDate);
        
        this.pop02Cham = new Pop02Cham();
        this.pop02Cham.scaleX= window['store'].scale;
        this.pop02Cham.scaleY= window['store'].scale;
        // 右上角充值与往期
        let btnPast:egret.Bitmap = new egret.Bitmap(RES.getRes('btn-past_png'));
        btnPast.x = Width - 163;
        btnPast.y = 21;
        this.addChild(btnPast);
        this.pop02Cham = new Pop02Cham();
        
        window['store'].$pop02Cham = this.pop02Cham ;

        btnPast.touchEnabled = true;
        btnPast.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            this.getFootballMsg();
            this.addChild(this.pop02Cham);
            // 更新 数据
            this.pop02Cham.popChamC.upPopWrapMsg();
            // this.pop02Cham.removeChild(this.pop02Cham.load)

        },this)
        let btnRecharge:egret.Bitmap = new egret.Bitmap(RES.getRes('btn-recharge_png'));
        btnRecharge.x = Width - 76;
        btnRecharge.y = 23;
        this.addChild(btnRecharge);
        btnRecharge.touchEnabled = true;
        btnRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            console.log('充值弹窗')
        },this)
    }
    /* 更新头部杯赛 */
    public setTextTitle( title:string ){
        this.textTitle.text = title;
    }
    /* 更新头部期数 */
    public setTextDate( title:string ){
        this.textDate.text = title;
    }
    
    /**
     *  取数据
     */
    async getFootballMsg(){
        let $store = window['store'] ;
        //  请求 更新数据
        await window['getJson']( { type:'get' ,url : $store['orderDomain']+'/vguess/matches/result/list' ,dataType:'json'} ).then(( res )=>{
            if( res && res.status === '100' ){
                window['upFootballList']( res.data ) ;
                console.log(res.data)
            }
        })
    }

}