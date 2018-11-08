import { Component, OnInit } from '@angular/core';
import { GetImagesService } from '../get-images.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  
})

export class CarouselComponent implements OnInit {

  images;
  tempData;
  slider;
  items;
  sliderVisibleWidth;
  totalItemsWidth;
  itemWidth;
  maxXOffset;
  minXOffset;
  imageLoad;
  container;
  pointer = 0;
  right;
  left ;
  disablePrev : boolean = false;
  disableNext : boolean = false;
  
  constructor(private getService: GetImagesService) {}

  ngOnInit() {
      //get images from our service
      this.getService.getImages().subscribe((data) => {
      this.tempData  = data;
      this.images = this.tempData.hits;
      const _component = this;

      //check if the HTMl elements containing our fetched images are available in DOM
      const checkContainerFn = function() {
        _component.container = document.querySelector('.container');
        console.log('checking for container', this.container);
        if (_component.container) {
          console.log('finally found container', this.container);
          clearInterval(k);
          _component.readyFn();
        }
      };
      const k = setInterval(checkContainerFn, 500);
    }, error => {
      console.log("Error : " , error);
    });

    this.carousel(document.querySelector('.container'));
  }



  readyFn() {
    
    this.carousel(this.container);
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('Viewport width : ', w);

    this.sliderVisibleWidth = this.slider.offsetWidth;
    console.log('Slider visible width : ', this.slider.offsetWidth); // the visible area of the slider by measuring its width
   
  }



  /*
      Carousel function initializes our slider and items variables that contain our images
  */
  carousel(container) {
    this.slider = document.querySelector('.slider');
    this.items = document.querySelectorAll('.item');  
    
    const left = this.slider.getBoundingClientRect().left;
    const right = this.slider.getBoundingClientRect().right;
    console.log('Items in carousel: ', this.items);
    console.log('Slider Right : ', right);
  }
   


  getTotalItemsWidth(items) {

    const left = items[0].getBoundingClientRect();
    const right = items[items.length - 1].getBoundingClientRect();
    return right - left;
  }



  getItemWidth () {
    /*
      Subtract the left property of first and second items .
      This includes the margin in between too which we want to include.
    */
    this.itemWidth = this.items[1].getBoundingClientRect().left - this.items[0].getBoundingClientRect().left;
  }



  xMinMaxOffsets() {

    this.totalItemsWidth = this.getTotalItemsWidth(this.items);
    console.log('totalItemsWidth : ', this.totalItemsWidth);

    this.minXOffset = 0;
    this.maxXOffset = - (this.totalItemsWidth - this.sliderVisibleWidth);
    console.log('minXOffset : ', this.maxXOffset);
  }



  prev() {    
    //check if you have are at the first image
    if(this.atFirstImage()) {
      console.log("Stop going PREVIOUS");
      this.disablePrev = true;

    } else { 
      //continue going previous
      //Get acces to an item's width by calling the following function:
      this.getItemWidth();
      this.pointer += this.itemWidth;

      this.items.forEach((element) => {
        element.style.transform = "translate(" + this.pointer + "px, 0px)";
      });
      this.disablePrev = false;
      this.disableNext = false;
    };

    console.log("Prev Left pointer : ", this.pointer);
  }


  
  next() {
   
    //check if you have reached the last image
    if(this.atLastImage()){
      //stop going next
      console.log("Stop going NEXT");
      this.disableNext = true;

    } else { 

      //continue going next
      //Get acces to an item's width by calling the following function:
      this.getItemWidth();
      this.pointer -= this.itemWidth;
    
      this.items.forEach(element => {
        element.style.transform = "translate(" + this.pointer + "px, 0px)";
      });
      this.disableNext = false;
      this.disablePrev = false;
    }
    console.log("Next xRight : " , this.pointer);
  }



  atLastImage() {
    //check the last item's right against the slider's right
    console.log("this.slider.getBoundingClientRect().right : " , this.slider.getBoundingClientRect().right);
    console.log("LAst items right : ", this.items[this.items.length - 2].getBoundingClientRect().right);
    return Math.round(this.slider.getBoundingClientRect().right) == Math.round(this.items[this.items.length - 1].getBoundingClientRect().right);
  }
 


  atFirstImage() {
    //check first item's left against the slider's left to see if they coincide
    return this.slider.getBoundingClientRect().left == this.items[0].getBoundingClientRect().left;
  }

  
}
