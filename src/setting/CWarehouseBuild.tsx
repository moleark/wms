import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VWarehouseBuild } from './VWarehouseBuild';
import { observable } from 'mobx';

export class CWarehouseBuild extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VWarehouseBuild);
    }

}