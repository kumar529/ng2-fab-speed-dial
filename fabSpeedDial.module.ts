import { NgModule } from "@angular/core";
import {FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FabToggleDirective, FabButtonDirective, FabSpeedDialComponent } from "./fabSpeedDial.component";
import { MaterialCommonModule } from "../../commonMaterialModules/materialCommon.module";

@NgModule({
  imports         : [
                      MaterialCommonModule,
                      FlexLayoutModule,
                      CommonModule,
                      FormsModule
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