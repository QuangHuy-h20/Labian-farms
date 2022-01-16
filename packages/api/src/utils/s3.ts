
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import { FileUpload } from "graphql-upload";
import shortid from 'shortid';

const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_ID;
const secretAccessKey = process.env.S3_SECRET_KEY;

AWS.config.update({ region, accessKeyId, secretAccessKey })
export const s3 = new S3({ region })


export const s3DefaultParams = {
	ACL: 'public-read',
	Bucket: process.env.S3_BUCKET_NAME!,
	Conditions: [
		['content-length-range', 0, 1024000],
		{ acl: 'public-read' }
	]
}

export const singleUpload = (file: FileUpload, folder: string | null, next: Function) => {
	const { createReadStream, filename } = file
	return new Promise(reject => {
		s3.upload({ ...s3DefaultParams, Body: createReadStream(), Key: `${folder}/${filename}` }, (err, data) => {
			if (err) reject(err)
			return next(err, data)
		})
	})
}

export const deleteFile = (filename: string, folder: string) => {
	return new Promise((reject) => {
		s3.deleteObject({ Bucket: process.env.S3_BUCKET_NAME!, Key: `${folder}/${filename}` }, err => {
			if (err) reject(err)
		})
	})
}


export const uploadMultipleFiles = async (files: FileUpload[], folder: string | null):Promise<string[]> => {
	let list: string[] = []
	return new Promise(async (resolve) => {
		for await (let file of files) {
			new Promise(async resolve => {
				let { createReadStream, filename } = file
				filename = `${shortid.generate()}-${filename}`
				const stream = createReadStream()
				const data = await s3.upload({ ...s3DefaultParams, Body: stream, Key: `${folder}/${filename}` }).promise()
				const sendData = data.Location
				resolve(sendData)
			})
				.then(value => {
					list.push(value as string);
					if (list.length === files.length) resolve(list)
				})
		}
	})
}





