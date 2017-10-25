import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FabToggleDirective, FabButtonDirective, FabSpeedDialComponent } from "./fabSpeedDial.component";

@NgModule({
  imports         : [
                      CommonModule
                    ],
  declarations    : [ 
                      FabToggleDirective,
                      FabButtonDirective, 
                      FabSpeedDialComponent
                    ],
  exports         : [ 
                      FabToggleDirective,
                      FabButtonDirective, 
                      FabSpeedDialComponent
                    ]
})

export class FabSpeedDialModule{}