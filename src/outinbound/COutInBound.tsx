import { CUqBase } from '../CBase';
import { VOutInBound } from './index';
import { VWarehouseListDataSouce } from './VWarehouseListDataSouce';
import { VReadyOutBoundCut } from './outbound/VReadyOutBoundCut';
import { COutBound, VOutBound } from './outbound';

export class COutInBound extends CUqBase {

    warehouse: any;
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
        this.openVPage(VWarehouseListDataSouce);
    }

    // 选中库房执行
    selectedWarehouse = async (warehouse: any) => {

        this.warehouse = warehouse;
        this.closePage(1);
        //this.tab();
        //this.newC(COutInBound);
        this.openVPage(VOutInBound);

    }

    /**
     * 查询库房待截单任务列表
     * @param key 
     */
    searchReadyOutBoundCutTastList = async () => {
        if (this.warehouse !== undefined) {
            this.readyOutBoundList = await this.uqs.warehouse.SearchReadyOutBoundCutTastList.table({ warehouse: this.warehouse.id });
            this.openVPage(VReadyOutBoundCut, this.readyOutBoundList);
        }
    }

    tab = () => this.renderView(VOutInBound);
}