// fs module import
const fs = require('fs');

// 1. Write file (create new file)
fs.writeFile('example.txt', 'Hello, this is my first file!', (err) => {
    if (err) throw err;
    console.log('File created and data written');

    // 2. Read file
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('File content:', data);

        // 3. Append data (update file)
        fs.appendFile('example.txt', '\nThis is appended text.', (err) => {
            if (err) throw err;
            console.log('Data appended');

            // 4. Rename file
            fs.rename('example.txt', 'newfile.txt', (err) => {
                if (err) throw err;
                console.log('File renamed');

                // 5. Delete file
                fs.unlink('newfile.txt', (err) => {
                    if (err) throw err;
                    console.log('File deleted');
                });
            });
        });
    });
});