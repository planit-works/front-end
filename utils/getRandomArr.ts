export default function getRandomArr(dataArr: Array<any>) {
  const randomIdx = Math.floor(Math.random() * dataArr.length);
  return dataArr[randomIdx];
}
