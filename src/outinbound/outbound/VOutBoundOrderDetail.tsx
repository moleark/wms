import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COutBound } from "./COutBound";

export class VOutBoundOrderInfo extends VPage<COutBound> {

    async open(outBoundOrderInfo: any) {
        this.openPage(this.page, outBoundOrderInfo);
    }

    private page = (outBoundOrderInfo: any) => {
        console.log(outBoundOrderInfo);
        return <Page header="出库单信息" back="close">
            {outBoundOrderInfo}
        </Page>
    }
}