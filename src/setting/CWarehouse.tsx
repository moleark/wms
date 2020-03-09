import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VWarehouse } from './VWarehouse';

export class CWarehouse extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VWarehouse);
    }

}