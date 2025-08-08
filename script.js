// بارگذاری دوره‌ها از courses.js
const coursesSection = document.getElementById('videos');

function renderCourses(list) {
  coursesSection.innerHTML = '';
  if (list.length === 0) {
    coursesSection.innerHTML = '<p style="text-align:center;width:100%">دوره‌ای یافت نشد.</p>';
    return;
  }
  list.forEach((course) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img class="video-thumb" src="${course.thumbnail}" alt="${course.title}">
      <div class="video-info">
        <h3 class="video-title">${course.title}</h3>
        <p style='margin:0 0 6px 0;font-size:0.97rem;color:#555;'>مدرس: ${course.teacher}</p>
        <p style='margin:0 0 6px 0;font-size:0.97rem;color:#555;'>مدت: ${course.duration}</p>
        <p style='margin:0 0 6px 0;font-size:0.97rem;color:#555;'>${course.isFree ? 'رایگان' : 'پولی'}</p>
        <button class="start-btn" style="margin-top:10px;align-self:flex-end;">شروع یادگیری / مطالب بیشتر</button>
      </div>
    `;
    card.querySelector('.start-btn').onclick = function(e) {
      e.stopPropagation();
      window.location.href = `course.html?id=${course.id}`;
    };
    coursesSection.appendChild(card);
  });
}

// جستجو
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) {
    renderCourses(courses);
    return;
  }
  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.teacher.toLowerCase().includes(q)
  );
  renderCourses(filtered);
});

// بارگذاری اولیه
renderCourses(courses);