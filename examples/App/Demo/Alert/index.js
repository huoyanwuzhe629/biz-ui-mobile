import * as React from 'react';
import {px2rem} from '@bizfe/biz-mobile-ui/build/util/util';
import {
    Button,
    Alert,
    Icon
} from '@bizfe/biz-mobile-ui';

const styles = {
    button: {
        marginTop: px2rem(10),
    }
}
export default class AlertDemo extends React.Component {
    constructor(props) {
        super(props);
    }

    showAlertWithTwoBtn(index, value) {
        Alert.alert({title: '提示', message: value, buttons: [{text: '取消', color: 'grey'}, {text: '确定'}]});
    }

    showAlertWithThreeBtn() {
        Alert.alert({
         title: '更新提示',
         message:<span>修改若干bug<br/>快去更新!</span>,
         buttons: [{text: '取消'}, {text: '确定'}, {text: '吐槽', color: 'red'}]
         });
    }

    showAlertConfirm() {
        Alert.prompt({title: '请输入用户名', defaultValue: '老王', onTouchTap: this.showAlertWithTwoBtn});
    }

    render() {

        return (
            <div style={{padding: px2rem(10)}}>
                <Button style={styles.button} onTouchTap={()=>this.showAlertWithTwoBtn(1,'确认添加账户?')}
                        size="small"><Icon fixedWidth={true}
                                           type="user-plus"/>showAlertWithTwoBtn</Button>
                <Button style={styles.button} onTouchTap={this.showAlertConfirm} disabled={true}
                        size="small">showAlertConfirm</Button><br/>
                <Button style={styles.button} onTouchTap={this.showAlertWithThreeBtn}>showAlert with three button</Button>
                <Button style={styles.button} onTouchTap={this.showAlertConfirm.bind(this)}>showAlertConfirm</Button>
            </div>
        );
    }
}

