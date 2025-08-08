// دریافت id از URL
function getCourseId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10);
}

function renderCourse(course) {
  document.getElementById('course-thumb').src = course.thumbnail;
  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-teacher').textContent = 'مدرس: ' + course.teacher + (course.isFree ? ' | رایگان' : ' | پولی');
  document.getElementById('course-desc').textContent = course.description;
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
    };
    const panel = document.createElement('div');
    panel.className = 'panel';
    if (item.link) {
      panel.innerHTML = `<a class='syllabus-link' href='${item.link}' target='_blank'>مشاهده ویدیو</a>`;
    } else {
      panel.innerHTML = '<span style="color:#888">بدون لینک</span>';
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