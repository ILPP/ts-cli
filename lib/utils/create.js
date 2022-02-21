/**
 * create 命令需要用到的所有方法
 */
import { getProjectPath, printMsg, readJsonFile, writeJsonFile, clearConsole, } from '../utils/common';
import { existsSync } from 'fs';
import { prompt } from 'inquirer';
import chalk from 'chalk';
const { blue, cyan, gray, red, yellow } = chalk;
import * as shell from 'shelljs';
import * as installFeatureMethod from './installFeature';
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
export function isFileExist(filename) {
    // 文件路径
    const file = getProjectPath(filename);
    // 验证文件是否已经存在，存在则推出进程
    if (existsSync(file)) {
        printMsg(red(`${file} 已经存在`));
        process.exit(1);
    }
}
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
export async function selectFeature() {
    // 清空命令行
    clearConsole();
    // 输出信息
    /* eslint-disable @typescript-eslint/no-var-requires */
    printMsg(blue(`TS CLI v${require('../../package.json').version}`));
    printMsg('Start initializing the project:');
    printMsg('');
    // 选择功能，这里配合 下面的 installFeature 方法 和 ./installFeature.ts 文件为脚手架提供了良好的扩展机制
    // 将来扩展其它功能只需要在 choices 数组中增加配置项，然后在 ./installFeature.ts 文件中增加相应的安装方法即可
    const { feature } = await prompt([
        {
            name: 'feature',
            type: 'checkbox',
            message: 'Check the features needed for your project',
            choices: [
                { name: 'ESLint', value: 'ESLint' },
                { name: 'Prettier', value: 'Prettier' },
                { name: 'CZ', value: 'CZ' },
            ],
        },
    ]);
    return feature;
}
/**
 * 初始化项目目录
 */
export function initProjectDir(projectName) {
    shell.exec(`mkdir ${projectName}`);
    shell.cd(projectName);
    shell.exec('npm init -y');
}
/**
 * 改写项目中 package.json 的 name、description
 */
export function changePackageInfo(projectName) {
    const packageJSON = readJsonFile('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    writeJsonFile('./package.json', packageJSON);
}
/**
 * 安装 typescript 并初始化
 */
export function installTSAndInit() {
    // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
    shell.exec('npm i typescript -D && npx tsc --init');
    // 覆写 tsconfig.json
    const tsconfigJson = {
        compileOnSave: true,
        compilerOptions: {
            target: 'ES2018',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            inlineSourceMap: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            pretty: true,
            declaration: true,
            outDir: 'lib',
            baseUrl: './',
            paths: {
                '*': ['src/*'],
            },
        },
        exclude: ['lib', 'node_modules'],
    };
    writeJsonFile('./tsconfig.json', tsconfigJson);
    // 创建 src 目录和 /src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
export function installTypesNode() {
    shell.exec('npm i @types/node -D');
}
/**
 * 安装开发环境，支持实时编译
 */
export function installDevEnviroment() {
    shell.exec('npm i ts-node-dev -D');
    /**
     * 在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    const packageJson = readJsonFile('./package.json');
    packageJson.scripts['dev:comment'] = '启动开发环境';
    packageJson.scripts['dev'] =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    writeJsonFile('./package.json', packageJson);
}
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export function installFeature(feature) {
    feature.forEach((item) => {
        const func = installFeatureMethod[`install${item}`];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature) {
    // feature 副本
    const featureBak = JSON.parse(JSON.stringify(feature));
    // 设置 hook
    const hooks = {};
    // 判断用户是否选择了 CZ，有则设置 hooks
    if (featureBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // 设置 lintStaged
    const lintStaged = [];
    if (featureBak.includes('ESLint')) {
        lintStaged.push('eslint');
    }
    if (featureBak.includes('Prettier')) {
        lintStaged.push('prettier');
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
/**
 * 整个项目安装结束，给用户提示信息
 */
export function end(projectName) {
    printMsg(`Successfully created project ${yellow(projectName)}`);
    printMsg('Get started with the following commands:');
    printMsg('');
    printMsg(`${gray('$')} ${cyan('cd ' + projectName)}`);
    printMsg(`${gray('$')} ${cyan('npm run dev')}`);
    printMsg('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFDTCxjQUFjLEVBR2QsUUFBUSxFQUNSLFlBQVksRUFDWixhQUFhLEVBQ2IsWUFBWSxHQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNoQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEtBQUssb0JBQW9CLE1BQU0sa0JBQWtCLENBQUM7QUFFekQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUFnQjtJQUMxQyxPQUFPO0lBQ1AsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLHFCQUFxQjtJQUNyQixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhO0lBQ2pDLFFBQVE7SUFDUixZQUFZLEVBQUUsQ0FBQztJQUNmLE9BQU87SUFDUCx1REFBdUQ7SUFDdkQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxD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