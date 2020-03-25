import { CUqBase } from '../CBase';
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