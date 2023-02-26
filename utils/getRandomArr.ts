export default function getRandomArr(dataArr: Array<any>): string {
  const randomIdx = Math.floor(Math.random() * dataArr.length);

  return dataArr[randomIdx];
}
