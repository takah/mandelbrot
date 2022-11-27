use image::*;
use std::f64;
use std::io::Cursor;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calc(pixel: u32, scale: f64, center_x: f64, center_y: f64) -> Vec<u8> {
    let mut image: RgbImage = ImageBuffer::new(200, 200);
    for i in 0..pixel {
        for j in 0..pixel {
            let re: f64 = (i as f64)*scale/(pixel as f64) - scale/2.0 + center_x;
            let im = (j as f64)*scale/(pixel as f64) - scale/2.0 + center_y;
            let pixel = image.get_pixel_mut(i, j);
            let image::Rgb(data) = *pixel;
            *pixel = image::Rgb([color(re, im), data[1], data[2]]);
        }
    }

    let mut buffer = Vec::new();
    let mut writer = Cursor::new(&mut buffer);
    let _ret = image.write_to(&mut writer, ImageOutputFormat::Png);
    return buffer;
}

pub fn color(re: f64, im: f64) -> u8 {
    let mut n = 0;
    let mut r: f64 = 0.0;
    let mut i: f64 = 0.0;
    while n < 50 {
        let new_r = r*r - i*i + re;
        let new_i = 2.0*r*i + im;
        r = new_r;
        i = new_i;
        let distance = r*r + i*i;
        if distance > 4.0 {
            return 255;
        }
        n += 1;
    }
    return 0;
}