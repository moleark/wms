import { CAppBase, IConstructor } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain } from './main/main';
import { CMessage } from './main/CMessage';
import { CHome } from "./home/CHome";
import { CInBound } from "./inbound/CInBound";
import { COutBound } from "./outbound/COutBound";
import { CSetting } from "./setting/CSetting";
import { CMe } from "./me/CMe";
import { CWarehouse } from "../src/setting/warehouseBuild/CWarehouse";
import { CStorageCondition } from "../src/setting/storageCondition/CStorageCondition";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    topKey: any;
    currentSalesRegion: any;
    currentLanguage: any;

    cHome: CHome;
    cInBound: CInBound;
    cOutBound: COutBound;
    cSetting: CSetting;
    //cMessage: CMessage;
    cMe: CMe;
    cWarehouse: CWarehouse;
    cStorageCondition: CStorageCondition;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cInBound = this.newC(CInBound);
        this.cOutBound = this.newC(COutBound);
        this.cSetting = this.newC(CSetting);
        //this.cMessage = this.newC(CMessage);
        this.cMe = this.newC(CMe);
        this.cWarehouse = this.newC(CWarehouse);
        this.cStorageCondition = this.newC(CStorageCondition);

        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }

}