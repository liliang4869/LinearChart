import React,{Component} from 'react'
import {
    View,Text,ART
} from 'react-native'
const {Surface, Shape, Path,Group} = ART;
var leftAndTop=25;
export default class LinearChart extends Component{
    componentWillMount(){
         this.axisLengthY=10*this.props.DivY; this.axisLengthX=10*this.props.DivX;
          leftAndTop=0.5*(this.props.style.width-this.axisLengthY)
        this.axis=new Path().moveTo(leftAndTop,leftAndTop).lineTo(leftAndTop,leftAndTop+this.axisLengthY).lineTo(leftAndTop+this.axisLengthX,leftAndTop+this.axisLengthY);
        this.Ylines=new Array(10);this.Xlines=new Array(10);
        for(let i=1;i<=10;i++)
        {
            this.Ylines[i-1]=leftAndTop+i*this.props.DivX;
            this.Xlines[i-1]=leftAndTop+(i-1)*this.props.DivY;
        }
        this.ResultLine=new Path();
        let list=this.props.FxList;
        this.ResultLine.moveTo(leftAndTop+this.props.startX-this.props.ZeroX,leftAndTop+this.axisLengthY-list[0]+this.props.ZeroY);
        for(let j=1;j<list.length;j++)
        {
            this.ResultLine.lineTo(leftAndTop+this.props.startX-this.props.ZeroX+j*this.props.GapX,leftAndTop+this.axisLengthY-list[j]+this.props.ZeroY);
        }
    }
render(){
    let surfaceHeight=this.props.style.height;
    let surfaceWidth=this.props.style.width;
    
    return (<View style={[{height:250,width:250,backgroundColor:'white'},this.props.style]}>
        {
            this.Ylines.map((data,index)=>{
                return <View style={{height:this.axisLengthY,width:1,backgroundColor:'#eeeeee',position:'absolute',left:data,top:leftAndTop}} key={index}/>
            })
            
        }
         {
            this.Ylines.map((data,index)=>{
                return <View style={{backgroundColor:'white',position:'absolute',right:this.props.style.width-data-0.5*this.props.DivX,top:leftAndTop+this.axisLengthY}} key={index}>
                    <Text style={{fontSize:10}}>{this.props.ZeroX+(index+1)*this.props.DivX}</Text>
                    </View>
            })
            
        }
        {
             this.Xlines.map((data,index)=>{
                return <View style={{height:1,width:this.axisLengthX,backgroundColor:'#eeeeee',position:'absolute',left:leftAndTop,top:data}} key={index}/>
            })
        }
        {
            this.Xlines.map((data,index)=>{
                return <View style={{backgroundColor:'white',position:'absolute',right:leftAndTop+this.axisLengthY,top:data-5}} key={index}>
                    <Text style={{fontSize:10}}>{this.props.ZeroY+(10-index)*this.props.DivY}</Text>
                    </View>
            })
            
        }
        
    <Surface height={surfaceHeight} width={surfaceWidth}>
        <Group>
          <Shape d={this.axis} stroke="black" strokeWidth={1}/>
           <Shape d={this.ResultLine} stroke="black" strokeWidth={1}/>
        </Group>
       
    </Surface>
     
    </View>)
}
}
LinearChart.defaultProps={
    ZeroY:0,
    ZeroX:0,//坐标轴起始位置
    DivX:20,
    DivY:20,
    FxList:[5,10,86,32,42,52,45,63,72,86],
    GapX:20,//x数据密度
    DivGap:20,//刻度单位
    startX:20,//x开始坐标
    style:{height:400,width:400}
}