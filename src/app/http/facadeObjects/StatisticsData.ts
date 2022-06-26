import { Deserializable } from "./deserializable";

export class StatisticsData implements Deserializable{

    numOfVisitors:number;
    numOfRegularMembers:number;
    numOfShopsManagers:number;
    numOfOwners: number;
    numOfSystemManager: number;

    constructor(numOfVisitors?:number, numOfRegularMembers?:number, numOfShopsManagers?:number,numOfOwners?:number,numOfSystemManager?: number){
        this.numOfOwners=numOfOwners;
        this.numOfRegularMembers=numOfRegularMembers;
        this.numOfShopsManagers=numOfShopsManagers;
        this.numOfSystemManager=numOfSystemManager;
        this.numOfVisitors=numOfVisitors;
    }

    deserialize(value: any): this {
        
        if(value){
            try{
            const valueAsJson=JSON.parse(value);
            Object.assign(this,valueAsJson);
        }
        catch(e){
            this.numOfVisitors=undefined;
        }
        }
        return this;
    }
}