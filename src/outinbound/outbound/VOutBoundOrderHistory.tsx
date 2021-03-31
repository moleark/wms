import { observer } from 'mobx-react';
import * as React from 'react';
import { VPage, Page, List, FA, LMR, tv } from 'tonva';
import { COutBound } from "./COutBound";

export class VOutBoundOrderHistory extends VPage<COutBound> {

    outBoundOrderList: any;

    async open(outBoundOrderList: any) {
        this.outBoundOrderList = outBoundOrderList;
        this.openPage(this.page);
    }

    private renderOutBoundOrder(outBoundOrderList: any) {

        let { $id, id, warehouse, operator, state, createTime } = outBoundOrderList;

        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="building-o" />
        </div>
        let right = <div className="p-1 cursor-pointer text-info" onClick={() => undefined}>
            <FA name="edit" />
        </div>

        return <div className="row d-flex px-2 py-1">
            <div className="col-12">
                <div className="row">
                    <div className="col-1 text-muted"><strong>{$id}</strong></div>
                    <div className="col-7" onClick={() => undefined}>出库单号：<strong>{id}</strong></div>
                    <div className="col-4">{tv(warehouse, v => <>{v.name}</>)}</div>
                </div>
                <div className="row py-1">
                    <div className="col-3 text-muted">
                        <span className="px-1">{state}</span>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <strong>{tv(operator, v => <>{v.name}</>)}</strong>
                            <div className="col-8">{tv(createTime)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    private page = observer(() => {

        let header = <header>
            <div className="px-0"><span>出库单列表</span></div>
        </header>;

        let outBoundOrderLists = <List items={this.outBoundOrderList} item={{ render: this.renderOutBoundOrder }} none="无出库单数据" />;

        return <Page header={header} back="close">
            {outBoundOrderLists}
        </Page>
    });
}