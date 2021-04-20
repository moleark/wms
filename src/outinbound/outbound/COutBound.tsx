import { CUqBase } from '../../CBase';
import { VReadyOutBoundCut, VOutBound } from './index';
import { observable } from 'mobx';
import { VCutOffSuccess } from './VCutOffSuccess';
import { VOutBoundOrderHistory } from './VOutBoundOrderHistory';
import { VOutBoundOrderDetail } from './VOutBoundOrderDetail';
import { VOffShelfList } from './VOffShelfList';
import { VTallyList } from './VTallyList';

export class COutBound extends CUqBase {

    @observable warehouse: any;
    readyOutBoundList: any[];
    outBoundOrderDetail: any[];

    async internalStart(param: any) {
        this.openVPage(VOutBound);
    }

    // 待出库截单界面
    async openReadyOutBoundCutPage(warehouse: any) {
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

    // 打开出库单详情界面
    openOutBoundOrderDetailPage = async (outBoundOrderId: any) => {

        let outBoundOrderInfo = await this.uqs.warehouse.SearchOutBoundOrderDetail.table({ outBoundOrder: outBoundOrderId });
        this.openVPage(VOutBoundOrderDetail, outBoundOrderInfo);
    }

    // 打开打印出库单界面
    openOffShelfListPage = async (outBoundOrderInfo: any) => {
        this.openVPage(VOffShelfList, outBoundOrderInfo);
    }

    // 打开打印理货单界面
    openTallyListPage = async (outBoundOrderInfo: any) => {
        this.openVPage(VTallyList, outBoundOrderInfo)
    }

}