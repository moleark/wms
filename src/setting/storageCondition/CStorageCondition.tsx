import { CUqBase } from '../../CBase';
import { VStorageConditionList, VStorageCondition, VStorageConditionDataSource } from './index';
import { BoxId } from 'tonva';


export class CStorageCondition extends CUqBase {

    storageConditions: any[];
    storageConditionMaps: any[] = [];

    async internalStart() {

        this.searchStorageConditionList();
    }

    /**
     * 查询库房存储条件列表
     * @param key
     */
    searchStorageConditionList = async () => {

        this.storageConditions = await this.uqs.warehouse.WarehouseStorageCondition.all();
        this.openVPage(VStorageConditionList);
    };

    /**
     * 打开存储条件新建界面
     */
    newStorageCondition = async () => {
        this.openVPage(VStorageCondition);
    }

    /**
     * 打开库房存储条件编辑界面
    */
    editStorageCondition = async (warehouseStorageCondition: BoxId) => {

        let storageConditionId = warehouseStorageCondition.id;
        let storageConditionData = await this.uqs.warehouse.WarehouseStorageCondition.load(storageConditionId);
        await this.searchStorageConditionMap(storageConditionData);
        this.openVPage(VStorageCondition, storageConditionData);
    }

    /**
     * 修改存储条件信息
     * @param warehouse 库房
     */
    saveStorageCondition = async (storageConditionId: any, storageCondition: any) => {

        let { WarehouseStorageCondition: storageConditionTuid } = this.uqs.warehouse;
        await storageConditionTuid.save(storageConditionId, storageCondition);

        this.closePage(2);
        this.searchStorageConditionList();
    }


    /**
     * 查询库房存储条件跟研发部门维护储存条件的对应关系
     * @param warehouseStorageCondition 库房存储条件
     */
    searchStorageConditionMap = async (warehouseStorageCondition: any) => {

        let warehouseStorageConditionId = warehouseStorageCondition.id;
        let storageConditionMap: any = await this.uqs.warehouse.WarehouseStorageConditionMap.table({ warehouseStorageCondition: warehouseStorageConditionId });

        this.storageConditionMaps = [];
        for (let index = 0; index < storageConditionMap.length; index++) {

            let storageConditionId = storageConditionMap[index].storageCondition.id;
            let storageCondition = await this.uqs.warehouse.StorageCondition.load(storageConditionId);
            this.storageConditionMaps.push(storageCondition);
        }
    }

    /**
     * 添加库房存储条件对应关系
     * @param warehouseStorageCondition 库房存储条件
     * @param storageConditionId 研发部维护的存储条件
     */
    addStorageConditionMap = async (warehouseStorageCondition: any, storageConditionId: any) => {

        await this.uqs.warehouse.WarehouseStorageConditionMap.add({ warehouseStorageCondition: warehouseStorageCondition.id, arr1: [{ storageCondition: storageConditionId }] });
        this.closePage(2);
        this.editStorageCondition(warehouseStorageCondition);
    }

    /**
     * 查询存储条件
     * @param warehouseStorageCondition 库房存储条件
     */
    selectStorageCondition = async (warehouseStorageCondition: any) => {

        this.openVPage(VStorageConditionDataSource, warehouseStorageCondition);
    }

    /**
     * 删除库房存储条件
     * @param warehouseStorageCondition 库房存储条件
     * @param storageConditionId 研发部门维护的存储条件
     */
    deleteStorageConditionMap = async (warehouseStorageCondition: any, storageConditionId: any) => {

        await this.uqs.warehouse.WarehouseStorageConditionMap.del({ warehouseStorageCondition: warehouseStorageCondition.id, arr1: [{ storageCondition: storageConditionId }] });
        this.backPage();
        this.editStorageCondition(warehouseStorageCondition);
    }

    /**
     * 加载存储条件（研发部门维护的存储条件非库房存储条件）
     * @returns 存储条件列表
     */
    loadStorageCondition = async () => {

        return await this.uqs.warehouse.StorageCondition.all();
    }

}