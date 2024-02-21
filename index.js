function env(name, defaultValue) {
    return process.env[name] || defaultValue
}

console.debug('starting')
console.error('this line goes to stderr')

const workspace = Number(env('WORKSPACE', '123456789'))
const since = env('SINCE', '2024-01-01')
const until = env('UNTIL', '2024-12-31')

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