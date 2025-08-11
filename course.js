// دریافت id از URL
function getCourseId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10);
}

function renderCourse(course) {
  document.getElementById('course-thumb').src = course.thumbnail;
  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-teacher').textContent = 'مدرس: ' + course.teacher + (course.isFree ? ' | رایگان' : ' | پولی');
  
  // اضافه کردن ویدیو معرفی برای دوره پایتون
  const courseInfo = document.getElementById('course-desc');
  if (course.id === 2) { // دوره پایتون
    // ایجاد عنصر ویدیو با همان استایل ویدیوهای آموزشی
    const videoSection = document.createElement('div');
    videoSection.className = 'intro-video-section';
    videoSection.innerHTML = `
      <div class="video-container">
        <style>.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}</style>
        <div class="h_iframe-aparat_embed_frame">
          <span style="display: block;padding-top: 57%"></span>
          <iframe src="https://www.aparat.com/video/video/embed/videohash/y31n9vp/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
        </div>
      </div>
      <div class="video-title">ویدیو معرفی دوره</div>
    `;
    
    // قرار دادن ویدیو قبل از توضیحات دوره
    courseInfo.parentNode.insertBefore(videoSection, courseInfo);
  }
  
  document.getElementById('course-desc').textContent = course.description;
  
  // نمایش یا مخفی کردن بخش خرید دوره بر اساس نوع دوره
  const purchaseSection = document.querySelector('.read-section');
  if (course.id === 1) { // دوره STM8 - رایگان
    purchaseSection.style.display = 'none';
  } else { // دوره پایتون - پولی
    purchaseSection.style.display = 'block';
  }
  
  // سرفصل‌ها
  const syllabusList = document.getElementById('syllabus-list');
  syllabusList.innerHTML = '';
  course.syllabus.forEach((item, idx) => {
    const acc = document.createElement('button');
    acc.className = 'accordion';
    acc.innerHTML = `<span class="arrow">▶</span> <span>${item.title}</span>`;
    acc.onclick = function() {
      this.classList.toggle('active');
      panel.classList.toggle('open');
      
      // اگر پنل بسته می‌شود، src iframe را خالی کن تا صدا قطع شود
      if (!panel.classList.contains('open')) {
        const iframe = panel.querySelector('iframe');
        if (iframe) {
          iframe.src = '';
        }
      } else {
        // اگر پنل باز می‌شود، src iframe را دوباره تنظیم کن
        const iframe = panel.querySelector('iframe');
        if (iframe) {
          iframe.src = item.link;
        }
      }
    };
    const panel = document.createElement('div');
    panel.className = 'panel';
    if (item.link) {
      panel.innerHTML = `<p style="color:#666;margin-bottom:12px;font-size:0.95rem;">توضیحات: خودم بعدا متن هاش رو اضافه میکنم</p><iframe src="${item.link}" width="100%" height="315" frameborder="0" allowfullscreen style="border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);"></iframe>`;
    } else {
      panel.innerHTML = '<p style="color:#666;margin-bottom:12px;font-size:0.95rem;">توضیحات: خودم بعدا متن هاش رو اضافه میکنم</p>';
    }
    syllabusList.appendChild(acc);
    syllabusList.appendChild(panel);
  });
}

window.onload = function() {
  const id = getCourseId();
  const course = courses.find(c => c.id === id);
  if (!course) {
    document.querySelector('.container').innerHTML = '<p style="color:red;text-align:center;margin:48px 0;font-size:1.2rem">دوره مورد نظر پیدا نشد.</p>';
    return;
  }
  renderCourse(course);
};