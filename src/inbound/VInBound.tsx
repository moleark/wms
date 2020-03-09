import * as React from 'react';
import { Page, View } from 'tonva';
import { CInBound } from './CInBound';
export class VInBound extends View<CInBound> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private page = () => {
        return <Page header={false}>
            <this.content />
        </Page>;
    };

    private content = () => {
        return <>
            <div>这是入库操作界面！</div>
        </>
    };
}