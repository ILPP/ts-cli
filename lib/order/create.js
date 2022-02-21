/**
 * create 命令的具体任务
 */
import { changePackageInfo, end, initProjectDir, installDevEnviroment, installFeature, installTSAndInit, installTypesNode, isFileExist, selectFeature, } from '../utils/create';
// create 命令
export default async function create(projecrName) {
    // 判断文件是否已经存在
    isFileExist(projecrName);
    // 选择需要的功能
    const feature = await selectFeature();
    // 初始化项目目录
    initProjectDir(projecrName);
    // 改写项目的 package.json 基本信息，比如 name、description
    changePackageInfo(projecrName);
    // 安装 typescript 并初始化
    installTSAndInit();
    // 安装 @types/node
    installTypesNode();
    // 安装开发环境，支持实时编译
    installDevEnviroment();
    // 安装 feature
    installFeature(feature);
    // 结束
    end(projecrName);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29yZGVyL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsR0FBRyxFQUNILGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLGFBQWEsR0FDZCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLFlBQVk7QUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUMsV0FBbUI7SUFDdEQsYUFBYTtJQUNiLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixVQUFVO0lBQ1YsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN0QyxVQUFVO0lBQ1YsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVCLDhDQUE4QztJQUM5QyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixxQkFBcUI7SUFDckIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixpQkFBaUI7SUFDakIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixnQkFBZ0I7SUFDaEIsb0JBQW9CLEVBQUUsQ0FBQztJQUN2QixhQUFhO0lBQ2IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLEtBQUs7SUFDTCxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkIsQ0FBQyJ9