const AdmZip = require("adm-zip");

async function createZipArchive() {
  try {
    const zip = new AdmZip();
    const outputFile = "./dist/build.zip";
    zip.addLocalFolder("./dist");
    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

createZipArchive();
