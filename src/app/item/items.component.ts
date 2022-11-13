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
  currentImagesDatabase: any=null;
  ngOnInit(): void {
    let imageDBPath = fs.knownFolders.currentApp().path;
    imageDBPath =path.join(imageDBPath, "/assets/appimages");  
    imageDBPath = path.join(imageDBPath, this.imageDatabaseName);  
    console.log("aaaaa12",Sqlite.exists(this.imageDatabaseName));
    console.log("cccc",Sqlite.exists(imageDBPath));
    console.log(imageDBPath);
    if (!Sqlite.exists(this.imageDatabaseName)) {
      if(isIOS)
      {
        //const fileManager = Sqlite.iosProperty(NSFileManager, NSFileManager.defaultManager);

        let destination = path.join(fs.knownFolders.documents().path ,this.imageDatabaseName);
        NSFileManager.defaultManager.copyItemAtPathToPathError(imageDBPath, destination);
      }
      else
      {
        Sqlite.copyDatabase(imageDBPath);
      }
      
    }
    (new Sqlite(this.imageDatabaseName)).then(db => {
    
      this.currentImagesDatabase = db;
      this.currentImagesDatabase.resultType(Sqlite.RESULTSASOBJECT);
      let sql=`SELECT uniqueID,imageURL,imageType FROM ImageGallery order by imageType,imageURL limit 1`;
      let thisClass=this;
      this.currentImagesDatabase.all(
        sql,
        [],
          function(err, dbResponse) {
            console.log(dbResponse);
            thisClass.markFileAsDownloaded([dbResponse[0].uniqueID],false);
          });
    },
    error => {
      console.log("CREATE TABLE ERROR2", error);
    });
    this.items = this.itemService.getItems()
  }

  markFileAsDownloaded(uniqueIDs,startDownload)
{
  let thisClass=this;
//  console.log("markFileAsDownloaded",startDownload,uniqueIDs);
  let inCommand="";
  
  for(let i=0;i<uniqueIDs.length;i++)
  {
    if(i>0)
    {
      inCommand=inCommand+",";
    }
    
    inCommand=inCommand+"?";
  }
  /*
  let message="marked22223 " +uniqueIDs.length.toString() + "->" +  startDownload.toString() + "->" +uniqueIDs[0] ;
    thisClass.fd.sendUpdate({message:message,
      currentDownloadingIndex:1,
      
      imageType:"AA",
      grandTotalOfImagesToDownload:100});
   */
  this.currentImagesDatabase.execSQL("update ImageGallery set downloaded=1 where uniqueID in (" + inCommand + ")",uniqueIDs).then(id => {
    console.log("files marked22223", uniqueIDs.length,startDownload,uniqueIDs[0]);
    
  
  },
  error => {
    
    console.log("ERR markFileAsDownloaded", error);
    
  });
}

}
