import { observer } from 'mobx-react';
import * as React from 'react';
import { VPage, Page, List, tv } from 'tonva';
import { COutBound } from "./COutBound";
import logo from 'images/logo.png';
import Printjs from 'print-js';
import './OffShelfList.css';

document.title = "库房管理系统";

export class VOutBoundOrderDetail extends VPage<COutBound> {

    outBoundOrderDetailInfo: any[];
    async open(outBoundOrderDetail: any) {
        this.outBoundOrderDetailInfo = outBoundOrderDetail;
        this.openPage(this.page);
    }

    private renderOutBoundOrderDetail = (outBoundOrderDetail: any) => {

        let { $id, coaQuantity, consigneeAddress, consigneeMobile, consigneeName, consigneeTelphone, consigneeUnitName, consigneeZipcode, currency, expressLogistics,
            isAppointLot, isNeedDelivery, msdsQuantity, needInsuredWhenDelivery, outBoundOrder, outBoundReason, pack, product, purchaseBillQuantity, quantity,
            receiptQuantity, deliveryData, relationId, shelfBlock, showPriceWhenPrintReceipt, trayNumber, unitPrice, warehouse, deliveryNotes } = outBoundOrderDetail;

        return <div className="row d-flex px-1 py-1">
            <div className="col-12">
                <div className="row py-1">
                    <div className="col-3 text-muted pr-0">产品编号：</div>
                    <div className="col-4 pl-0"><strong>{tv(product, (values: any) => <>{values.origin}</>)}</strong></div>
                    <div className="col-2 text-muted pr-0">包装：</div>
                    <div className="col-3 pl-0"><strong>{tv(pack, (values: any) => <>{tvPackx(values)}</>)}</strong></div>
                </div>

                <div className="row py-1">

                    <div className="col-3 text-muted pr-0">收货人：</div>
                    <div className="col-4 pl-0"><strong>{consigneeName}</strong></div>
                    <div className="col-2 text-muted pr-0">数量：</div>
                    <div className="col-3 pl-0"><strong>{quantity}</strong></div>
                </div>

                <div className="row py-1">
                    {item('收货单位', consigneeUnitName)}
                </div>

                <div className="row py-1">
                    {item('收货地址', consigneeAddress)}
                </div>

                <div className="row py-1">
                    {item('随货资料', deliveryData)}
                </div>

                <div className="row py-1">
                    {item('发货备注', deliveryNotes)}
                </div>
            </div>
        </div>
    };

    private renderPrintShelfListPage = (outBoundOrderDetail: any) => {

        let { $id, coaQuantity, consigneeAddress, consigneeMobile, consigneeName, consigneeTelphone, consigneeUnitName, consigneeZipcode, currency, expressLogistics,
            isAppointLot, isNeedDelivery, msdsQuantity, needInsuredWhenDelivery, outBoundOrder, outBoundReason, pack, product, purchaseBillQuantity, quantity,
            receiptQuantity, deliveryData, relationId, shelfBlock, showPriceWhenPrintReceipt, trayNumber, unitPrice, warehouse, deliveryNotes, lot } = outBoundOrderDetail;

        let unitName = (consigneeUnitName.length > 7) ? consigneeUnitName.substr(0, 7) : consigneeUnitName;

        return <div className="row d-block px-1 py-1">
            <div className="col-12">
                <div className="row">
                    <div className="text-left col-1"><strong>{trayNumber}</strong></div>
                    <div className="text-left col-3">{tv(shelfBlock, (values: any) => <>{values.no}</>)}</div>
                    <div className="text-left col-2">{tv(product, (values: any) => <>{values.origin}</>)}</div>
                    <div className="text-left col-2">{lot}</div>
                    <div className="text-left col-1">{tv(pack, (values: any) => <>{tvPackx(values)}</>)}</div>
                    <div className="text-left col-1">{quantity}</div>
                    <div className="text-left col-2">{unitName}</div>
                </div>
            </div>
        </div>
    };

