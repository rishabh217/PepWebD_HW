const fs = require("fs");

let input = process.argv.slice(2);

let path1, path2, path3, command1, command2;
let count = 0;

let { commandFn } = require("./commands/command");
let { commandsFn } = require("./commands/commands");
let { displayFn } = require("./commands/display");

if (isCommand(input[0]) && isCommand(input[1])) {
    command1 = input[0];
    command2 = input[1];
    path1 = input[2];
} else if (isCommand(input[0])) {
    command1 = input[0];
    path1 = input[1];
} else {
    path1 = input[0];
    path2 = input[1];
    path3 = input[2];
}

if (path1 != undefined) {
    count = 1;
}
if (path1 != undefined && path2 != undefined) {
    count = 2;
}
if (path1 != undefined && path2 != undefined && path3 != undefined) {
    count = 3;
}

function isCommand(input) {
    if (input.charAt(0) == '-')
        return true;
    return false;
}

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

function wCatExecutor() {
    if (isDirOrFile(path1)) {
        if (command1 != undefined && command2 != undefined) {
            if ((command1 == "-b" && command2 == "-n") || (command1 == "-n" && command2 == "-b")) {
                // console.log("1");
                commandFn(command1, path1);
            }
            else {
                // console.log("2");
                commandsFn(command1, command2, path1);
            }
        } else if (command1 != undefined) {
            // console.log("3");
            commandFn(command1, path1);
        } else {
            // console.log("4");
            displayFn(count, path1, path2, path3);
        }
    } else 
        console.log("File / Directory does not exist.");
}

wCatExecutor();