import { NgModule } from "@angular/core";
import { FabToggleDirective, FabButtonDirective, FabSpeedDialComponent } from "./fabSpeedDial.component";

@NgModule({
  imports         : [],
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

export class Ng2FabSpeedDialModule{}