import { observer } from 'mobx-react';
import * as React from 'react';
import { Page, VPage, FA, List, LMR, tv } from 'tonva';
import { COutBound } from './COutBound';

export class VReadyOutBoundCut extends VPage<COutBound> {

    readyOutBoundList: any[];

    async open(outBoundList: any) {
        let { readyOutBoundList, warehouse } = outBoundList;
        this.readyOutBoundList = readyOutBoundList;
        //this.controller.warehouse = warehouse;
        this.openPage(this.page);
    }

    private renderReadyOutBoundCut(readyOutBoundList: any) {

        let { $id, consigneeUnitName, consigneeName, product, pack, quantity, createTime, warehouse, outBoundReason } = readyOutBoundList;

        return <div className="row d-flex px-2 py-1">
            <div className="col-12">
                <div className="row small">
                    <div className="col-1 text-muted">{$id}</div>
                    <div className="col-8"><strong>{consigneeUnitName}</strong></div>
                    <div className="col-3"><strong>{consigneeName}</strong></div>
                </div>
                <div className="row py-1">
                    <div className="col-3 text-muted">
                        <span className="px-1">{tv(outBoundReason, (values: any) => <>{values.name}</>)}</span>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {tv(product, (values: any) => <>{item("产品编号", values.origin)}</>)}
                            {tv(pack, (values: any) => <>{item("包装", tvPackx(values))}</>)}
                            {item('数量', quantity)}
                            {item('创建时间', createTime)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    private page = observer(() => {

        let { outBoundCutOff } = this.controller;
        let header = <header>
            <div className="px-0"><span>待出库任务列表</span></div>
        </header>;

        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => outBoundCutOff()} >截单</button>;
        let tastList = <List items={this.readyOutBoundList} item={{ render: this.renderReadyOutBoundCut }} none="无待截单数据" />;

        return <Page header={header} footer={footer}>
            {tastList}
        </Page>
    });
};

const tvPackx = (values: any) => {
    let { radiox, radioy, unit } = values;
    if (radiox !== 1) return <>{radiox} * {radioy}{unit}</>;
    return <>{radioy}{unit}</>;
}

function item(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-4 text-muted pr-0">{caption}：</div>
        <div className="col-8">{value}</div>
    </>;
}