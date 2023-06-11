// this script is executing as popup page is opening
setTimeout(() => {
    console.log("this is popup script")
}, 100)

let blockList = []

function saveBlockList() {
    chrome.storage.local.set({"blockList": JSON.stringify(blockList)}).then(() => {
        console.log("local save right");
    });
}

function getLiEle(val = "", blockIndex) {
    const lastChild = document.createElement("li");
    lastChild.setAttribute("class", "list-group-item");
    lastChild.innerHTML = `
            <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">${blockIndex + 1}</span>
                  <input seq="${blockIndex}" value="${val}" type="text" class="form-control" placeholder="blockInfo">
                  <button type="button" class="btn btn-danger">删除</button>
            </div>
        `
    lastChild.querySelector("input").addEventListener(
        "change",
        (event)=>{
            blockList.splice(blockIndex,1, event.target.value);
            saveBlockList();
        }
    )

    lastChild.querySelector("button").addEventListener("click",(event)=>{
        event.target.parentElement.style.pointerEvents = "none"
        event.target.className = "btn btn-secondary"
        event.target.parentElement.style.backgroundColor = "gray"
            blockList.splice(blockIndex,1)
        }
    )
    return lastChild
}


window.onload = () => {
    const infoLiEle = document.getElementById("info");
    let info_html = ""
    chrome.storage.local.get(["blockList"]).then((result) => {
        blockList = JSON.parse(result["blockList"])
        for (let i = 0; i < blockList.length; i++) {
            infoLiEle.appendChild(getLiEle(blockList[i], i))
        }
    });

    document.getElementById("add").addEventListener("click", () => {
        infoLiEle.appendChild(getLiEle("", blockList.length))
        blockList.push("")
    });

    document.getElementById("save").addEventListener("click", () => {
        blockList = blockList.filter((item, index, arr)=>{
           return item.trim() !== ""
        });
       saveBlockList()
    })

    document.getElementById("clear").addEventListener("click", () => {
        blockList = []
        infoLiEle.innerHTML = ""
        chrome.storage.local.set({"blockList": JSON.stringify(blockList)}).then(() => {
            console.log("clear right");
        });
    })
}