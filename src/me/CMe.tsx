import { CUqBase } from '../CBase';
import { VMe } from './index';
import { CSetting } from '../setting/index';

export class CMe extends CUqBase {

    protected async internalStart() {

        this.openVPage(VMe);
    }


    tab = () => this.renderView(VMe);

    openSettingPage = async () => {
        //let { cSetting } = this.cApp;
        //cSetting.showSetting();   

        let cSetting = this.newC(CSetting);
        await cSetting.start();
    };
}