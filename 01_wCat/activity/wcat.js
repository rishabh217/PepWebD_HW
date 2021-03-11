const fs = require("fs");
const readline = require('readline');

let input = process.argv.slice(2);

let path1, path2, path3, command1, command2;
let count = 0;

if (isCommand(input[0]) && isCommand(input[1])) {
    command1 = input[0];
    command2 = input[1];
    path1 = input[2];
    path2 = input[3];
    path3 = input[4];
} else if (isCommand(input[0])) {
    command1 = input[0];
    path1 = input[1];
    path2 = input[2];
    path3 = input[3];
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

function isDirOrPath(input) {
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

function readFile(path) {
    try {
        return fs.readFileSync(path, 'utf-8');
    } catch (err) {
        // Here you get the error when the file was not found,
        // but you also get any other error
        return "File does not exist.";
    }
}

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream(path1)
});

function command_s() {

    // event is emitted after each line
    rl.on('line', function(line) {
        if (line.toString().length != 0)
            console.log(line);
    });

    // end
    rl.on('close', function(line) {
        rl.close
    });

}

function command_b() {
    let line_no = 1;

    // event is emitted after each line
    rl.on('line', function(line) {
        console.log(line_no + ". " + line);
        line_no++;
    });

    // end
    rl.on('close', function(line) {
        rl.close
    });

}

function command_n() {
    let line_no = 1;

    // event is emitted after each line
    rl.on('line', function(line) {
        if (line.toString().length != 0) {
            console.log(line_no + ". " + line);
            line_no++;
        } else {
            console.log(line);
        }
    });

    // end
    rl.on('close', function(line) {
        rl.close
    });

}

function command_sb_bs_sn() {
    let line_no = 1;

    // event is emitted after each line
    rl.on('line', function(line) {
        if (line.toString().length != 0) {
            console.log(line_no + ". " + line);
            line_no++;
        }
    });

    // end
    rl.on('close', function(line) {
        rl.close
    });
}

function command_ns() {
    let line_no = 1;

    // event is emitted after each line
    rl.on('line', function(line) {
        if (line.toString().length != 0) {
            console.log(line_no + ". " + line);
        }
        line_no++;
    });

    // end
    rl.on('close', function(line) {
        rl.close
    });
}

function callCommand(command) {
    switch (command) {
        case "-b" : command_b(); break;
        case "-n" : command_n(); break;
        case "-s" : command_s(); break;
        default : console.log("Wrong command.");
    }
}

function callCommands(command1, command2) {
    if (command1 == "-s" && command2 == "-b") {
        command_sb_bs_sn();
    } else if (command1 == "-b" && command2 == "-s") {
        command_sb_bs_sn();
    } else if (command1 == "-s" && command2 == "-n") {
        command_sb_bs_sn();
    } else if (command1 == "-n" && command2 == "-s") {
        command_ns();
    } else {
        console.log("Wrong commands.");
    }
}

function fileDisplayExecutor() {
    switch (count) {
        case 0 : console.log("No path passed."); break;
        case 1 : {
            var data = readFile(path1);
            console.log(data);
            break;
        }
        case 2 : {
            var data1 = readFile(path1);
            var data2 = readFile(path2);
            console.log(data1 + " " + data2);
            break;
        }
        case 3 : {
            var data1 = readFile(path1);
            var data2 = readFile(path2);
            var data3 = readFile(path3);
            console.log(data1 + " " + data2 + " " + data3);
            break;
        }
    }
}

if (command1 != undefined && command2 != undefined) {
    if ((command1 == "-b" && command2 == "-n") || (command1 == "-n" && command2 == "-b")) {
        // console.log("1");
        callCommand(command1);
    }
    else {
        // console.log("2");
        callCommands(command1, command2);
    }
} else if (command1 != undefined) {
    // console.log("3");
    callCommand(command1);
} else {
    // console.log("4");
    fileDisplayExecutor();
}