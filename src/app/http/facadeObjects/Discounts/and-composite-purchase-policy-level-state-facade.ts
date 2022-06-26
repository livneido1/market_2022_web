import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { ObjectsDeserializer } from '../objects-deserializer';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateWrapper, PurchasePolicyLevelStateWrapperType } from './Wrappers/purchase-policy-level-state-wrapper';

export class AndCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable {

    constructor( purchasePolicyLevelStateFacades?: PurchasePolicyLevelStateFacade[]){
      super("AndCompositePurchasePolicyLevelStateFacade",
      'All Sub Purchase Policies',
      purchasePolicyLevelStateFacades);

    }

    override deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.purchasePolicyLevelStateFacades = [];
      for (const cond of value.purchasePolicyLevelStateFacades){
        const condObj = new ObjectsDeserializer().getPurchasePolicyLevelStateFacade(cond);
        this.purchasePolicyLevelStateFacades.push(condObj);
      }
      return this;
    }

    getWrapper(): PurchasePolicyLevelStateWrapper {
      const subWrappers: PurchasePolicyLevelStateWrapper[] = [];
      for (const levelState of this.purchasePolicyLevelStateFacades) {
        subWrappers.push(levelState.getWrapper());
      }
      return new PurchasePolicyLevelStateWrapper(
        PurchasePolicyLevelStateWrapperType.AndCompositePurchasePolicyLevelStateFacade,
        -1,
        Category.cellular,
        subWrappers
      );
    }

    getString(): string {
        return "All Sub Level Purchase Policies are needed"
    }


  }
