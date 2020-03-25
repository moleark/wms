//import _ from 'lodash';
import { CUqBase } from '../CBase';
import { VSetting } from './VSetting';
import { CWarehouse } from './CWarehouse';

export class CSetting extends CUqBase {

    //    cApp: CApp;
    protected async internalStart() {
        this.openVPage(VSetting);
    }

    tab = () => this.renderView(VSetting);

    //库房管理
    openWarehouseList = async () => {

        let cWarehouseList = this.newC(CWarehouse); // new CSelectShippingContact(this.cApp, undefined, false);
        await cWarehouseList.start();
    }
}