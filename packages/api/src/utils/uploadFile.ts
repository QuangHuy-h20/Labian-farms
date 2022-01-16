import { createWriteStream, unlink } from "fs";
import shortId from "shortid";

export default async function storeUpload(upload: any, folder: string | null):Promise<string> {
	const { createReadStream, filename } = await upload
	const stream = createReadStream()
	const storedFileName = `${shortId.generate()}-${filename}}`
	const storedUrl = `https://labian-farms.s3.ap-southeast-1.amazonaws.com/${folder}`
	await new Promise((resolve, reject) => {
		// Create a stream to which the upload will be written.
		const writeStream = createWriteStream(storedUrl);

		// When the upload is fully written, resolve the promise.
		writeStream.on("finish", resolve);

		// If there's an error writing the file, remove the partially written file
		// and reject the promise.
		writeStream.on("error", (error) => {
			unlink(storedUrl, () => {
				reject(error);
			});
		});

		// In Node.js <= v13, errors are not automatically propagated between piped
		// streams. If there is an error receiving the upload, destroy the write
		// stream with the corresponding error.
		stream.on("error", (error: any) => writeStream.destroy(error));

		// Pipe the upload into the write stream.
		stream.pipe(writeStream);
	});

	return storedFileName;
}
