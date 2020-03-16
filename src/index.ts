import { createCanvas, loadImage } from 'canvas';
import { toCanvas } from 'qrcode';

/**
 * 生成带logo的二维码
 * @param data_for_qrcode	二维码的数据
 * @param logo Logo
 * @param width				二维码的宽
 * @param cwidth			local的宽
 * @param dark_color		二维码的颜色
 * @param light_color		背景色
 */
export default async function create_qr(data_for_qrcode: string, logo: string, width: number, cwidth: number, dark_color: string, light_color: string) {
	const cvs = createCanvas(1, 1);
	const url = await toCanvas(cvs, data_for_qrcode, {
		color: {
			dark: dark_color,	// black pixels
			light: light_color	// white background
		},
		errorCorrectionLevel: 'H',	// LMQH
		margin: 1,
		width
	});
	const canvas = createCanvas(width, width);
	const img = await loadImage(logo);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(url, 0, 0, width, width);
	const center = (width - cwidth) / 2;
	ctx.drawImage(img, center, center, cwidth, cwidth);
	return canvas.toDataURL('image/png');
}
