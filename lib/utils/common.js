/**
 * 放一些通用的工具方法
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as clear from 'clear-console';
/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
export function readJsonFile(filename) {
    return JSON.parse(readFileSync(filename, { encoding: 'utf-8', flag: 'r' }));
}
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export function writeJsonFile(filename, content) {
    writeFileSync(filename, JSON.stringify(content, null, 2));
}
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
export function getProjectPath(projectName) {
    return resolve(process.cwd(), projectName);
}
/**
 * 打印信息
 * @param msg 信息
 */
export function printMsg(msg) {
    console.log(msg);
}
/**
 * 清空命令行
 */
export function clearConsole() {
    clear();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxLQUFLLEtBQUssTUFBTSxlQUFlLENBQUM7QUFldkM7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBSSxRQUFnQjtJQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUksUUFBZ0IsRUFBRSxPQUFVO0lBQzNELGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsV0FBbUI7SUFDaEQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVc7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsWUFBWTtJQUMxQixLQUFLLEVBQUUsQ0FBQztBQUNWLENBQUMifQ==