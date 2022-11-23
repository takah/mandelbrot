use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn greet2(name: &str) {
    alert(&format!("Hello2, {}!", name));
}

#[wasm_bindgen]
pub fn color(re: f64, im: f64) -> bool {
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
            return false;
        }
        n += 1;
    }
    return true;
}