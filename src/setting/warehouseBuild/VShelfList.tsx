
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VShelfList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private renderShelf = (shelf: any) => {

        let { id, name, no: number } = shelf;
        let { searchShelfLayerByKey, editShelf } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="clone" />
        </div>
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => editShelf(shelf)}>
            <FA name="edit" />
        </div>
        return <LMR left={left} right={right} className="px-3 py-2">
            <div className="px-1 py-1" onClick={() => searchShelfLayerByKey(shelf)}>
                {name}
            </div>
        </ LMR>
    };

    private page = () => {

        let { currentWarehouseRoom, shelfs, searchShelfByKey, newShelf } = this.controller;
        let { name: warehouseRoomName, no: warehouseRoomNumber } = currentWarehouseRoom;

        let header = <header>
            <div className="px-0"><span>{warehouseRoomName}货架管理</span></div>
        </header>;
        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfByKey(currentWarehouseRoom, key)}
                placeholder="请输入货架组名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newShelf()} >添加新货架组</button>;
        let shelfList = <List items={shelfs} item={{ render: this.renderShelf }} none="无货架组" />;

        return <Page header={header} right={right} footer={footer}>
            {shelfList}
        </Page>;
    };
}