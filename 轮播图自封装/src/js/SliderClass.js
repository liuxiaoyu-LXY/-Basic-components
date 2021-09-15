import DEFAULTS from "./default.js";

class SliderBase {
    constructor(el,options){
        this.options = {
            ...options,
            ...DEFAULTS
        }
        const slider = el;
        const sliderBound = slider.querySelector('.slider-content');
        const sliderItems = slider.querySelectorAll('.slider-item');
        const controler = slider.querySelector('.pagination');
        

        this.control = controler;
        this.control_item = controler.querySelectorAll('span');

        this.slider = slider;
        this.sliderBound = sliderBound;
        this.sliderItems = sliderItems;
        this.firstItem = 0;
        this.lastItem = this.sliderItems.length;
        

        this.itemWidth = sliderItems[0].offsetWidth;
        // this.itemWidth = 300;
        // 因为CSS用的是百分比定位，这里必须获取实际的宽度
        this.curIndex = this.getCorrectIndex(this.options.startIndex);
        



        this.slider = el;
        this.lock = true;
        this.init()


    }
    getCorrectIndex(ind){
        if (ind > this.lastItem){
            ind = this.firstItem;
        }
        else if (ind < this.firstItem){
            ind = this.lastItem;
        }
        else{
            ind = ind
        }
        return ind

    }
    init(){
        // console.log(slider,sliderBound,sliderItems)
        this.setBoundWidth();
        this.setItemWidth();
        
        
        this.addLastChild();
        this.setPosition();
    }
    setBoundWidth(){
        this.sliderBound.style.width = `${this.itemWidth * (this.lastItem+1)}px`;
        // this.exactLast = this.lastItem+1;
    }
    setItemWidth(){
        for (let item of this.sliderItems){
           
            item.style.width = `${this.itemWidth}px`;
            // item.style.float = 'left';

        }
    }
    setPosition(){
        // this.sliderItems.style.float = 'left';
        this.sliderBound.style.overflow = 'hidden';
        for (let item of this.sliderItems){
            
            // item.style.width = `${this.itemWidth}px`;
            item.style.float = 'left';

        }
    }
    addLastChild(){
        let newDiv = this.sliderItems[0].cloneNode(true);
        newDiv.className = this.options.default_className;
        this.sliderBound.appendChild(newDiv);
        this.sliderItems = this.slider.querySelectorAll('.slider-item');
        
    }
    Move(distance){
        this.sliderBound.style.transform = `translate(${distance}px,0px)`;
    }
    Animation(distance){
        this.sliderBound.style.transition = `all ${this.options.LASTTIME}s linear 0s `;
        this.Move(distance)
    }
    MoveNoAnimation(distance){
        this.sliderBound.style.transition = 'None';
        this.Move(distance)

    }

    setTimer(obj,distance,func){
        // return setTimeout(()=>{
            
        //     obj.MoveNoAnimation(distance);


        // },this.options.LASTTIME*1000)
        return setTimeout(func,this.options.LASTTIME*1000)
    }
    goNext(index){
        index +=1;
        if (index<this.lastItem){
            this.Animation(-index*this.itemWidth)
        }
        else {
            this.Animation(-index*this.itemWidth);
            let func = this.change_obj(function(){this.MoveNoAnimation(0)},this)
            let timer = this.setTimer(this,0,func)
            
            index = 0;



        }
        return index

    }
    goPrev(index){
        console.log('now',index)
        index-=1;
       
        if(index>this.firstItem-1){
            console.log(index)
            this.Animation(-index*this.itemWidth)

        }
        else{
            index = this.lastItem;
            console.log(index,'cg')
            let that = this
            this.MoveNoAnimation(-index*this.itemWidth);
            index-=1;
            setTimeout(function(){
                
                that.Animation(-index*that.itemWidth);

            },0)
            

            
        //     const p = new Promise((resolve)=>{resolve()})
             
        //     p.then(()=>{
        //         index-=1;
        //         that.Animation(-index*that.itemWidth);
        // })
            


        }
        return index
    }
    change_obj(f,target){
        return function(){
            
            return f.call(target)
        }

    }
    setLock(){
        let timer = this.setTimer(this,0,this.change_obj(function(){this.lock=true},this))
       
        

    };
    


   SlideNext(){
       if (!this.lock){
           return false
           
       }
       else{
           this.lock = false
          
        // console.log(this.curIndex)
        this.curIndex = this.goNext(this.curIndex)
        this.ClearActive()
        this.setLock()
        // console.log('atf',this.curIndex)

       }
    }
    SlidePrev(){
       
        this.curIndex = this.goPrev(this.curIndex)
        this.ClearActive()
    }
    directgo(index){
        this.curIndex = index;
        this.Animation(-index*this.itemWidth);
        this.ClearActive()

    }
    SetActive(){
        this.sliderItems[this.curIndex].className =`${DEFAULTS.default_className} ${DEFAULTS.ActiveName}`
    }
    ClearActive(){
        console.log('ckckck',this.curIndex)
        console.log('cjadu',this.lastItem)
        for (let i=0;i<this.lastItem;i++){
            if (i == this.curIndex){
                this.sliderItems[i].className = `${DEFAULTS.default_className} ${DEFAULTS.ActiveName}`;
                this.control_item[i].className = 'active';
            }
            else{
                this.sliderItems[i].className = `${DEFAULTS.default_className}`;
                this.control_item[i].className = '';

            }
        }

    }


}


//test

export default SliderBase


// var i  = 0;
// odiv1 = document.getElementById('test2');
// odiv1.onclick = function(){
//     // slide.directgo(2);
//     slide.SlideNext();
    

// }
// odiv = document.getElementById('test');
// odiv.onclick = function(){

//     slide.SlidePrev()
// }

