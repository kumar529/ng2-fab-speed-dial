import {
  Component,
  Input,
  ContentChildren,
  ContentChild,
  ElementRef,
  HostListener,
  AfterContentInit,
  Directive,
  ViewEncapsulation,
  QueryList
} from '@angular/core';

@Directive({
  selector: '[fab-button]',
  host : {
    '[class.fab-button]' : 'true'
  }
})
export class FabButtonDirective {}

@Directive({
  selector: '[fab-toggle]',
  host : {
    '[class.fab-toggle]' : 'true'
  },
})
export class FabToggleDirective {}

@Component({
  selector: 'fab-speed-dial',
  template : `
    <div class="fab-menu">
      <ng-content></ng-content>
    </div>
  `,
  styles : [`
    .fab-menu {
      position: relative;
      display: inline-block;
    }

    .fab-menu ::ng-deep .fab-button {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition-timing-function: ease-out;
      transition-property: transform;
    }

    .fab-menu ::ng-deep .fab-toggle {
      z-index: 2;
    }
  `]
})

export class FabSpeedDialComponent implements AfterContentInit {

  private active: boolean;

  @Input('direction') 
  public direction = 'right';

  @ContentChild(FabToggleDirective, {read : ElementRef}) 
  private toggle: ElementRef;

  @ContentChildren(FabButtonDirective, {read : ElementRef}) 
  private buttons: QueryList<ElementRef>;
  
  private btnArray: any[];

  constructor(private element: ElementRef) {}

  public ngAfterContentInit() {

    this.btnArray = this.buttons.toArray();

    this.undoTranslation();

    this.toggle.nativeElement.onclick = () => {

      this.active = !this.active;
      this.updateButtons();

    };

  }

  private undoTranslation(){

    let tWidth              = this.toggle.nativeElement.offsetWidth;
    let tHeight             = this.toggle.nativeElement.offsetHeight;

    for (var i = 0; i < this.btnArray.length; i++) {

      let bHeight           = this.btnArray[i].nativeElement.offsetHeight;
      let bWidth            = this.btnArray[i].nativeElement.offsetWidth;
      let style             = this.btnArray[i].nativeElement.style;

      style['visibility']               = 'hidden';
      style['transition-duration']      = '';
      style['transform']                = `translate3d(${ (tWidth - bWidth)/2 }px, ${ (tHeight - bHeight)/2 }px ,0)` ;
    }

  }

  private getTranslate(xTrans: number, yTrans: number, tWidth: number, tHeight: number,bWidth: number, bHeight: number) {

    if(this.direction === 'left') {

      return `translate3d(${ -xTrans }px, ${ (tHeight - bHeight)/2 }px, 0)`;

    } 
    else if(this.direction === 'right') {

      return `translate3d(${ xTrans }px, ${ (tHeight - bHeight)/2 }px, 0)`;

    }
    else if(this.direction === 'up') {

      return `translate3d(${ (tWidth - bWidth)/2 }px, ${ -yTrans }px,0)`;

    } 
    else if(this.direction === 'down') {

      return `translate3d(${ (tWidth - bWidth)/2 }px, ${ yTrans }px, 0)`;

    }
    else {

      console.error(`Unsupported direction for Fab; ${this.direction}`);
      
    }
  }

  private doTranslation (){

    let tWidth  = this.toggle.nativeElement.offsetWidth;
    let tHeight = this.toggle.nativeElement.offsetHeight;
    
    let xTrans    = 0,            yTrans    = 0;
    let bWidth    = tWidth,       bHeight   = tHeight;

    for(let i = 0; i < this.btnArray.length; i++) {

      bHeight    = this.btnArray[i].nativeElement.offsetHeight;
      bWidth     = this.btnArray[i].nativeElement.offsetWidth;

      xTrans    += bWidth   + 10 ;
      yTrans    += bHeight  + 10;
      
      let style                         = this.btnArray[i].nativeElement.style;

      style['visibility']               = 'visible';
      style['transition-duration']      = `${ 90 + (100 * (i + 1)) }ms`;
      style['transform']                = this.getTranslate(xTrans, yTrans, tWidth, tHeight,bWidth, bHeight);

    }
  }

  private updateButtons() {

    if(this.active){
      this.doTranslation();
    }
    else{
      this.undoTranslation();
    }
    
  }

  @HostListener('document:click', ['$event.target'])
  private onDocumentClick(target: any) {

    if(this.active && !this.element.nativeElement.contains(target)) {

      this.active = false;
      this.updateButtons();
      
    }

  }

}


