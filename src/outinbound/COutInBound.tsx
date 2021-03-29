import { CUqBase } from '../CBase';
import { VOutInBound } from './index';
import { VWarehouseListDataSouce } from './VWarehouseListDataSouce';
import { VReadyOutBoundCut } from './outbound/VReadyOutBoundCut';
import { COutBound, VOutBound } from './outbound';
import { observable } from 'mobx';

export class COutInBound extends CUqBase {

    @observable warehouse: any;
    readyOutBoundList: any[];

    async internalStart(param: any) {

        this.renderView(VOutInBound);
    }

    // 查询所有库房列表
    loadWarehouseList = async () => {
        return await this.uqs.warehouse.Warehouse.all();
    }

    // 查询库房列表数据源
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
        await cOutBound.showReadyOutBoundPage(this.warehouse);
        // if (this.warehouse !== undefined) {
        //     this.readyOutBoundList = await this.uqs.warehouse.SearchReadyOutBoundCutTastList.table({ warehouse: this.warehouse.id });
        //     let outBoundList: any = { readyOutBoundList: this.readyOutBoundList, warehouse: this.warehouse };
        //     // this.openVPage(VReadyOutBoundCut, outBoundList);
        //     let cOutBound = this.newC(COutBound);
        //     await cOutBound.showReadyOutBoundPage(outBoundList);
        // }
    }

    tab = () => this.renderView(VOutInBound);
}

export class CSlectWarehouse extends CUqBase {

    async internalStart(fromOrderCreation: boolean/*contactType: ContactType*/) {
        this.openVPage(VWarehouseListDataSouce);
    }

    // 查询所有库房列表
    loadWarehouseList = async () => {
        return await this.uqs.warehouse.Warehouse.all();
    }

    // 选中库房执行
    selectedWarehouse = async (warehouse: any) => {
        this.backPage();
        this.returnCall(warehouse);
    }

}