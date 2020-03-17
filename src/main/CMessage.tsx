import { Query, PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VMessage } from './VMessage';
import { observable } from 'mobx';

export class CMessage extends CUqBase {

    count = observable.box<number>(0);

    //初始化
    protected async internalStart(param: any) {
        //this.pageMessage = null;
        await this.showMessage();
    }

    //库房预警消息
    showMessage = async () => {
        // this.openVPage(VMessage, this.pageMessage);
    }

}