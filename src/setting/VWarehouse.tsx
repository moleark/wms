
import * as React from 'react';
import { Page, View } from 'tonva';
import { CWarehouse } from './CWarehouse';
export class VWarehouse extends View<CWarehouse> {

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
            <div>库房管理界面！</div>
        </>
    };
}