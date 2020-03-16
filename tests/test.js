const test = require('ava');
const { promises } = require('fs');

const { default: a } = require('../dist/index');
const { readFile } = promises;

test('qrcode', async (t) => {
	const data_for_qrcode = 'https://mm-edu.gitee.io';		// 二维码的数据
	const logo = 'https://portrait.gitee.com/uploads/avatars/user/520/1560762_taoqf_1578954569.png!avatar200';
	const width = 200;				// 二维码的宽
	const cwidth = 50;				// 二维码的宽
	const dark_color = '#000000';	// 二维码的颜色
	const light_color = '#0000ff';	// 背景色
	const r = await a(data_for_qrcode, logo, width, cwidth, dark_color, light_color);
	const f = await readFile('./tests/test.png');
	t.is(f.toString('base64'), r.replace(/.*,/, ''))
});
