//import _ from 'lodash';
import { CUqBase } from '../CBase';
import { VMe } from './index';
import { CSetting, VSetting } from '../setting/index';
import { CWarehouse } from '../setting/warehouseBuild/CWarehouse';
import { CStorageCondition } from '../setting/storageCondition/CStorageCondition';

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