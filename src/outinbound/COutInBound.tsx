import { CUqBase } from '../CBase';
import { VOutInBound } from './index';
import { VWarehouseListDataSouce } from './VWarehouseListDataSouce';
import { observable } from 'mobx';

export class COutInBound extends CUqBase {

    @observable warehouse: any;
    readyOutBoundList: any[];

    async internalStart(param: any) {

        this.renderView(VOutInBound);
    }

    /**
     * 查询库房列表数据源
     */
    searchWarehouseList = async () => {

        let cSlectWarehouse = this.newC(CSlectWarehouse);
        this.warehouse = await cSlectWarehouse.call<any>(true);
    }

    /**
     * 查询库房待截单任务列表
     * @param key 
     */
    searchReadyOutBoundCutTastList = async () => {

        let { cOutBound } = this.cApp
        await cOutBound.openReadyOutBoundCutPage(this.warehouse);
        // if (this.warehouse !== undefined) {
        //     this.readyOutBoundList = await this.uqs.warehouse.SearchReadyOutBoundCutTastList.table({ warehouse: this.warehouse.id });
        //     let outBoundList: any = { readyOutBoundList: this.readyOutBoundList, warehouse: this.warehouse };
        //     // this.openVPage(VReadyOutBoundCut, outBoundList);
        //     let cOutBound = this.newC(COutBound);
        //     await cOutBound.showReadyOutBoundPage(outBoundList);
        // }
    }

    /**
     * 打开出库单历史界面
     */
    openOutBoundOrderHistory = async () => {

        let { cOutBound } = this.cApp
        await cOutBound.openOutBoundOrderHistoryPage(this.warehouse);
    }
    tab = () => this.renderView(VOutInBound);
}

/**
 * 选择库房
 */
export class CSlectWarehouse extends CUqBase {
    async internalStart(fromOrderCreation: boolean) {

        this.openVPage(VWarehouseListDataSouce);
    }

    /**
     * 查询所有库房列表
     * @returns 返回库房列表
     */
    loadWarehouseList = async () => {

        return await this.uqs.warehouse.GetValidWarehouseList.table({ key: '' });
    }

    /**
     * 选择库房
     * @param warehouse 库房
     */
    selectedWarehouse = async (warehouse: any) => {

        this.backPage();
        this.returnCall(warehouse);
    }

}