function update() {
    let numBytes = 0,
        objectFile = this.files,
        numFiles = objectFile.length;
        
    for (let numFileId = 0; numFileId < numFiles; numFileId++) {
      numBytes += objectFile[numFileId].size;
    }

    let bytesOutput = numBytes + " bytes";
    
    const multiplesName = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    for (n = 0, aprox = numBytes / 1024; aprox > 1; aprox /= 1024, n++) {
      bytesOutput = aprox.toFixed(1) + " " + multiplesName[n];
    }

    (objectFile.length == 1) ? fileName = objectFile[0].name : fileName = 'Archivos Seleccionados: ' + objectFile.length;

    // document.getElementById("fileNum").innerHTML = numFiles;
    document.getElementById("fileSize").innerHTML = bytesOutput;
    document.getElementById("fileName").innerHTML = fileName;
}
document.getElementById("uploadFile").addEventListener("change", update, false);