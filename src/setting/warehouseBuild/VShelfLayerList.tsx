
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VShelfLayerList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }


    private renderShelflayer = (shelfLayer: any) => {

        let { id, name, no: number } = shelfLayer;
        let { searchShelfBlockByKey, editShelfLayer } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="server" />
        </div>
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => editShelfLayer(shelfLayer)}>
            <FA name="edit" />
        </div>
        return <LMR left={left} right={right} className="px-3 py-2">
            <div className="px-1 py-1" onClick={() => searchShelfBlockByKey(shelfLayer)}>
                {name}
            </div>
        </ LMR>
    };

    private page = () => {

        let { currentShelf, shelfLayers, searchShelfLayerByKey, newShelfLayer } = this.controller;
        let { name: shelfName, no: shelfNumber } = currentShelf;

        let header = <header>
            <div className="px-0"><span>{shelfName}层管理</span></div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfLayerByKey(currentShelf, key)}
                placeholder="请输入货架层名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newShelfLayer()} >添加新货架层</button>;
        let shelfLayerList = <List items={shelfLayers} item={{ render: this.renderShelflayer }} none="无货架层" />;

        return <Page header={header} right={right} footer={footer}>
            {shelfLayerList}
        </Page>;
    };
}