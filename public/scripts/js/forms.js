function updateKey() {
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
    document.getElementById("key_size").innerHTML = bytesOutput;
    document.getElementById("key_name").innerHTML = fileName;
}

function updateFile() {
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
  document.getElementById("user_file_name").innerHTML = fileName;
  document.getElementById("user_file_size").innerHTML = bytesOutput;
}

document.getElementById("key_file").addEventListener("change", updateKey, false);
document.getElementById("user_file").addEventListener("change", updateFile, false);