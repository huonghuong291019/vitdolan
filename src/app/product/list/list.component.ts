import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../lib/base-component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  list: any;
  page: any;
  pageSize: any;
  totalItems:any;
  item_group_id:any;
  menus:any;
  total:any;
  items:any;
  item:any;
  money:any;
  name:any;
  SortDirection = 'asc';
  SortbyParam = '';
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.list = [];
    this.page = 1;
    this.pageSize = 5;
    this.item = {};
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/itemgroup/get-by-id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.item = res;
        this.item_group_id = params['id'];
        this._api.post('/api/item/search', { page: this.page, pageSize: this.pageSize, item_group_id: this.item_group_id}).takeUntil(this.unsubscribe).subscribe(res => {
          this.list = res.data;
          this.totalItems = res.totalItems;
          }
          , err => { }); 
        // setTimeout(() => {
        //   this.loadScripts();
        // });
      }); 
    });
  //   this._route.params.subscribe(params => {
           
  //  });   
   this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
    this.menus = res;
  }); 
 
  this._cart.items.subscribe((res) => {
    this.total = res? res.length:0;
  });
  this._cart.items.subscribe((res) => {
    this.items = res;
    this.money = 0;
    for(let x of this.items){ 
      x.moneysum = x.quantity * x.item_price;
      this.money += x.quantity * x.item_price;
    } 
  });
  }
  loadPage(page) { 
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.post('/api/item/search', { page: page, pageSize: this.pageSize, item_group_id: id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });       
   });   
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
  swish(it)
  {
    this._api.get('/api/item/get-by-id-swish/'+ it.item_id).takeUntil(this.unsubscribe).subscribe((res:any) => {
      alert('Đã thích sản phẩm !'); 
      }); 
  }
}