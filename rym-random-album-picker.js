(async () => {
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const currentPath = window.location.pathname;
  const m = currentPath.match(/(\/collection\/[^/]+\/visual\/)(\d+)(?:\/)?$/);

  if (!m) {
    throw new Error("Run this on a collection visual page like /collection/<user>/visual/<n>");
  }

  const basePath = m[1];
  const currentPage = Number(m[2]);

  const pageNums = [...document.querySelectorAll('a[href*="/visual/"]')]
    .map(a => {
      const mm = a.getAttribute("href")?.match(/\/visual\/(\d+)(?:\/)?$/);
      return mm ? Number(mm[1]) : NaN;
    })
    .filter(n => Number.isFinite(n));

  const maxPage = Math.max(currentPage, ...(pageNums.length ? pageNums : [currentPage]));
  const randomPage = randInt(1, maxPage);
  const pageUrl = `${window.location.origin}${basePath}${randomPage}`;

  const html = await fetch(pageUrl, { credentials: "include" }).then(r => {
    if (!r.ok) throw new Error(`Failed to load page ${randomPage} (${r.status})`);
    return r.text();
  });

  const doc = new DOMParser().parseFromString(html, "text/html");

  const albumLinks = [...doc.querySelectorAll('table.viz td > a[href*="/release/album/"]')];
  if (!albumLinks.length) throw new Error(`No album links found on page ${randomPage}`);

  const picked = albumLinks[randInt(0, albumLinks.length - 1)];
  const albumUrl = new URL(picked.getAttribute("href"), window.location.origin).href;
  const albumTitle = picked.querySelector("img")?.alt || picked.getAttribute("title") || picked.textContent.trim();

  window.open(albumUrl, "_blank", "noopener");

  const result = { randomPage, pageUrl, albumTitle, albumUrl };
  console.log("Picked random album:", result);
  return result;
})();
