import { CUqBase } from '../../CBase';
import { VReadyOutBoundCut, VOutBound } from './index';
import { observable } from 'mobx';
import { VCutOffSuccess } from './VCutOffSuccess';
import { VOutBoundOrderHistory } from './VOutBoundOrderHistory';
import { VOutBoundOrderDetail } from './VOutBoundOrderDetail';
import { VOffShelfList } from './VOffShelfList';
import { VTallyList } from './VTallyList';
import { VDeliveryList } from './VDeliveryList';
import { VAccompanyingGoodsInfo } from './VAccompanyingGoodsInfo';
import { isUndefined } from 'lodash';

export class COutBound extends CUqBase {

    @observable warehouse: any;
    readyOutBoundList: any[];
    outBoundOrderDetail: any[];

    async internalStart(param: any) {

        this.openVPage(VOutBound);
    }

    // 出库任务处理界面
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

        this.warehouse = warehouse;
        if (warehouse !== undefined) {
            let outBoundOrderList = await this.uqs.warehouse.SearchOutBoundOrderList.table({ warehouse: warehouse.id });
            this.openVPage(VOutBoundOrderHistory, outBoundOrderList);
        }
    }

    // 打开出库单详情界面
    openOutBoundOrderDetailPage = async (outBoundOrderId: any) => {

        let outBoundOrderDetail = await this.uqs.warehouse.SearchOutBoundOrderDetail.table({ outBoundOrder: outBoundOrderId });
        let outBoundOrderInfo = { outBoundOrderId: outBoundOrderId, outBoundOrderInfo: outBoundOrderDetail };
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

    // 打开打印发货单界面
    openDeliveryListPage = async (outBoundOrderInfo: any) => {

        let deliveryListInfo: any[] = [];
        let arrId: any[] = [];
        let outBoundOrderDetail = outBoundOrderInfo.outBoundOrderDetailInfo;

        // 把数据源根据临时理货号（托盘号）去重复，因为发货单是
        for (let index = 0; index < outBoundOrderDetail.length; index++) {
            if (arrId.indexOf(outBoundOrderDetail[index]['trayNumber']) == -1) {
                arrId.push(outBoundOrderDetail[index]['trayNumber']);
                deliveryListInfo.push(outBoundOrderDetail[index]);
            }
        }
        this.openVPage(VDeliveryList, { outBoundOrderId: outBoundOrderInfo.outBoundOrderId, deliveryListInfo: deliveryListInfo });
    }

    // 打开随货资料打印界面
    openAccompanyingGoodsInfo = async (outBoundOrderInfo: any) => {

        let accompanyingGoodsInfo: any[] = [];
        for (let index = 0; index < outBoundOrderInfo.outBoundOrderDetailInfo.length; index++) {
            if (!isUndefined(outBoundOrderInfo.outBoundOrderDetailInfo[index]['deliveryData'])) {
                accompanyingGoodsInfo.push(outBoundOrderInfo.outBoundOrderDetailInfo[index]);
            }
        }

        this.openVPage(VAccompanyingGoodsInfo, { outBoundOrderId: outBoundOrderInfo.outBoundOrderId, accompanyingGoodsInfo: accompanyingGoodsInfo });
    }

    // 查询产品扩展信息
    getProductExtention = (productId: number): Promise<any> => {
        let result: any = this.uqs.product.ProductExtention.obj({ product: productId });
        return result;
    }

}