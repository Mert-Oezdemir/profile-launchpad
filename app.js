'use strict';

const form = document.querySelector('#profile');
const nameInput = document.querySelector('#name');
const roleInput = document.querySelector('#role');
const bioInput = document.querySelector('#bio');
const workInput = document.querySelector('#work');
const websiteInput = document.querySelector('#website');
const markdownOutput = document.querySelector('#markdown');
const status = document.querySelector('#status');
const workPreview = document.querySelector('#preview-work');
const websitePreview = document.querySelector('#preview-website');

function markdownText(value) {
  const punctuation = '\\`*_{}[]()#+-.!|>~';
  return Array.from(value, (char) => {
    if (char === '&') return '&amp;';
    if (char === '<') return '&lt;';
    if (punctuation.includes(char)) return '\\' + char;
    return char;
  }).join('');
}

function websiteUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
  } catch {
    return '';
  }
  return '';
}

function render() {
  const name = nameInput.value.trim() || 'Your name';
  const role = roleInput.value.trim();
  const bio = bioInput.value.trim();
  const work = workInput.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const website = websiteUrl(websiteInput.value.trim());
  websiteInput.setCustomValidity(websiteInput.value.trim() && !website
    ? 'Enter an https:// website link without a username or password.' : '');

  document.querySelector('#preview-name').textContent = name;
  document.querySelector('#preview-role').textContent = role;
  document.querySelector('#preview-bio').textContent = bio;
  workPreview.hidden = work.length === 0;
  workPreview.querySelector('ul').replaceChildren(...work.map((line) => {
    const item = document.createElement('li');
    item.textContent = line;
    return item;
  }));
  websitePreview.hidden = !website;
  websitePreview.textContent = website;

  const sections = [`# ${markdownText(name)}`];
  if (role) sections.push(`**${markdownText(role)}**`);
  if (bio) sections.push(bio.split('\n').map((line) => markdownText(line.trim())).join('\n'));
  if (work.length) sections.push('## Selected work\n\n' + work.map((line) => `- ${markdownText(line)}`).join('\n'));
  if (website) sections.push(`[Website](<${website}>)`);
  markdownOutput.value = sections.join('\n\n') + '\n';
}

form.addEventListener('input', () => {
  status.textContent = '';
  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const blob = new Blob([markdownOutput.value], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'README.md';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'README.md downloaded.';
});

document.querySelector('#copy').addEventListener('click', async () => {
  if (!form.reportValidity()) return;
  try {
    await navigator.clipboard.writeText(markdownOutput.value);
    status.textContent = 'Markdown copied.';
  } catch {
    markdownOutput.closest('details').open = true;
    markdownOutput.focus();
    markdownOutput.select();
    status.textContent = 'The Markdown is selected. Use your keyboard to copy it.';
  }
});

render();
