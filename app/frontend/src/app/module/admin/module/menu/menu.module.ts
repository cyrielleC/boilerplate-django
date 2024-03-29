import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryEditionComponent } from './component/card-edition/card-edition.component';
import { MenuRoutingModule } from './menu.routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/module/shared/shared.module';
import { FormulasExplanationComponent } from './component/formulas-explanation/formulas-explanation.component';
import { SimpleLinedInputsWithIconsComponent } from './component/simple-lined-inputs-with-icons/simple-lined-inputs-with-icons.component';


@NgModule({
  declarations: [
    CategoryEditionComponent,
    FormulasExplanationComponent,
    SimpleLinedInputsWithIconsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
    FormsModule,
    MatFormFieldModule, MatSelectModule,MatInputModule,
    TranslateModule,
  ]
})
export class MenuModule { }
