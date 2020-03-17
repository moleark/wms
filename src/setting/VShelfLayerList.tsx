
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VShelfLayerList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private page = () => {

        let { shelfLayers, searchShelfLayerByKey, currentShelf } = this.controller;

        let header = <header>
            <div className="px-0">货架层查询</div>
        </header>;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfLayerByKey(currentShelf, key)}
                placeholder="请输入货架层名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100" >添加新货架层</button>;
        let warehouseBuildList = <List items={shelfLayers} item={{ render: this.onWarehouseRender }} none="无货架层" />;
        return <Page header={header} right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { id, name, no: number } = warehouseBuild;
        let { searchShelfBlockByKey } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => searchShelfBlockByKey(id)}>
            <div>
                {number}: {name}
            </div>
        </ LMR>
    };

}