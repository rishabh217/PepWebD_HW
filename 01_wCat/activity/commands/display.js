const fs = require("fs");

function isDirOrFile(input) {
    try {
        var stat = fs.lstatSync(input);
        var isDir = stat.isDirectory();
        var isFile = stat.isFile();
        return (isDir || isFile)
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

function displayExecutor(count, path1, path2, path3) {
    switch (count) {
        case 0 : console.log("No path passed."); break;
        case 1 : {
            var data = readFile(path1);
            console.log(data);
            break;
        }
        case 2 : {
            if (isDirOrFile(path2)) {
                var data1 = readFile(path1);
                var data2 = readFile(path2);
                console.log(data1 + " " + data2);
            } else
                console.log("File / Directory does not exist.");
            break;
        }
        case 3 : {
            if (isDirOrFile(path2) && isDirOrFile(path3)) {
                var data1 = readFile(path1);
                var data2 = readFile(path2);
                var data3 = readFile(path3);
                console.log(data1 + " " + data2 + " " + data3);
            } else
                console.log("File / Directory does not exist.");
            break;
        }
    }
}

function readFile(path) {
    try {
        return fs.readFileSync(path, 'utf-8');
    } catch (err) {
        // Here you get the error when the file was not found,
        // but you also get any other error
        return "File does not exist.";
    }
}

module.exports = {
    displayFn: displayExecutor
}