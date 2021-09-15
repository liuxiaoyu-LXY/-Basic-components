import SliderBase from "./SliderClass.js";
class slider extends SliderBase {
    constructor(el,options){
        super(el,options);

    }
}
class slider_Banner extends SliderBase {
    constructor(el,options){
        super(el,options);
        this.bind_event();

        

    }
    bind_event(){
        let that = this;
        this.control.addEventListener('click',function(e){
            // console.log(that)
            if (e.target.tagName == 'SPAN'){
        
                for (let i=0;i<that.control_item.length;i++){
                    if (that.control_item[i]==e.target){

                        that.curIndex = i;
                        that.directgo(that.curIndex)
                    }
                }
            }


        },false)
    }
}
class slider_combined extends slider_Banner{
    constructor(el,options){
        super(el,options);
        
        const rbtns = el.querySelector('.btn.leftbtn');
        const lbtns = el.querySelector('.btn.rightbtn');
        const ele = el;
        this.rbtns = rbtns;
        this.lbtns = lbtns;

        this.arrow_display(rbtns,lbtns,ele);
        this.bind_arrow(rbtns,lbtns);
    }
    arrow_display(rbtns,lbtns,ele){
        ele.addEventListener('mouseover',function(){
            // const rbtns = document.querySelector('.pagination-arrow .arrow .next');
           // const lbtns = document.querySelector('.pagination-arrow .arrow .prev');
            rbtns.style.opacity = 1;
            lbtns.style.opacity = 1;
            this.pause();

        },false)
        ele.addEventListener('mouseout',function(){
            // const rbtns = document.querySelector('.pagination-arrow .arrow .next');
           // const lbtns = document.querySelector('.pagination-arrow .arrow .prev');
            rbtns.style.opacity = 0;
            lbtns.style.opacity = 0;
            this.autoplay()

        },false)
    }

    bind_arrow(rbtn,lbtn){
        let that = this;
        rbtn.addEventListener('click',function(){
            that.SlideNext()


        },false)
        lbtn.addEventListener('click',function(){
            that.SlidePrev()


        },false)

    }

}

export {slider_Banner}
export{slider_combined}