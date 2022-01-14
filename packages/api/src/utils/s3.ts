import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import { FileUpload } from "graphql-upload";

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

export const uploadFile = (file: FileUpload, folder: string | null, next: Function) => {
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
