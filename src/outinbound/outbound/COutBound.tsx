import { CUqBase } from '../../CBase';
import { VReadyOutBoundCut, VOutBound } from './index';
import { observable } from 'mobx';
import { VCutOffSuccess } from './VCutOffSuccess';
import { VOutBoundOrderHistory } from './VOutBoundOrderHistory';

export class COutBound extends CUqBase {

    @observable warehouse: any;
    readyOutBoundList: any[];

    async internalStart(param: any) {

        this.openVPage(VOutBound);
    }

    async openReadyOutBoundPage(warehouse: any) {
        this.warehouse = warehouse;
        if (warehouse !== undefined) {
            this.readyOutBoundList = await this.uqs.warehouse.SearchReadyOutBoundCutTastList.table({ warehouse: warehouse.id });
            let outBoundList: any = { readyOutBoundList: this.readyOutBoundList, warehouse: this.warehouse };
            this.openVPage(VReadyOutBoundCut, outBoundList);
        }
    }

    // 出库截单
    outBoundCutOff = async () => {

        let warehouseId: number = this.warehouse.id;
        let result = await this.uqs.warehouse.OutBoundCut.submit({ warehouse: warehouseId });
        this.backPage();
        this.openVPage(VCutOffSuccess, result);
    }

    // 打开出库单历史界面
    async openOutBoundOrderHistoryPage(warehouse: any) {

        let outBoundOrderList = await this.uqs.warehouse.SearchOutBoundOrderList.table({ warehouse: warehouse.id });
        this.openVPage(VOutBoundOrderHistory, outBoundOrderList);
    }

}