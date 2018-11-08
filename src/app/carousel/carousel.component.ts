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
  maxXOffset;
  minXOffset;
  imageLoad;
  b;
  container;
  xLeft = 0;
  xRight = 0;
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
    // const nodeList = this.container.querySelectorAll('.item');

    console.log('Offset : ', this.slider.offsetWidth); // the visible area of the slider by measuring its width
    console.log('Item: ', this.items[0]);

    this.sliderVisibleWidth = this.slider.offsetWidth;
    this.totalItemsWidth = this.getTotalItemsWidth(this.items);
    this.maxXOffset = 0;
    this.minXOffset = - (this.totalItemsWidth - this.sliderVisibleWidth);
  }

  /*
      Carousel function initializes our slider and items variables that contain our images
  */
  carousel(container) {
    this.slider = document.querySelector('.slider');
    this.items = document.querySelectorAll('.item');  
    console.log('Items: ', this.items);
  }
   
  getTotalItemsWidth(items) {
    const left = items[0].getBoundingClientRect();
    const right = items[items.length - 1].getBoundingClientRect();
    return right - left;
  }

  prev() {
    this.xRight = this.xRight + 220;

    //check if you have are at the first image
    if(Math.abs(this.checkLeftOffset()) === 82.5 ) {
      //stop going Previous
      console.log("Stop going PREVIOUS");
      this.disablePrev = true;

    } else { 
      //continue going previous
      this.items.forEach((element) => {
        element.style.transform = "translate(" + this.xRight + "px, 0px)";
        // element.setAttribute("transform", "translate(" + this.x + "px, 0px)");
      });
      this.disablePrev = false;
    };
    console.log("PRev xRight : ", this.xRight);
  }

  next() {
    this.xRight -= 220;

    //check if you have reched the last image
    console.log("Right offset : " , this.checkRigthOffset());

    if(Math.abs(this.checkRigthOffset()) === 1182.5 ){
      //stop going next
      console.log("Stop going NEXT");
      this.disableNext = true;

    } else { 
      //continue going next
      this.items.forEach(element => {
        element.style.transform = "translate(" + this.xRight + "px, 0px)";
      });
      this.disableNext = false;
    }
    console.log("Next xRight : " , this.xRight);
  }

  checkRigthOffset() {
    this.right = this.items[this.items.length - 1].getBoundingClientRect().x;
    return this.right;
  }

  checkLeftOffset() {
    this.left = this.items[0].getBoundingClientRect().x;
    return this.left;
  }

  
  
  
}
