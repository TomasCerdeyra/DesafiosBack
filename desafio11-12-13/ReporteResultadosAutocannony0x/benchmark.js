import autocannon from "autocannon";
import stream from 'stream'

function run(url) {
    const buf = []
    const outputStream = new stream.PassThrough()

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', data => buf.push(data))
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log('corriendo el benchmark');

run('http://localhost:8080/info')
run('http://localhost:8080/infoGzip')