    private printShelfListPage = () => {

        let outBoundOrderDetailForPrint = <List items={this.outBoundOrderDetailInfo} item={{ render: this.renderPrintShelfListPage }} none="无出库单数据" />;

        let shelfListPage = React.createElement(observer(() => {
            return <div id="printShelfListPage">
                <div className="px-1 py-1" style={{ background: "white" }}>
                    <div className="row col-12" id="topTitle">
                        <div className="col-4">
                            <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                        </div>
                        <div className="col-4">
                            <h2>百灵威出库单</h2>
                        </div>
                        <div className="col-4">
                            出库单号： {this.outBoundOrderDetailInfo[0].outBoundOrderId}
                        </div>
                    </div >
                </div>
                <div className="px-1 py-1" style={{ background: "white" }} >
                    <div className="col-12">
                        <div className="row">
                            <div className="text-center col-1"><span><strong>理货号</strong></span></div>
                            <div className="text-center col-3"><span><strong>货架号</strong></span></div>
                            <div className="text-center col-2"><span><strong>产品</strong></span></div>
                            <div className="text-center col-2"><span><strong>Lot</strong></span></div>
                            <div className="text-center col-1"><span><strong>包装</strong></span></div>
                            <div className="text-center col-1"><span><strong>出库量</strong></span></div>
                            <div className="text-center col-2"><span><strong>单位</strong></span></div>
                        </div>
                    </div>
                </div>
                {outBoundOrderDetailForPrint}
            </div>;
        }));

        alert(shelfListPage);

        alert(document.getElementById("printShelfListPage"));

        Printjs({
            printable: "printShelfListPage", //要打印内容的id 
            type: "html", //可以打印html,img详细的可以在官方文档https://printjs.crabbly.com/中查询
        });
    }

    private page = observer(() => {

        let header = <header>
            <div className="px-0"><span>出库单详情</span></div>
        </header>;
        let outBoundOrderDetail = <List items={this.outBoundOrderDetailInfo} item={{ render: this.renderOutBoundOrderDetail }} none="无出库单明细" />;
        let { openOffShelfListPage, openTallyListPage } = this.controller;
        let outBoundOrderInfo: any = { outBoundOrderId: this.outBoundOrderDetailInfo[0].outBoundOrder, outBoundOrderDetailInfo: this.outBoundOrderDetailInfo }

        let footer = <div className="row d-block px-1">
            <div className="row col-12" >
                <div className="col-3 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={() => this.printShelfListPage()} >出库单</button>
                </div>
                <div className="col-3 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={() => openTallyListPage(outBoundOrderInfo)} >理货单</button>
                </div>
                <div className="col-3 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={undefined} >发货单</button>
                </div>
                <div className="col-3 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={undefined} >随货资料</button>
                </div>
            </div>

            <div className="row col-12" >
                <div className="col-6 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={undefined}>送货服务回执</button>
                </div>
                <div className="col-6 px-1">
                    <button type="button" className="w-100 btn btn-primary align-self-center px-1" onClick={undefined}>非送货服务回执</button>
                </div>
            </div>
        </div>;

        // let outBoundOrderDetailForPrint = <List items={this.outBoundOrderDetailInfo} item={{ render: this.renderPrintShelfListPage }} none="无出库单数据" />;

        return <Page header={header} footer={footer}>
            <div id="outBoundOrderDetails" className="d-block">
                {outBoundOrderDetail}
            </div>
            <div id="printShelfListPage2" className="d-block printPage">

            </div >

        </Page>
    });
}

const tvPackx = (values: any) => {
    let { radiox, radioy, unit } = values;
    if (radiox !== 1) return <>{radiox} * {radioy}{unit}</>;
    return <>{radioy}{unit}</>;
}

function item(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-3 text-muted pr-0">{caption}：</div>
        <div className="col-9 pl-0"><strong>{value}</strong></div>
    </>;
}
