import * as React from 'react';
import { observer } from 'mobx-react';
import { List, Page, VPage, tv } from 'tonva';
import { COutBound } from './COutBound';
import './OffShelfList.css';
import { conformsTo, forEach } from 'lodash';
import logo from 'images/logo.png';

export class VOffShelfList extends VPage<COutBound> {

    outBoundOrderInfo: any[];
    outBoundOrderId: any;
    async open(outBoundOrderInfo?: any) {
        this.outBoundOrderInfo = outBoundOrderInfo.outBoundOrderDetailInfo;
        this.outBoundOrderId = outBoundOrderInfo.outBoundOrderId;
        // document.title = "出库单号：" + this.outBoundOrderId;
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
                    <div className="col-1"><strong>{trayNumber}</strong></div>
                    <div className="col-2">{tv(shelfBlock, (values: any) => <>{values.no}</>)}</div>
                    <div className="col-2">{tv(product, (values: any) => <>{values.origin}</>)}</div>
                    <div className="col-2">{lot}</div>
                    <div className="col-1">{tv(pack, (values: any) => <>{tvPackx(values)}</>)}</div>
                    <div className="col-1">{quantity}</div>
                    <div className="col-3">{unitName}</div>
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

        //alert(window.innerHeight);
        let pageHeight = window.innerHeight;

        let headerDiv = <div style={{ background: "white" }}>
            <div className="row col-12 header dvH px-1 py-1" id="topTitle">
                <div className="hLeft dvH col-4">
                    <img src={logo} alt="Logo" style={{ width: "45px", height: "45px" }} />
                </div>
                <div className="hcenter dvH col-4">
                    <h2>百灵威出库单</h2>
                </div>
                <div className="hright dvH col-4">
                    <ul>
                        <li>出库单号： {this.outBoundOrderId}</li>
                    </ul>
                </div>
            </div >
        </div>;


        return <body className="printPage">
            {headerDiv}
            <div className="row d-flex px-1 py-1" style={{ background: "white" }} >
                <div className="col-12">
                    <div className="row">
                        <div className="text-left col-1"><span><strong>理货号</strong></span></div>
                        <div className="text-left col-2"><span><strong>货架号</strong></span></div>
                        <div className="text-left col-2"><span><strong>产品</strong></span></div>
                        <div className="text-center col-2"><span><strong>Lot</strong></span></div>
                        <div className="text-center col-1"><span><strong>包装</strong></span></div>
                        <div className="text-center col-1"><span><strong>出库量</strong></span></div>
                        <div className="text-center col-3"><span><strong>单位</strong> <span onClick={() => this.closeThisPage()}>×</span></span></div>
                    </div>
                </div>
            </div>
            {outBoundOrderDetail}
        </body >
    });
}

const tvPackx = (values: any) => {
    let { radiox, radioy, unit } = values;
    if (radiox !== 1) return <>{radiox} * {radioy}{unit}</>;
    return <>{radioy}{unit}</>;
}