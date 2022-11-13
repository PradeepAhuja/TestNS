import { Component, OnInit } from '@angular/core'

import { Item } from './item'
import { ItemService } from './item.service'
import * as fs from '@nativescript/core/file-system';
import { File, Folder, isAndroid, isIOS, knownFolders, path } from '@nativescript/core';
var Sqlite = require("nativescript-sqlite");

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>
  imageDatabaseName="T2T_Images.db";
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    let imageDBPath = fs.knownFolders.currentApp().path;
    imageDBPath =path.join(imageDBPath, "/assets/appimages");  
    imageDBPath = path.join(imageDBPath, this.imageDatabaseName);  
    console.log("aaaaa12",Sqlite.exists(this.imageDatabaseName));
    console.log("cccc",Sqlite.exists(imageDBPath));
    console.log(imageDBPath);
    const folder = Folder.fromPath(imageDBPath);
    this.items = this.itemService.getItems()
  }
}
