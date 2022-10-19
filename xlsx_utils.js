/**
 * @param {Object} file   出入的一个文件 file 
 * @param {Object} recall 回调函数
 * 
 */
function get_json_xlsx_file(file,recall) {
	let reader = new FileReader();
	reader.onload = function (e) {
		let wb = XLSX.read(e.target.result, { type: "binary" }); // 读取文件
		let wbSheetName = wb.SheetNames[0];
		const wbSheet = wb.Sheets[wbSheetName];
		// console.log(wbSheet);
		// 解析文件 {defval: ''}=>防止单元格为空的时解析出来的结果缺少相应的key
		let selectFileData = XLSX.utils.sheet_to_json(wbSheet, { defval: "" }) || [];
		recall(selectFileData)
		return selectFileData;
	}
	reader.readAsBinaryString(file);
}


/**
 * @param {Object} json_list || []
 * 渲染函数
 */
function render(json_list){
	setTimeout(()=>{
		console.log(json_list);
		let goods = "";
		json_list.forEach((item)=>{
			goods += `<li>${item["颜色种类"]}</li>`;
		});
		goods_ele.innerHTML = goods;
	},10);
}