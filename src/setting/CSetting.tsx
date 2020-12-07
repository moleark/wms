import { CUqBase } from '../CBase';
import { VSetting } from './index';
import { CWarehouse } from './warehouseBuild/CWarehouse';
import { CStorageCondition } from './storageCondition/CStorageCondition';

export class CSetting extends CUqBase {

    protected async internalStart() {

        this.openVPage(VSetting);
    }

    /**
     public showSetting() {
        this.openVPage(VSetting);
    }
    tab = () => this.renderView(VSetting);
     */

    //打开库房管理界面
    public openWarehouseList = async () => {

        let cWarehouseList = this.newC(CWarehouse);
        await cWarehouseList.start();
    };

    // 打开存储条件管理界面
    public openStorageConditionList = async () => {

        let cStorageConditionList = this.newC(CStorageCondition);
        await cStorageConditionList.start();
    };
}