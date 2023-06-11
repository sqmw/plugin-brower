// this script is executed on the agreed domain page
console.log("plugin index script");
const childMinLen = 10
let isFirstGetFather = true
// Find the parent node by recursion
function recurseToGetFather(ele) {
    if (ele.children.length > childMinLen) {
        return ele
    }
    for (let i = 0; i < ele.children.length; i++) {
        const result = recurseToGetFather(ele.children.item(i))
        if(result !== undefined){
            return result
        }
    }
}

let blockInfoList = [];

// 这样就可以获取 popup.js 里面存储的localstorage的数据
chrome.storage.local.get(["blockList"]).then((result) => {
    blockInfoList.push(...JSON.parse(result["blockList"]))
});

function checkStrIncludes(strA, strList) {
    return strList.some(function (str) {
        return strA.includes(str);
    });
}



// There is no need to loop here, you can add a listener to whether to request a new http or through the browser's API
let lastChildInfo = {
    "lenSameCount" : 0,
    "len":-1
}

const fatherInfo = {
    tagName: undefined,
    className: undefined
}

function getMainEle() {
    return document.querySelector("main")??document.querySelector("div[class*='search-page-wrapper']");
}
function getNewFather() {
    // 表示是第一次获取
    if (isFirstGetFather){
        isFirstGetFather = false;
        const father = recurseToGetFather(getMainEle())
        fatherInfo.tagName = father.tagName
        fatherInfo.className = father.className
        return father;
    }else{
        return document.querySelector(fatherInfo.tagName + "[class='"+ fatherInfo.className + "']")??
            document.querySelector("div[class='video-list row']")??
            document.querySelector("div[class='mt_sm video-list row']")??
            recurseToGetFather(getMainEle())
    }
}
let fatherMain
setInterval(()=>{
    blockInfoList = Array.from(new Set(blockInfoList))
    // Determine whether the father was successfully obtained
    try{
        fatherMain = getNewFather();
        if(lastChildInfo.len === fatherMain.children.length){
            if (lastChildInfo.lenSameCount < 50){
                lastChildInfo.lenSameCount ++;
            }else{
                lastChildInfo.lenSameCount = 0
                lastChildInfo.len = -1
                return
            }
        }
        for (let i = 0; i < fatherMain?.children.length; i++) {
            if(checkStrIncludes(fatherMain.children.item(i).innerHTML, blockInfoList)){
                fatherMain.children.item(i).remove()
            }
        }
    }catch (e){
        console.log(e)
    }
    // console.log(fatherMain)
    // Determine if a new DOM is loaded
}, 200)
