function flag(name, defaultValue) {
    const index = process.argv.indexOf(`--${name}`)
    let value
    if (index > -1) {
        value = process.argv[index + 1]
    }
    return (value || defaultValue);
}

console.debug('starting')

const workspace = Number(flag('workspace', '123456789'))
const since = flag('since', '2024-01-01')
const until = flag('until', '2024-12-31')

console.debug('since:', since)
console.debug('until:', until)
console.debug('workspace:', workspace)

if (Number.isNaN(workspace)) {
    console.error('--workspace is not an integer')
    process.exit(1)
}

if (workspace % 2 === 0) {
    console.warn('workspace is an even number')
} else {
    console.info('workspace is an odd number')
}

// Done.
process.exit(0)