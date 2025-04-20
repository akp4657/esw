// public/js/title-history.js

const cardsPerPage = 10;
let currentPage = 1;
let data = [];

function renderCards() {
  const container = document.getElementById('title-history-cards');
  container.innerHTML = '';

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(wrestler => {
    const card = document.createElement('div');
    card.className = 'card mb-3 p-3';
    card.innerHTML = `
      <h5 class="mb-1">${wrestler.name} ${wrestler.reign ? `(#${wrestler.reign})` : ''}</h5>
      <p class="mb-1"><strong>${wrestler.startDate}</strong> - ${wrestler.endDate || 'Present'}</p>
      <p class="mb-1">${wrestler.location || ''}</p>
    `;
    container.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const container = document.getElementById('title-history-pagination');
  container.innerHTML = '';

  const totalPages = Math.ceil(data.length / cardsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `btn btn-sm mx-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderCards();
    };
    container.appendChild(btn);
  }
}

async function loadTitleHistory() {
    const wrapper = document.querySelector('section[data-json]');
    const jsonPath = wrapper?.dataset.json;
  
    if (!jsonPath) {
      console.error('No data-json attribute found');
      return;
    }
  
    const res = await fetch(jsonPath);
    data = await res.json();
    renderCards();
}

document.addEventListener('DOMContentLoaded', loadTitleHistory);
