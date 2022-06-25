import path from "path";
import { Storage } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";

export const gc = new Storage({
  keyFilename: path.join(
    __dirname,
    "../images/labian-farms-354004-b4bf699292ad.json"
  ),
  projectId: "labian-farms-354004",
});

const uploadFileBucket = gc.bucket("labian_farms");

export const singleFile = async (file: FileUpload) => {
  const { createReadStream, filename } = file;
  return new Promise(async (resolve) => {
    // let res: any;
    createReadStream().pipe(
      uploadFileBucket
        .file(filename)
        .createWriteStream({
          resumable: false,
          gzip: true,
        })
        .on("finish", async () => {
          uploadFileBucket
            .file(filename)
            .makePublic()
            .then(async (e) => resolve(e[0].object));
        })
    );
  });
};
