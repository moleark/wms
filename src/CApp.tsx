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

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;

    cHome: CHome;
    cInBound: CInBound;
    cOutBound: COutBound;
    cSetting: CSetting;
    cMessage: CMessage;
    cMe: CMe;


    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cInBound = this.newC(CInBound);
        this.cOutBound = this.newC(COutBound);
        this.cSetting = this.newC(CSetting);
        this.cMe = this.newC(CMe);
        //this.cMessage = this.newC(CMessage);

        this.showMain();
        // this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }

}