// لیست ویدیوها را اینجا ویرایش کنید:
const videos = [
  {
    title: "آموزش STM8 (install software)",
    desc: "آموزش نصب نرم‌افزار STM8 به صورت کامل.",
    src: "https://www.youtube.com/embed/8FcmHDeAbWU",
    thumb: "https://img.youtube.com/vi/8FcmHDeAbWU/hqdefault.jpg"
  },
  {
    title: "آموزش STM8 (interrupts)",
    desc: "آموزش وقفه‌ها در STM8.",
    src: "https://www.youtube.com/embed/jmXuN61GB_k",
    thumb: "https://img.youtube.com/vi/jmXuN61GB_k/hqdefault.jpg"
  },
  // ویدیوهای بیشتر را به همین صورت اضافه کنید
];

const videosSection = document.getElementById('videos');
const searchInput = document.getElementById('searchInput');

function renderVideos(list) {
  videosSection.innerHTML = '';
  if (list.length === 0) {
    videosSection.innerHTML = '<p style="text-align:center;width:100%">ویدیویی یافت نشد.</p>';
    return;
  }
  list.forEach((video, idx) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img class="video-thumb" src="${video.thumb}" alt="${video.title}">
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <p class="video-desc">${video.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(idx));
    videosSection.appendChild(card);
  });
}

function openModal(idx) {
  const video = videos[idx];
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  // اگر لینک embed باشد (آپارات/یوتیوب)، iframe بگذار، اگر mp4 باشد، video tag
  let content = '';
  if (video.src.endsWith('.mp4')) {
    content = `<video src="${video.src}" controls style="width:100%;max-width:520px;border-radius:12px;">ویدیوی شما</video>`;
  } else {
    content = `<iframe src="${video.src}" allowfullscreen style="width:100%;min-height:320px;aspect-ratio:16/9;border:none;border-radius:12px;"></iframe>`;
  }
  content += `<h3 style='margin-top:18px;'>${video.title}</h3><p>${video.desc}</p>`;
  modalBody.innerHTML = content;
  modal.style.display = 'block';
}

document.getElementById('closeModal').onclick = function() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal-body').innerHTML = '';
};
window.onclick = function(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-body').innerHTML = '';
  }
};

searchInput.addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) {
    renderVideos(videos);
    return;
  }
  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.desc.toLowerCase().includes(q)
  );
  renderVideos(filtered);
});

// درباره ما و تماس با ما
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');
aboutLink.onclick = function(e) {
  e.preventDefault();
  showInfoModal('درباره ما', 'این سایت توسط مهندس امین خادم الحسینی با همکاری هیراد علدالله پور برای آموزش تخصصی برنامه‌نویسی و مهندسی ساخته شده است.');
};
contactLink.onclick = function(e) {
  e.preventDefault();
  showInfoModal('تماس با ما', 'برای ارتباط: example@email.com');
};
function showInfoModal(title, text) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
  modal.style.display = 'block';
}

// بارگذاری اولیه
renderVideos(videos);