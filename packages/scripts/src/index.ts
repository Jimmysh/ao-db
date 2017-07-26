export * from './mock';

export async function run(task: string, config?: any) {
  try {
    const taskFn: (config?: any) => Promise<any> = require(`./${task}/command`)['command'];
    return await taskFn(config);
  } catch (e) {
    console.error('task', task, '无法找到');
    return Promise.reject(e);
  }
}
