import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
//import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';


export class CHome extends CUqBase {

    //    cApp: CApp;

    async internalStart(param: any) {
        let { cSetting } = this.cApp;
        await cSetting.start();
        this.openVPage(VHome);
    }

    tab = () => this.renderView(VHome);
}