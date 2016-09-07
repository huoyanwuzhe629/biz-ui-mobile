import * as React from 'react';
import * as classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
interface TabsPropType{
    prefixCls? : string,
    className? : string,
    selectedIndex? : number,
    onChange?: (x:number, y:number)=>void,
    onTabTouchTap?:(x:number, y:number)=>void,
    animation?: boolean,
    animateTransitions?: boolean,
    other?: any,
    tabsPosition?: string,
}

export default class Tabs extends React.Component<TabsPropType, any>{
    static defaultProps = {
        selectedIndex: 0,
        prefixCls: 'bm-tabs',
        className: '',
        onChange:()=>{},
        onTabTouchTap: ()=>{},
        animation: true,
        animateTransitions: false,
        tabsPosition: 'top',
    };
    state = {selectedIndex: 0};
    componentWillMount() {
        const initialIndex = this.props.selectedIndex;
        this.setState({
            selectedIndex: initialIndex < this.getTabCount() ? initialIndex : 0,
        });
    }
    componentWillReceiveProps(newProps) {
        if(newProps.selectedIndex !== undefined){
            this.setState({
                selectedIndex: newProps.selectedIndex
            })
        }
    }
    getTabCount() {
        return this.getTabs().length;
    }
    getTabs() {
        const tabs = [];
        React.Children.forEach(this.props.children, (tab) => {
            if (React.isValidElement(tab)) {
                tabs.push(tab);
            }
        });
        return tabs;
    }
    getContent(tab, index, prefixCls){
        const contentClass = classNames({
            [`${prefixCls}-content`]: true,
            [`${prefixCls}-content-hidden`]: index !== this.state.selectedIndex && !this.props.animation
        });
        if(tab.props.children){
            return (
                <div className={contentClass} key={index}>
                    {tab.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
    handleTabTouchTap = (index, tab) => {
        this.handleChange(index, this.state.selectedIndex);
        this.props.onTabTouchTap(index, this.state.selectedIndex);
    }
    handleChange = (index, fromIndex)=> {
        if(index !== fromIndex){
            this.props.onChange(index, fromIndex);
            this.setState({selectedIndex: index});
        }
    }
    render() {
        const {prefixCls, className, onChange, animation, animateTransitions, tabsPosition} = this.props;
        const tabsClass = classNames({
            [`${prefixCls}`]: true,
            [className]: true,
        });
        const contents = [];
        const tabs = this.getTabs().map((tab, index) => {
            contents.push(this.getContent(tab, index, prefixCls));
            return React.cloneElement(tab, {
                key: index,
                index: index,
                selected: this.state.selectedIndex === index,
                handleTabTouchTap: this.handleTabTouchTap
            });
        });
        const tabsContainer = <div className={`${prefixCls}-container`}>{tabs}</div>;
        return (
            <div className={tabsClass}>
                {tabsPosition === 'bottom'? null : tabsContainer}
                <div className={`${prefixCls}-content-container`}>
                    {animation ?
                        <SwipeableViews
                            index={this.state.selectedIndex}
                            onChangeIndex={this.handleChange}
                            animateTransitions={animateTransitions}
                        >
                            {contents}</SwipeableViews> : {contents}
                    }
                </div>
                {tabsPosition === 'bottom'? tabsContainer : null}
            </div>
        )
    }
}