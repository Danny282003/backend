import os from 'os'

// fs.writeFile('home.txt', 'welcome to backend', 'utf-8' , (err)=>{
//     if (err) {
//         return console.log(err)
//     }

//     console.log("file created successfully")
// })

// let content

// fs.readFile('note.txt', (err,data)=>{
//     if (err) {
//         return console.log(err)
//     }else{
//         fs.writeFile('./files/insider.txt', data.toString(), 'utf-8', (err)=>{
//             if(err) {
//                 console.log(err)
//                 return
//             } 
//         })
//     }
// })

const platform = (os.totalmem()/(1024 * 1024 * 1024)).toFixed(2)
const freeSpace = (os.freemem()/ (1024 * 1024 * 1024)).toFixed(2)

console.log(`You have ${freeSpace}GB of ${platform}GB left`, `${os.hostname()}`)

