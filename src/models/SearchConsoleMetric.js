import mongoose from "mongoose";
const Schema = new mongoose.Schema({ date:{type:String,required:true}, dimension:{type:String,enum:["page","query"],required:true}, key:{type:String,required:true}, clicks:{type:Number,default:0}, impressions:{type:Number,default:0}, ctr:{type:Number,default:0}, position:{type:Number,default:0} },{timestamps:true});
Schema.index({date:1,dimension:1,key:1},{unique:true});
export default mongoose.models.SearchConsoleMetric || mongoose.model("SearchConsoleMetric",Schema);
