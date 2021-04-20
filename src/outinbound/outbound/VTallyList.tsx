import * as React from 'react';
import { observer } from 'mobx-react';
import { List, Page, VPage, tv } from 'tonva';
import { COutBound } from './COutBound';
import { forEach } from 'lodash';

export class VTallyList extends VPage<COutBound> {

    outBoundOrderInfo: any[];
    outBoundOrderId: any;
    async open(outBoundOrderInfo?: any) {
        this.outBoundOrderInfo = outBoundOrderInfo.outBoundOrderDetailInfo;
        this.outBoundOrderId = outBoundOrderInfo.outBoundOrderId;
        document.title = "出库单号：" + this.outBoundOrderId;
        this.openPage(this.page);
    }


    private renderOutBoundOrderDetail = (outBoundOrderDetail: any) => {

        let { $id, coaQuantity, consigneeAddress, consigneeMobile, consigneeName, consigneeTelphone, consigneeUnitName, consigneeZipcode, currency, expressLogistics,
            isAppointLot, isNeedDelivery, msdsQuantity, needInsuredWhenDelivery, outBoundOrder, outBoundReason, pack, product, purchaseBillQuantity, quantity,
            receiptQuantity, deliveryData, relationId, shelfBlock, showPriceWhenPrintReceipt, trayNumber, unitPrice, warehouse, deliveryNotes, lot } = outBoundOrderDetail;

        let unitName = (consigneeUnitName.length > 10) ? consigneeUnitName.substr(0, 10) : consigneeUnitName;

        return <div className="row d-flex px-1 py-1">
            <div className="col-12">
                <div className="row">
                    <div className="col-1">{tv(product, (values: any) => <>{values.origin}</>)}</div>
                    <div className="col-1">{lot}</div>
                    <div className="col-1">{tv(pack, (values: any) => <>{tvPackx(values)}</>)}</div>
                    <div className="col-1">{quantity}</div>
                    <div className="col-1"><strong>{trayNumber}</strong></div>
                    <div className="col-1"></div>
                    <div className="col-2">{unitName}</div>
                    <div className="col-1">{consigneeName}</div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    };

    private closeThisPage() {
        document.title = "库房管理系统";
        this.controller.backPage();
    }

    private page = observer(() => {

        let outBoundOrderDetail = <List items={this.outBoundOrderInfo} item={{ render: this.renderOutBoundOrderDetail }} none="无出库单数据" />;
        return <Page header={false}>
            <div className="row d-flex px-1 py-1">
                <div className="col-4 text-left"><span>{this.outBoundOrderId}</span></div>
                <div className="col-4 text-left"><span>现货理货单</span><span className="bb-1"></span></div>
                <div className="col-4 text-left"><span>经手人：</span></div>
            </div>
            <div className="row d-flex px-1 py-1">
                <div className="col-12">
                    <div className="row">
                        <div className="text-left col-1"><span><strong>产品编号</strong></span></div>
                        <div className="text-left col-1"><span><strong>Lot号</strong></span></div>
                        <div className="text-left col-1"><span><strong>包装</strong></span></div>
                        <div className="text-center col-1"><span><strong>瓶数</strong></span></div>
                        <div className="text-center col-1"><span><strong>理货号</strong></span></div>
                        <div className="text-center col-1"><span><strong>储藏条件</strong></span></div>
                        <div className="text-center col-2"><span><strong>订货人单位名</strong></span></div>
                        <div className="text-center col-1"><span><strong>收货人</strong></span></div>
                        <div className="text-center col-2"><span><strong>英文名</strong></span></div>
                        <div className="text-right col-1 cursor-pointer"><span onClick={() => this.closeThisPage()}>×</span></div>
                    </div>
                </div>
            </div>
            <div>{outBoundOrderDetail}</div>
            <div className="text-center small py-2"><span><strong>精准+细致是百灵威人的行为准则</strong></span></div>
        </Page >
    });
}

const tvPackx = (values: any) => {
    let { radiox, radioy, unit } = values;
    if (radiox !== 1) return <>{radiox} * {radioy}{unit}</>;
    return <>{radioy}{unit}</>;
}