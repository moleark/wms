
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VShelfBlockList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private renderShelfBlock = (shelfBlock: any) => {

        let { name } = shelfBlock;
        let { editShelfBlock } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="inbox" />
        </div>
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => editShelfBlock(shelfBlock)}>
            <FA name="edit" />
        </div>
        return <LMR left={left} right={right} className="px-3 py-2" >
            <div className="px-1 py-1">
                {name}
            </div>
        </ LMR>
    };

    private page = () => {

        let { currentShelfLayer, shelfBlocks, searchShelfBlockByKey, newShelfBlock } = this.controller;
        let { name: shelfLayerName } = currentShelfLayer;

        let header = <header>
            <div className="px-0"><span>{shelfLayerName}货位管理</span></div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfBlockByKey(currentShelfLayer, key)}
                placeholder="请输入货位名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newShelfBlock()}>添加新货位</button>;
        let shelfBlockList = <List items={shelfBlocks} item={{ render: this.renderShelfBlock }} none="无货位" />;

        return <Page header={header} right={right} footer={footer}>
            {shelfBlockList}
        </Page>;
    };
}