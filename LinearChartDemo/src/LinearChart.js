import React,{Component} from 'react'
import {
    View,Text,ART
} from 'react-native'
const {Surface, Shape, Path,Group} = ART;
var leftAndTop=25;
export default class LinearChart extends Component{
    componentWillMount(){
         this.axisLengthY=10*this.props.DivY*this.props.Ydens; this.axisLengthX=10*this.props.DivX*this.props.Xdens;
          leftAndTop=0.5*(this.props.style.width-this.axisLengthX)
          if(leftAndTop<25)leftAndTop=25
        this.axis=new Path().moveTo(leftAndTop,leftAndTop).lineTo(leftAndTop,leftAndTop+this.axisLengthY).lineTo(leftAndTop+this.axisLengthX,leftAndTop+this.axisLengthY);
        this.Ylines=new Array(10);this.Xlines=new Array(10);
        for(let i=1;i<=10;i++)
        {
            this.Ylines[i-1]=leftAndTop+i*this.props.DivX*this.props.Xdens;
            this.Xlines[i-1]=leftAndTop+(i-1)*this.props.DivY*this.props.Ydens;
        }
        this.ResultLine=new Path();
        let list=this.props.FxList;
        this.ResultLine.moveTo(leftAndTop+this.props.startX*this.props.Xdens-this.props.ZeroX*this.props.Xdens,leftAndTop+this.axisLengthY-list[0]*this.props.Ydens+this.props.ZeroY*this.props.Ydens);
        for(let j=1;j<list.length;j++)
        {
            this.ResultLine.lineTo(leftAndTop+this.props.startX*this.props.Xdens-this.props.ZeroX*this.props.Xdens+j*this.props.GapX*this.props.Xdens,
            leftAndTop+this.axisLengthY-list[j]*this.props.Ydens+this.props.ZeroY*this.props.Ydens);
        }
    }
render(){
    let surfaceHeight=this.props.style.height;
    let surfaceWidth=this.props.style.width;
    
    return (<View style={[{height:250,width:250,backgroundColor:'white'},this.props.style]}>
        {//竖线
            this.Ylines.map((data,index)=>{
                return <View style={{height:this.axisLengthY,width:1,backgroundColor:'#eeeeee',position:'absolute',left:data,top:leftAndTop}} key={index}/>
            })
            
        }
         {//横坐标
            this.Ylines.map((data,index)=>{
                return <View style={{backgroundColor:'white',position:'absolute',right:this.props.style.width-data-0.5*this.props.DivX*this.props.Xdens,top:leftAndTop+this.axisLengthY}} key={index}>
                    <Text style={{fontSize:10}}>{this.props.ZeroX+(index+1)*this.props.DivX}</Text>
                    </View>
            })
            
        }
        {//横线
             this.Xlines.map((data,index)=>{
                return <View style={{height:1,width:this.axisLengthX,backgroundColor:'#eeeeee',position:'absolute',left:leftAndTop,top:data}} key={index}/>
            })
        }
        {//纵坐标
            this.Xlines.map((data,index)=>{
                return <View style={{backgroundColor:'white',position:'absolute',right:this.props.style.width-leftAndTop,top:data-5}} key={index}>
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
    DivX:30,//X轴每格数据量
    DivY:10,//Y轴每格数据量
    Xdens:1,//>1拉伸X轴 <1压缩X轴  
    Ydens:5,//>1拉伸Y轴 <1压缩Y轴  
    FxList:[5,10,86,32,42,52,45,63,72,86],
    GapX:30,//x数据密度
    startX:20,//x开始坐标
    style:{height:800,width:400}
}