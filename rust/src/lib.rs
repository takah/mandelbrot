use image::*;
use std::f64;
use std::io::Cursor;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calc(pixel: u32, scale: f64, center_x: f64, center_y: f64) -> Vec<u8> {
    let mut image: RgbImage = ImageBuffer::new(200, 200);
    for x in 0..pixel {
        for y in 0..pixel {
            let c_re: f64 = (x as f64)*scale/(pixel as f64) - scale/2.0 + center_x;
            let c_im = (y as f64)*scale/(pixel as f64) - scale/2.0 + center_y;
            let pixel = image.get_pixel_mut(x, y);
            let image::Rgb(data) = *pixel;
            *pixel = image::Rgb([color(c_re, c_im), data[1], data[2]]);
        }
    }

    let mut buffer = Vec::new();
    let mut writer = Cursor::new(&mut buffer);
    let _ret = image.write_to(&mut writer, ImageOutputFormat::Png);
    return buffer;
}

pub fn color(c_re: f64, c_im: f64) -> u8 {
    let mut n = 0;
    let mut re: f64 = 0.0;
    let mut im: f64 = 0.0;
    while n < 50 {
        let new_re = re*re - im*im + c_re;
        let new_im = 2.0*re*im + c_im;
        re = new_re;
        im = new_im;
        let distance = re*re + im*im;
        if distance > 4.0 {
            return 255;
        }
        n += 1;
    }
    return 0;
}