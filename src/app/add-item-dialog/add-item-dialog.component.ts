import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/http/facadeObjects/ItemFacade';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
})
export class AddItemDialogComponent implements OnInit {
  itemName: string;
  itemInfo: string;
  itemPrice: number;
  categoryString: string;
  keywordsString: string;
  returnData: {
    name: string;
    info: string;
    price: number;
    category: Category;
    keywords: string[];
  };
  categoryList: string[] = this.config.getAllCategories();

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.itemName = '';
    this.itemInfo = '';
    this.itemPrice = 0;
    this.categoryString = '';
    this.keywordsString = '';
  }
  canSubmit() {
    return (
      this.itemInfo &&
      this.itemInfo !== '' &&
      this.itemName &&
      this.itemName !== '' &&
      this.itemPrice &&
      this.itemPrice !== 0 &&
      this.categoryString &&
      this.categoryString !== '' &&
      this.isKeywordValid()
    );
  }

  isKeywordValid() {
    if (this.keywordsString && this.keywordsString.trim() !== '') {
      if (!this.keywordsString.trim().startsWith('#')) {
        return false;
      }
    }
    return true;
  }
  createData() {
    const keywords: string[] = [];
    const str2 = this.keywordsString.split('#');
    for (const s of str2) {
      const keyword = s.trim();
      if (keyword !== '') {
        keywords.push(s);
      }
    }
    const category = this.config.createCategoryFromString(this.categoryString);
    this.returnData = {
      name: this.itemName,
      info: this.itemInfo,
      price: this.itemPrice,
      category: category,
      keywords: keywords,
    };
    return this.returnData;
  }
  selectCategory(category: string) {
    this.categoryString = category;
    this.returnData.category = this.config.createCategoryFromString(category);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
