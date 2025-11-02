const slide = document.querySelector('.announcement-slide');
const items = document.querySelectorAll('.announcement-item');
let index = 0;
let interval = null;

function goToSlide(i) {
    index = i;
    slide.scrollTo({
        left: index * slide.clientWidth,
        behavior: 'smooth'
    });
}

function showNextSlide() {
    index = (index + 1) % items.length;
    goToSlide(index);
}

// เริ่ม auto slide
function startAutoSlide() {
    clearInterval(interval); // reset timer ก่อนตั้งใหม่
    interval = setInterval(showNextSlide, 5000);
}

startAutoSlide();

// เมื่อ user เลื่อนด้วยมือ ให้หยุด auto slide ชั่วคราว
slide.addEventListener('touchstart', () => clearInterval(interval));
slide.addEventListener('mousedown', () => clearInterval(interval));

// Detect เวลาเลื่อนเสร็จ แล้วคำนวณ slide ใหม่ + restart timer
slide.addEventListener('scroll', () => {
    // หา slide ดัชนีปัจจุบันจากตำแหน่ง scroll
    let newIndex = Math.round(slide.scrollLeft / slide.clientWidth);

    // ถ้า slide เปลี่ยนจริง → อัปเดต index
    if (newIndex !== index) {
        index = newIndex;
    }

    // reset auto-slide ใหม่ทุกครั้งที่เลื่อนจบ
    clearInterval(interval);
    startAutoSlide();
});
