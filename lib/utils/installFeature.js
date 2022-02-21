/**
 * 实现各个功能的安装方法
 */
import * as shell from 'shelljs';
import { writeFileSync } from 'fs';
import { printMsg, readJsonFile, writeJsonFile } from './common';
import chalk from 'chalk';
const { red } = chalk;
/**
 * 安装 ESLint
 */
export function installESLint() {
    shell.exec('npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D');
    // 添加 .eslintrc.js
    const eslintrc = `module.exports = {
   "env": {
     "es2021": true,
     "node": true
   },
   "extends": [
     "eslint:recommended",
     "plugin:@typescript-eslint/recommended"
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
     "ecmaVersion": 12,
     "sourceType": "module"
   },
   "plugins": [
     "@typescript-eslint"
   ],
   "rules": {
    '@typescript-eslint/no-var-requires': 0
   }
 };
   `;
    try {
        writeFileSync('./.eslintrc.js', eslintrc, { encoding: 'utf-8' });
    }
    catch (err) {
        printMsg(`${red('Failed to write .eslintrc.js file content')}`);
        printMsg(`${red('Please add the following content in .eslintrc.js')}`);
        printMsg(`${red(eslintrc)}`);
    }
    // 改写 package.json
    const packageJson = readJsonFile('./package.json');
    packageJson.scripts['eslint:comment'] =
        '使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .ts 的文件';
    packageJson.scripts['eslint'] = 'eslint --fix src --ext .ts --max-warnings=0';
    writeJsonFile('./package.json', packageJson);
}
/**
 * 安装 Prettier
 */
export function installPrettier() {
    shell.exec('npm i prettier -D');
    // 添加 .prettierrc.js
    const prettierrc = `module.exports = {
   // 一行最多 80 字符
   printWidth: 80,
   // 使用 2 个空格缩进
   tabWidth: 2,
   // 不使用 tab 缩进，而使用空格
   useTabs: false,
   // 行尾需要有分号
   semi: true,
   // 使用单引号代替双引号
   singleQuote: true,
   // 对象的 key 仅在必要时用引号
   quoteProps: 'as-needed',
   // jsx 不使用单引号，而使用双引号
   jsxSingleQuote: false,
   // 末尾使用逗号
   trailingComma: 'all',
   // 大括号内的首尾需要空格 { foo: bar }
   bracketSpacing: true,
   // jsx 标签的反尖括号需要换行
   jsxBracketSameLine: false,
   // 箭头函数，只有一个参数的时候，也需要括号
   arrowParens: 'always',
   // 每个文件格式化的范围是文件的全部内容
   rangeStart: 0,
   rangeEnd: Infinity,
   // 不需要写文件开头的 @prettier
   requirePragma: false,
   // 不需要自动在文件开头插入 @prettier
   insertPragma: false,
   // 使用默认的折行标准
   proseWrap: 'preserve',
   // 根据显示样式决定 html 要不要折行
   htmlWhitespaceSensitivity: 'css',
   // 换行符使用 lf
   endOfLine: 'lf'
 };
   `;
    try {
        writeFileSync('./.prettierrc.js', prettierrc, { encoding: 'utf-8' });
    }
    catch (err) {
        printMsg(`${red('Failed to write .prettierrc.js file content')}`);
        printMsg(`${red('Please add the following content in .prettierrc.js')}`);
        printMsg(`${red(prettierrc)}`);
    }
    // 改写 package.json
    const packageJson = readJsonFile('./package.json');
    packageJson.scripts['prettier:comment'] =
        '自动格式化 src 目录下的所有 .ts 文件';
    packageJson.scripts['prettier'] = 'prettier --write "src/**/*.ts"';
    writeJsonFile('./package.json', packageJson);
}
/**
 * 安装 CZ，规范 git 提交信息
 */
export function installCZ() {
    shell.exec('npx commitizen init cz-conventional-changelog --save --save-exact');
    shell.exec('npm i @commitlint/cli @commitlint/config-conventional -D');
    // 添加 commitlint.config.js
    const commitlint = `module.exports = {
   extends: ['@commitlint/config-conventional']
 };
   `;
    try {
        writeFileSync('./commitlint.config.js', commitlint, { encoding: 'utf-8' });
    }
    catch (err) {
        printMsg(`${red('Failed to write commitlint.config.js file content')}`);
        printMsg(`${red('Please add the following content in commitlint.config.js')}`);
        printMsg(`${red(commitlint)}`);
    }
    // 改写 package.json
    const packageJson = readJsonFile('./package.json');
    packageJson.scripts['commit:comment'] = '引导设置规范化的提交信息';
    packageJson.scripts['commit'] = 'cz';
    writeJsonFile('./package.json', packageJson);
}
/**
 * 安装 husky 和 lint-staged，以实现 git commit 时自动化校验
 * @param hooks，需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
export function installHusky(hooks, lintStaged) {
    // 初始化 git 仓库
    shell.exec('git init');
    // 在安装 husky 和 lint-staged
    shell.exec('npm i husky lint-staged -D');
    // 设置 package.json
    const packageJson = readJsonFile('./package.json');
    packageJson['husky'] = {
        hooks: {
            'pre-commit': 'lint-staged',
            ...hooks,
        },
    };
    packageJson['lint-staged'] = {
        '*.ts': lintStaged.map((item) => `npm run ${item}`),
    };
    writeJsonFile('./package.json', packageJson);
}
/**
 * 安装构建工具，目前主要用于小项目，所以使用 typescript 原生的构建功能即可
 */
export function installBuild(feature) {
    // 设置 package.json
    const packageJson = readJsonFile('./package.json');
    packageJson.scripts['build:comment'] = '构建';
    let order = '';
    if (feature.includes('ESLint')) {
        order += 'npm run eslint';
    }
    if (feature.includes('Prettier')) {
        order += ' && npm run prettier';
    }
    order += ' && rm -rf lib && tsc --build';
    packageJson.scripts['build'] = order;
    writeJsonFile('./package.json', packageJson);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbEZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5zdGFsbEZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxPQUFPLEtBQUssS0FBSyxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ25DLE9BQU8sRUFBZSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUN0Qjs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhO0lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQ1IsNEVBQTRFLENBQzdFLENBQUM7SUFDRixrQkFBa0I7SUFDbEIsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCZixDQUFDO0lBQ0gsSUFBSTtRQUNGLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNsRTtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsa0JBQWtCO0lBQ2xCLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBYyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hFLFdBQVcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDbkMseUNBQXlDLENBQUM7SUFDNUMsV0FBVyxD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