import * as React from 'react';
import { Page, View } from 'tonva';
import { CHome } from './CHome';
export class VHome extends View<CHome> {

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
            <div>这是首页！</div>
        </>
    };
}