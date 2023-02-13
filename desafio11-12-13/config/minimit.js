import parseArgs from "minimist";

const config = {
    alias: {p: 'puerto'},
    default: {puerto: '8080'}
} 
export const args = parseArgs(process.argv.slice(2), config)


