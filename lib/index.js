import { program } from 'commander';
import create from './order/create';
// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
// ts-cli create newPro
program
    .command('create <app-name>')
    .description('Create new project from => ts-cli create yourProjectName')
    .action(async (name) => {
    // 创建命令具体做的事情都在这里，name 是你指定的 newPro
    await create(name);
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE1BQU0sTUFBTSxnQkFBZ0IsQ0FBQztBQUVwQyw2QkFBNkI7QUFDN0Isa0RBQWtEO0FBQ2xELHVEQUF1RDtBQUN2RCxPQUFPO0tBQ0osT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsY0FBYyxDQUFDO0tBQ2hFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRWhDLHVCQUF1QjtBQUN2QixPQUFPO0tBQ0osT0FBTyxDQUFDLG1CQUFtQixDQUFDO0tBQzVCLFdBQVcsQ0FBQywwREFBMEQsQ0FBQztLQUN2RSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQzdCLG1DQUFtQztJQUNuQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQztBQUVMLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=