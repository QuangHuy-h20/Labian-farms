
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import { FileUpload } from "graphql-upload";
import shortid from 'shortid';

const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_ID;
const secretAccessKey = process.env.S3_SECRET_KEY;

AWS.config.update({ region, accessKeyId, secretAccessKey })
const s3 = new S3({ region })

const s3DefaultParams = {
	ACL: 'public-read',
	Bucket: process.env.S3_BUCKET_NAME!,
	Conditions: [
		['content-length-range', 0, 1024000],
		{ acl: 'public-read' }
	]
}

export const singleUpload = async (file: FileUpload, folder: string | null) => {
	let { createReadStream, filename } = file
	const stream = createReadStream()
	filename = `${shortid.generate()}-${filename}`
	const key = `${folder}/${filename}`
	return new Promise(async resolve => {
		const data = await s3.upload({ ...s3DefaultParams, Body: stream, Key: key }).promise()
		const getUrl = data.Location
		resolve(getUrl)
	})
}

export const deleteFile = async (folder: string, filename?: string | undefined) => {
	let key = filename !== undefined ? `${folder}/${filename}` : `${folder}`
	return new Promise(async(_) => {
		await s3.deleteObject({ Bucket: process.env.S3_BUCKET_NAME!, Key: key }).promise()
	})
}

export const multipleUploads = async (files: FileUpload[], folder: string | null, name: string): Promise<string[]> => {
	let list: string[] = []
	return new Promise(async (resolve) => {
		for await (let file of files) {
			new Promise(async resolve => {
				let { createReadStream, filename } = file
				filename = `${shortid.generate()}-${name}`
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





