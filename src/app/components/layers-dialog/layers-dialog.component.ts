import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LocalLayer} from "../../../types/maps";
import {Map} from "leaflet";
import {RectangleMarker} from "../../pages/leaflet-map/RectangleMarker";
import {PointMarker} from "../../pages/leaflet-map/PointMarker";


@Component({
  selector: 'app-layers-dialog',
  templateUrl: './layers-dialog.component.html',
  styleUrls: ['./layers-dialog.component.less']
})
export class LayersDialogComponent {
  myHeader: HTMLElement | undefined | null;
  localLayers: LocalLayer[] = [];
  layerList: string[] = [];
  method: any;
  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  x:number = 0;
  y:number = 0;

  constructor(private dialog: MatDialog, ) { }

  openModal() {
    this.dialog.open(LayersDialogComponent,
      {
        disableClose: true,
        hasBackdrop: false,
        position: {
          right: "0"
        }
      });

  }

  showMarker(marker: PointMarker|RectangleMarker) {
    marker.show();
  }

  hideMarker(marker: PointMarker|RectangleMarker) {
    marker.hide();
  }

  setOpacity(marker: PointMarker|RectangleMarker,number: number) {
    marker.options.opacity = number;
    if (marker instanceof RectangleMarker) {
      marker.redraw();
      marker.forceUpdate();
    } else if (marker instanceof PointMarker) {
      marker.setOpacity(number);
      marker.forceUpdate();
    }
  }

  dragMouseDown(ev: MouseEvent | undefined) {
    const e = (ev || window.event) as MouseEvent;
    if(!e) {
      return;
    }
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  }

  elementDrag(ev: MouseEvent | undefined) {
    const e = (ev || window.event) as MouseEvent;
    if(!e) {
      return;
    }
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    if (this.myHeader) {
      const htmlParentChild = (this.myHeader as HTMLElement).parentElement;
      const htmlParent = htmlParentChild?.parentElement;
      if (htmlParent) {
        if(!this.x) {
          this.x = 0;
        }
        if(!this.y) {
          this.y = 0;
        }
        this.x=this.x - this.pos1;
        this.y=this.y - this.pos2;
        htmlParent.style.transform = "translate("+(this.x)+"px,"+(this.y)+"px)";
      }
    } else {
      this.myHeader = document.getElementById('myHeader');
    }
  }

  closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  deleteLayer(layer: LocalLayer) {
    layer.marker.remove();
    for(let i = 0; i < this.localLayers.length; i++) {
      if(this.localLayers[i].id === layer.id) {
        this.localLayers.splice(i, 1);
      }
    }

  }
}
