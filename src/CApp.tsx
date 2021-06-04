import { CAppBase, IConstructor, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain } from './main/main';
// import { CMessage } from './main/CMessage';
import { CHome } from "./home/CHome";
import { COutInBound } from "./outinbound/index";
import { CInBound } from "./outinbound/inbound/CInBound";
import { COutBound } from "./outinbound/outbound/COutBound";
import { CSetting } from "./setting/CSetting";
import { CMe } from "./me/CMe";
import { CWarehouse } from "../src/setting/warehouseBuild/CWarehouse";
import { CStorageCondition } from "../src/setting/storageCondition/CStorageCondition";

document.title = "库房管理系统";

export class CApp extends CAppBase {

    topKey: any;
    currentSalesRegion: any;
    currentLanguage: any;

    cHome: CHome;
    cOutInBound: COutInBound;
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
        this.cOutInBound = this.newC(COutInBound);
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
        // let divLogin = document.getElementById('login');
    }

}