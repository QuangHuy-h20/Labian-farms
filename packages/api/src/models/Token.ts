import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";

export class Token{
	
	_id:mongoose.Types.ObjectId

	@prop({required:true})
	userId!: string
	
	@prop({required:true})
	token!: string
	
	@prop({default:Date.now, expires:60 * 15})
	createdAt: Date
}

export const TokenModel = getModelForClass(Token)