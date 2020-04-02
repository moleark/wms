//import _ from 'lodash';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { VSetting } from '../setting/VSetting';
import { CWarehouse } from '../setting/CWarehouse';

export class CMe extends CUqBase {

    //    cApp: CApp;
    protected async internalStart() {
        this.openVPage(VMe);
    }

    tab = () => this.renderView(VMe);

    //库房管理
    openWarehouseList = async () => {

        let cWarehouseList = this.newC(CWarehouse); // new CSelectShippingContact(this.cApp, undefined, false);
        await cWarehouseList.start();
    };

    openSettingPage = async () => {
        this.openVPage(VSetting);
    };
}