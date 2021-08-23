import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "btn": {
        "width": 100,
        "height": 40,
        "border": "1px solid red"
    },
    "mainContent": {
        "width": "100%",
        "height": "100%",
        "background": "#efeff4"
    },
    "bannerArea": {
        "marginBottom": 0.306667,
        "marginTop": 1.706667
    },
    "titleWrap": {
        "top": 0,
        "zIndex": 10,
        "width": 10,
        "background": "#f7f7f8",
        "position": "fixed"
    },
    "title1": {
        "width": "100%",
        "color": "#333",
        "textAlign": "center",
        "height": 1.706667,
        "fontSize": 0.453333,
        "paddingTop": 0.853333,
        "boxSizing": "border-box",
        "fontFamily": "'PingFang SC Semibold'"
    },
    "toBackBtn": {
        "left": 0,
        "bottom": 0,
        "color": "#333",
        "display": "flex",
        "width": 2.266667,
        "position": "absolute",
        "height": 1.306667,
        "alignItems": "center",
        "fontSize": 0.453333,
        "paddingLeft": 0.306667,
        "fontFamily": "'PingFang SC Regular'"
    },
    "m_back_arrow": {
        "width": 0.466667,
        "height": 0.56,
        "marginRight": 0.2
    },
    "trendWrap": {
        "background": "#fff"
    },
    "title2": {
        "color": "#222",
        "fontSize": 0.4,
        "background": "#fff",
        "height": 1.173333,
        "paddingLeft": 0.4,
        "lineHeight": 1.173333,
        "fontFamily": "'PingFang SC Regular'"
    },
    "line1": {
        "height": 0.013333,
        "background": "#c8c7cc"
    },
    "timeTab": {
        "display": "flex",
        "paddingTop": 0.4,
        "paddingRight": 0.4,
        "paddingBottom": 0.4,
        "paddingLeft": 0.4,
        "justifyContent": "center"
    },
    "imgWrap": {
        "display": "flex",
        "justifyContent": "center"
    },
    "margin21": {
        "marginBottom": 0.28
    },
    "tabCon": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "content",
        "background": "#efeff4"
    },
    "infoWrap": {
        "flex": 1,
        "paddingLeft": 0.4,
        "background": "#fff",
        "marginBottom": 1.6
    },
    "infoItem": {
        "display": "flex",
        "color": "#333",
        "fontSize": 0.373333,
        "borderBottom": "1px solid #dedede",
        "fontFamily": "'PingFang SC Regular'",
        "paddingTop": 0.453333,
        "paddingRight": 0.4,
        "paddingBottom": 0.373333,
        "paddingLeft": 0
    },
    "proCen": {
        "display": "flex",
        "color": "#333",
        "alignItems": "center",
        "fontSize": 0.373333,
        "borderBottom": "1px solid #dedede",
        "fontFamily": "'PingFang SC Regular'",
        "paddingTop": 0.453333,
        "paddingRight": 0.4,
        "paddingBottom": 0.373333,
        "paddingLeft": 0
    },
    "infoItem infoTitle": {
        "color": "#848484"
    },
    "infoItem infoCon": {
        "flex": 1,
        "textAlign": "right"
    },
    "proCen infoTitle": {
        "width": 2,
        "color": "#848484"
    },
    "proCen infoCon": {
        "flex": 1,
        "textAlign": "right",
        "lineHeight": 0.533333
    },
    "orderBtn": {
        "display": "flex",
        "color": "#fff",
        "bottom": 0,
        "width": 10,
        "fontSize": 0.453333,
        "alignItems": "center",
        "justifyContent": "center",
        "background": "#f22f33",
        "position": "fixed",
        "paddingTop": 0.36,
        "paddingRight": 0,
        "paddingBottom": 0.32,
        "paddingLeft": 0,
        "fontFamily": "'PingFang SC Regular'"
    },
    "order_icon": {
        "width": 0.626667,
        "height": 0.626667,
        "marginRight": 0.293333
    },
    "dataPadding": {
        "paddingLeft": 0.4
    },
    "dataItem": {
        "display": "flex",
        "background": "#fff",
        "alignItems": "center",
        "justifyContent": "space-between",
        "paddingTop": 0.4,
        "paddingRight": 0.4,
        "paddingBottom": 0.44,
        "paddingLeft": 0,
        "borderBottom": "1px solid #dedede"
    },
    "dataItemLeft": {
        "display": "flex",
        "flex": 1
    },
    "dataImg": {
        "width": 1.146667,
        "height": 1.146667,
        "marginRight": 0.373333
    },
    "title_time": {
        "color": "#333",
        "flex": 1,
        "fontSize": 0.4,
        "fontFamily": "'PingFang SC Regular'"
    },
    "downLoadIcon": {
        "width": 0.613333,
        "height": 0.613333,
        "marginLeft": 0.533333
    },
    "txt1": {
        "color": "#848484",
        "fontSize": 0.373333,
        "marginTop": 0.266667,
        "display": "flex",
        "justifyContent": "space-between",
        "fontFamily": "'PingFang SC Regular'"
    },
    "my-accordion pad am-accordion-content-box": {
        "paddingTop": 0.2,
        "paddingRight": 0.2,
        "paddingBottom": 0.2,
        "paddingLeft": 0.2
    },
    "ListP": {
        "backgroundColor": "red"
    },
    "whd": {
        "width": "100%",
        "color": "red"
    },
    "Color": {
        "color": "red"
    },
    "Listpp": {
        "height": 1.333333
    }
});
