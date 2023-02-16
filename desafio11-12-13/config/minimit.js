import parseArgs from "minimist";

const config = {
    alias: {
        m: 'modo',
        p: 'puerto',
    },
    default: {
        modo: 'fork',
        puerto: '8080'
    }
} 
export const args = parseArgs(process.argv.slice(2), config)


//node server.js -m cluster -p 8082