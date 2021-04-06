import { observer } from 'mobx-react';
import * as React from 'react';
import { VPage, Page, List, FA, LMR, tv, EasyTime } from 'tonva';
import { COutBound } from "./COutBound";
import { VOutBoundOrderDetail } from "./VOutBoundOrderDetail";

export class VOutBoundOrderHistory extends VPage<COutBound> {

    outBoundOrderList: any;
    async open(outBoundOrderList: any) {
        this.outBoundOrderList = outBoundOrderList;
        this.openPage(this.page);
    }

    public openOutBoundOrderDetailVPage = async (id: any) => {
        //this.openVPage(VOutBoundOrderDetail, outBoundOrderId);
        alert(id);
        this.controller.openOutBoundOrderDetailPage(id);
    }

    private renderOutBoundOrder(outBoundOrder: any) {

        let { $id, id, warehouse, operator, state, createTime } = outBoundOrder;
        let isConfirm = (state == 0) ? '未确认' : '已确认';

        return <div className="row d-flex px-2 py-1">
            <div className="col-12">
                <div className="row">

                    <div className="col-5" onClick={() => this.openOutBoundOrderDetailVPage(id)}>出库单号：<strong>{id}</strong></div>
                    <div className="col-1" ></div>
                    <div className="col-6">{tv(warehouse, v => <>{v.name}</>)}</div>
                </div>
                <div className="row py-1">
                    <div className="col-3 text-muted">
                        {isConfirm}
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <strong>{tv(operator, v => <>{v.name}</>)}</strong>
                            <div className="col-8"><EasyTime date={createTime} /></div>
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