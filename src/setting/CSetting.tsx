//import _ from 'lodash';
import { Context } from 'tonva';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
import { VSetting } from './VSetting';
import { CWarehouse } from './CWarehouse';
import { CWarehouseBuild } from './CWarehouseBuild';
import { CWarehouseRoom } from './CWarehouseRoom';


export class CSetting extends CUqBase {

    //    cApp: CApp;
    protected async internalStart() {

    }

    openWarehouseList = async () => {
        let cWarehouse = this.newC(CWarehouse);// new CSelectShippingContact(this.cApp, undefined, false);
        await cWarehouse.start(false);
    }

    opennWarehouseBuildList = async () => {
        let cWarehouseBuild = this.newC(CWarehouseBuild);// new CSelectShippingContact(this.cApp, undefined, false);
        await cWarehouseBuild.start(false);
    }

    openWarehouseRoomList = async () => {
        let cWarehouseRoom = this.newC(CWarehouseRoom);// new CSelectShippingContact(this.cApp, undefined, false);
        await cWarehouseRoom.start();
    }

    tab = () => this.renderView(VSetting);

}