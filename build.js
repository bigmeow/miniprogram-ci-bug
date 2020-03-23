const ci = require('miniprogram-ci')
const project = new ci.Project({
  // 改成你自己的appid
  appid: '你自己的appid',
  type: 'miniProgram',
  projectPath: './',
  // 改成你自己的私钥路径
  privateKeyPath: '.你自己的私钥',
  ignores: ['node_modules/**/*'],
})
console.log(project)
async function run () {
  const warning = await ci.packNpm(project, {
    // ignores: ['pack_npm_ignore_list'],
    reporter: (infos) => { console.log(infos) }
  })

  console.log('构建NPM成功', warning)

  // 这一步会报错
  await ci.upload({
    project,
    version: '1.1.1',
    desc: 'hello',
    setting: {
      es6: true,
    },
    onProgressUpdate: console.log,
  })
  console.log('上传成功')
}

run()