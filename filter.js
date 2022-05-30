const github = [`github.com`, `githubstatus.com`]

const npm = [`npmjs.com`]

// const googleVoice = [`voice.google.com`]

// const csdn = [`csdn.net`]

const weekly = [
  `deno.com`,
  `peterc.org`, // js weekly
  `css-weekly.com`,
  // react status
  // fe focus
  // node weekly
  `cooperpress.com`,
  `ui.dev`,
]

const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, './filter.rule')

let cache = []

const from = (list = []) => {
  cache.push(...list)
  return `from:{${list.join(' ')}}`
}

const reverse = () => {
  const cacheUniq = Array.from(new Set([...cache]))
  cache = []
  return `from:(-{${cacheUniq.join(' ')}})`
}

const generate = async () => {
  const weeklyOut = from(weekly)
  const feOut = from([...github, ...npm])
  const normalOut = reverse()

  fs.writeFileSync(
    OUT,
    `

weekly:
${weeklyOut}

fe:
${feOut}

normal:
${normalOut}

`.trimStart(),
    'utf-8'
  )
}

generate()
