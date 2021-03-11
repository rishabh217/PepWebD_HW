const fs = require("fs");
const readline = require('readline');

let rl, path;

function commandsExecutor(command1, command2, mPath) {
    path = mPath;
    createReadLineObject();
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

function createReadLineObject() {
    // create instance of readline
    // each instance is associated with single input stream
    rl = readline.createInterface({
        input: fs.createReadStream(path)
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

module.exports = {
    commandsFn: commandsExecutor
}