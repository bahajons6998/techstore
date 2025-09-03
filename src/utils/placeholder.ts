// Placeholder rasm SVG formatida
const placeholderSvg = `
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="#f0f0f0"/>
  <path d="M144.435 127.25L112.185 149.4L144.435 171.55L176.685 149.4L144.435 127.25Z" stroke="#a0a0a0" stroke-width="2"/>
  <path d="M144.435 171.55V215.85" stroke="#a0a0a0" stroke-width="2"/>
  <path d="M176.685 149.4V193.7" stroke="#a0a0a0" stroke-width="2"/>
  <path d="M112.185 149.4V193.7" stroke="#a0a0a0" stroke-width="2"/>
  <path d="M144.435 127.25V83.15" stroke="#a0a0a0" stroke-width="2"/>
  <text x="150" y="230" text-anchor="middle" font-family="Arial" font-size="14" fill="#a0a0a0">No Image</text>
</svg>
`;

// SVG -> Base64
const placeholderBase64 = Buffer.from(placeholderSvg).toString('base64');
const placeholderImageUrl = `data:image/svg+xml;base64,${placeholderBase64}`;

export default placeholderImageUrl;