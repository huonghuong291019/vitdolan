import { Component, Injector, OnInit } from '@angular/core';
import { ApiService } from '../lib/api.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../lib/base-component';
import { map, tap, takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menus:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
  }

}
