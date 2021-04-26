import * as React from 'react';
import { observer } from 'mobx-react';
import { List, Page, VPage, tv, FA } from 'tonva';
import { COutBound } from './COutBound';
import printJS from 'print-js';

export class VTallyList extends VPage<COutBound> {

    outBoundOrderInfo: any[];
    outBoundOrderId: any;
    tempCount: number = 0;            // 循环控制数据明细列表，默认为0
    firstTempheight: number = 0;      // 首页动态数据要显示的高度
    nextTempheight: number = 0;       // 下一页动态数据要显示的高度
    pageHeight: number = window.innerHeight;    // 当前页面显示高度

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

    // 打印页面
    private printPage = async () => {

        // size: portrait || landscape; 设置横纵向打印
        let style = '@page {size:landscape}' + '@media print {'
            + `main *{box-sizing:border-box}.printPage{width:100%;page-break-before:auto;page-break-after:always;background-color:white}
            .header{width:100%;height:50px;padding:1px;background-color:white}.hLeft{width:18%;float:left;text-align:left;padding-left:1px}
            .hLeft img{height:50px;width:50px}.hcenter{width:40%;float:left;text-align:right;font-weight:bold;font-size:28px;padding-top:5px}
            .hright{width:30%;float:right}.hright ul{list-style-type:none;padding-top:2px}.hright ul li{height:30px;line-height:30px}
            .title{width:100%;background-color:white;text-align:center;font-size:16px}.title table{width:100%}.title tbody{width:100%}
            .th-1{width:15mm;padding:0;text-align:left}.th-2{width:35mm;text-align:left}.th-3{width:35mm;text-align:left}
            .th-4{width:30mm;text-align:left}.th-5{width:30mm;text-align:left}.th-6{width:20mm;text-align:left}.th-7{width:35mm;text-align:center}
            .itemList{width:100%;padding-top:1px;background-color:white}.itemList ul{display:block;list-style-type:disc;margin-block-start:.1em;margin-block-end:1em;margin-inline-start:0;margin-inline-end:0;padding-inline-start:40px;border-bottom:1px solid #000}
            .itemList ul.va-list{list-style:none;padding:0;margin-bottom:15px}.itemList ul.va-list li{display:flex;flex-direction:row;flex-wrap:nowrap;height:26px;line-height:26px;border-bottom:1px solid #000}
            .item{width:100%;height:auto;background-color:white;display:flex;padding:1px;font-family:Arial,Helvetica,sans-serif;font-size:15px}
            .item-1{width:12mm;text-align:left}.item-2{width:50mm;text-align:left}.item-3{width:45mm;text-align:left}
            .item-4{width:40mm;text-align:left}.item-5{width:40mm;text-align:left}.item-6{width:20mm;text-align:left}
            .item-7{width:40mm;text-align:left}.footer{width:100%;height:30px;line-height:30px;text-align:left;background-color:white}
            .footerDiv{float:right}.footerDiv ul{list-style-type:none;margin:1}.footerDiv ul li{float:left}.footerDiv span{width:100px;border-bottom:1px solid Black;padding:10px 110px 10px 10px}`
            + '}';
        let focuser = setInterval(() => window.dispatchEvent(new Event('focus')), 500);

        printJS({
            printable: 'tallyListPage', // 要打印内容的id
            type: 'html',               // 可以打印html,img详细的可以在官方文档https://printjs.crabbly.com/中查询
            scanStyles: false,          // 不适用默认样式
            style: style,               // 亦可使用引入的外部css;
            documentTitle: '',
            onPrintDialogClose: () => { clearInterval(focuser); this.backPage(); }  //取消打印回调
        });
    }

    private page = observer(() => {

        let topDiv = <div className="row d-flex px-1 py-1">
            <div className="col-4 text-left"><span>{this.outBoundOrderId}</span></div>
            <div className="col-4 text-left"><span>现货理货单</span><span className="bb-1"></span></div>
            <div className="col-4 text-left"><span>经手人：</span></div>
        </div>

        let titleDiv = <div className="row d-flex px-1 py-1">
            <div className="col-12">
                <div className="row">
                    <div className="text-left col-1"><span><strong>产品编号</strong></span></div>
                    <div className="text-left col-1"><span><strong>Lot号</strong></span></div>
                    <div className="text-left col-1"><span><strong>包装</strong></span></div>
                    <div className="text-center col-1"><span><strong>瓶数</strong></span></div>
                    <div className="text-center col-1"><span><strong>理货号</strong></span></div>
                    <div className="text-center col-2"><span><strong>储藏条件</strong></span></div>
                    <div className="text-center col-2"><span><strong>订货人单位名</strong></span></div>
                    <div className="text-center col-1"><span><strong>收货人</strong></span></div>
                    <div className="text-center col-2"><span><strong>英文名</strong></span></div>
                </div>
            </div>
        </div>

        let dataListDiv = <List items={this.outBoundOrderInfo} item={{ render: this.renderOutBoundOrderDetail }} none="无出库单数据" />

        let footerDiv = <div className="text-center small py-2"><span><strong>精准+细致是百灵威人的行为准则</strong></span></div>

        let right = <div className="d-flex justify-content-between mr-1 my-2" onClick={() => this.printPage()}>
            <span className="p-1"><FA className="mr-1 cursor-pointer text-info" name="print" /></span>
        </div>;

        return <Page header="理货单打印" right={right}>
            <div id="tallyListPage" className="printPage">
                {topDiv}
                {titleDiv}
                {dataListDiv}
                {footerDiv}
            </div>
        </Page >
    });
}

const tvPackx = (values: any) => {
    let { radiox, radioy, unit } = values;
    if (radiox !== 1) return <>{radiox} * {radioy}{unit}</>;
    return <>{radioy}{unit}</>;
}