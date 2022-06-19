import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompositePurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-type-facade';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { PoliciesService } from 'app/services/policies-service.service';

export interface MergePoliciesData {
  policies: PurchasePolicyTypeFacade[];
}

@Component({
  selector: 'app-merge-purchase-policies',
  templateUrl: './merge-purchase-policies.component.html',
  styleUrls: ['./merge-purchase-policies.component.scss'],
})
export class MergePurchasePoliciesComponent implements OnInit {
  policies: PurchasePolicyTypeFacade[];
  policiesMap: Map<PurchasePolicyTypeFacade, boolean>;
  allCompositeTypes: CompositePurchasePolicyTypeFacade[];
  constructor(
    public dialogRef: MatDialogRef<MergePurchasePoliciesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergePoliciesData,
    private config: ConfigService,
    private message: MessageService,
    private policiesService: PoliciesService
  ) {
    this.policies = data.policies;
    this.policiesMap = new Map();
    this.allCompositeTypes =
      this.policiesService.getAllCompositePurchasePolicyTypeFacade();
    for (const policy of this.policies) {
      this.policiesMap.set(policy, false);
    }
  }

  ngOnInit(): void {}
  getPolicyName(policy: PurchasePolicyTypeFacade): string {
    return this.policiesService.getPurchasePolicyName(policy);
  }

  onOperatorClick(
    policy: CompositePurchasePolicyTypeFacade
  ): PurchasePolicyTypeFacade[] {
    const toggledPolicy = [];
    const res: PurchasePolicyTypeFacade[] = [];
    for (const PolicyEntry of this.policiesMap.entries()) {
      const simplePolicy = PolicyEntry[0];
      const toggled = PolicyEntry[1];
      if (toggled) {
        toggledPolicy.push(simplePolicy);
      } else {
        res.push(simplePolicy);
      }
    }
    if (toggledPolicy.length > 1) {
      policy.purchasePolicyTypeFacades = [];
      policy.purchasePolicyTypeFacades.push(...toggledPolicy);
      res.push(policy);
      return res;
    }
    return this.policies;
  }

  canSubmit() {
    let counter = 0;
    for (const val of this.policiesMap.values()) {
      if (val) {
        counter++;
        if (counter > 1) {
          return true;
        }
      }
    }
    return false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateMap(policy: PurchasePolicyTypeFacade, checked: boolean) {
    this.policiesMap.set(policy, checked);
  }
}
