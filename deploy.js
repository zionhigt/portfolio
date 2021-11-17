const fs = require("fs")
const path = require("path").posix;

const ftp = JSON.parse(fs.readFileSync("./credential.json"), {encoding: "utf-8"})[0].ftp;

const excludedFile = fs.readFileSync(".ovhignore", {encoding: "utf-8"}).split("\r\n");
const fileToPut = [];
const throwDir = function(rootPath) {
    const statPath = fs.statSync(rootPath);
    if (statPath.isDirectory()) {
        const directory = fs.readdirSync(rootPath);
        for (let item of directory) {
            const statItem = fs.statSync(path.join(rootPath, item));
            if (statItem.isDirectory()) {
                if (!excludedFile.includes(item + "/")) {
                    throwDir(path.join(rootPath, item));
                }
            } else if (statItem.isFile()) {
                if (!excludedFile.includes(item)) {
                    fileToPut.push(path.join(rootPath, item));
                }
            }
        }
    } else {
        console.error("Not a directory");
    }
}
const buildDeploymentImage = function() {
    const commandes = fileToPut.map(function(file) {
        return `put ${file} ${file}`;
    })
    let data = [
        `open ${ftp.host}`,
        ftp.user,
        ftp.password,
        `cd ${ftp.root}\r\n`
    ].join("\r\n");
    commandes.push("quit");
    data += commandes.join("\r\n");
    fs.writeFileSync("ftp_deploy.ftp", data);
}

throwDir(".");
console.log(fileToPut);
buildDeploymentImage();
