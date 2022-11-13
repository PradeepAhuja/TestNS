import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import * as fs from '@nativescript/core/file-system';
@Component({
  selector: 'ns-details',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  item: Item;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let imageDBPath = fs.knownFolders.currentApp().path;
    console.log(imageDBPath);

    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItem(id);

    // log the item to the console
    console.log(this.item);
  }
}
