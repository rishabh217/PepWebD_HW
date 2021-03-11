const fs = require("fs");
const readline = require('readline');

let rl, path;

function commandExecutor(command, mPath) {
    path = mPath;
    createReadLineObject();
    switch (command) {
        case "-b" : command_b(); break;
        case "-n" : command_n(); break;
        case "-s" : command_s(); break;
        default : console.log("Wrong command.");
    }
}

function createReadLineObject() {
    // create instance of readline
    // each instance is associated with single input stream
    rl = readline.createInterface({
        input: fs.createReadStream(path)
    });
}

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

module.exports = {
    commandFn: commandExecutor
}