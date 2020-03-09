import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VWarehouseRoom } from './VWarehouseRoom';
import { observable } from 'mobx';

export class CWarehouseRoom extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VWarehouseRoom);
    }

}